import fs from 'node:fs/promises';
const rows=JSON.parse(await fs.readFile('audit/rebrand/assets-before.json','utf8'));
const ocr=(await fs.readFile('audit/rebrand/ocr-before.jsonl','utf8')).trim().split(/\r?\n/).map(JSON.parse);
const norm=s=>s.normalize('NFD').toLowerCase().replace(/[^a-z0-9]/g,'');
function distance(a,b){let prev=Array.from({length:b.length+1},(_,i)=>i);for(let i=0;i<a.length;i++){const next=[i+1];for(let j=0;j<b.length;j++)next[j+1]=Math.min(next[j]+1,prev[j+1]+1,prev[j]+(a[i]!==b[j]?1:0));prev=next;}return prev[b.length];}
function box(words){const x=Math.min(...words.map(w=>w.x)),y=Math.min(...words.map(w=>w.y));return{x,y,w:Math.max(...words.map(w=>w.x+w.w))-x,h:Math.max(...words.map(w=>w.y+w.h))-y};}
const plans=[];
for(const row of rows){
 const scan=ocr.find(s=>s.id===row.id),candidates=[];
 const tokens=[...row.tokens];if(row.slug==='br-tennis')tokens.push('bearrepublic');
 if(row.slug==='app-infinote')tokens.push('infirote','infirnote','infitote');
 const groups=scan.lines.map(l=>({words:l.words,text:l.text,multiline:false}));
 for(let i=0;i<scan.lines.length-1;i++)for(let n=2;n<=3&&i+n<=scan.lines.length;n++){
  const lines=scan.lines.slice(i,i+n),words=lines.flatMap(l=>l.words),b=box(words),maxH=Math.max(...words.map(w=>w.h));
  if(b.h<maxH*5&&b.w<maxH*23)groups.push({words,text:lines.map(l=>l.text).join(' '),multiline:true});
 }
 for(const group of groups){for(let first=0;first<group.words.length;first++)for(let n=1;n<=4&&first+n<=group.words.length;n++){
  const words=group.words.slice(first,first+n),text=words.map(w=>w.text).join(' '),key=norm(text);
  let score=1000,token;
  for(const candidate of tokens){let d=distance(key,candidate);if(n===1&&key.includes(candidate))d=0;if(d<score){score=d;token=candidate;}}
  const threshold=token.length>=7?2:1;
  if(score>threshold||Math.abs(key.length-token.length)>threshold&&!(n===1&&key.includes(token)))continue;
  if(token==='tukec'&&score>0)continue;
  let replacement=row.name;
  if(/@|\.com|\.co\b/i.test(text))replacement='Contact support';
  else if(row.slug==='parachute'&&/one\s+parachute\s+at/i.test(group.text))replacement='family';
  else if(row.slug.includes('tukee')&&key.length<=6)replacement='Tukio';
  else if(row.slug==='app-one-pantry'&&group.multiline)replacement='PANTRY\nONE';
  else if(row.slug==='app-digital-habit-tracker'&&group.multiline)replacement='Habit\nStride';
  else if(text===text.toUpperCase()&&/[A-Z]/.test(text))replacement=row.name.toUpperCase();
  else if(text===text.toLowerCase())replacement=row.name.toLowerCase();
  if(text.endsWith('!'))replacement+='!';
  if(text.endsWith('?'))replacement+='?';
  if(/['’]s$/.test(text))replacement+="'s";
  const b=box(words);if(b.w<3||b.h<3)continue;
  candidates.push({...b,text,replacement,score,confidence:score===0?'exact':'review',multiline:group.multiline});
 }}
 candidates.sort((a,b)=>a.score-b.score||a.text.length-b.text.length);
 const edits=[];for(const c of candidates){if(edits.some(e=>{const overlap=Math.max(0,Math.min(c.x+c.w,e.x+e.w)-Math.max(c.x,e.x))*Math.max(0,Math.min(c.y+c.h,e.y+e.h)-Math.max(c.y,e.y));return overlap>Math.min(c.w*c.h,e.w*e.h)*.4;}))continue;
  const weight=row.asset.src.includes('preview')?(row.slug.startsWith('app-')?'Bold':'Regular'):(row.slug==='app-infinote'&&c.h>23?'Light':c.h>30?'SemiBold':'Regular');
  edits.push({...c,x:Math.max(0,Math.floor(c.x-1)),y:Math.max(0,Math.floor(c.y-1)),w:Math.ceil(c.w+2),h:Math.ceil(c.h+2),weight,align:c.h>26?'center':'left'});
 }
 plans.push({id:row.id,slug:row.slug,name:row.name,original:row.original,width:row.asset.width,height:row.asset.height,edits});
}
await fs.writeFile('audit/rebrand/edit-plan-auto.json',JSON.stringify(plans,null,2));
console.log(JSON.stringify({assets:plans.length,withDetectedBranding:plans.filter(p=>p.edits.length).length,edits:plans.reduce((n,p)=>n+p.edits.length,0)}));
