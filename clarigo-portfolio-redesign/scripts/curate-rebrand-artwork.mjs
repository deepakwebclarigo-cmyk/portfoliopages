import fs from 'node:fs/promises';
const plan=JSON.parse(await fs.readFile('audit/rebrand/edit-plan-auto.json','utf8'));
const get=id=>plan.find(x=>x.id===id);
const add=(id,x,y,w,h,replacement,extra={})=>get(id).edits.push({x,y,w,h,text:replacement,replacement,weight:'Regular',align:'left',confidence:'manual',...extra});
const remove=(id,test)=>get(id).edits=get(id).edits.filter(e=>!test(e));
for(const p of plan){
 if(p.slug==='br-tennis')p.edits=p.edits.filter(e=>!/^tennis$/i.test(e.text));
 for(const e of p.edits){
  if(!/@|\.com|family/i.test(e.replacement)&&!e.replacement.includes('\n'))e.replacement=p.name+(/!$/.test(e.text)?'!':/\?$/.test(e.text)?'?':/['’]s$/.test(e.text)?"'s":'');
  if(p.slug.includes('tukee')&&e.text.toLowerCase()==='tukee')e.replacement='Tukio';
  if(p.slug==='parachute'&&/or.?a?.?chute/i.test(e.text)&&e.x<350&&e.y<500){e.x-=15;e.w+=17;e.background=[255,255,255];e.color=[20,20,20];}
 }
}
// Mobile covers are rebuilt from each project's own, renamed device composition.
// This removes ghost titles and avoids editing diagonally repeated UI artwork.
for(const id of ['019','053','061','070','078','086','094'])get(id).edits=[];
add('002',232,115,128,20,'STREAMDEXA',{color:[255,255,255]});
add('010',405,112,795,112,'TukioConnect',{align:'center',color:[255,255,255]});
add('027',925,609,56,14,'ParaNest',{background:[255,255,255],color:[25,25,25]});
// Replace copied template captions only where the portfolio cover is being rebranded.
add('001',420,250,770,90,'Explore digital collections,\ndata listings and marketplace profiles.',{align:'center',color:[255,255,255]});
add('027',340,224,820,86,'Find postnatal care.\nExplore nanny profiles and availability.',{align:'center',color:[255,255,255]});
add('052',423,266,760,40,'A clear first step for every enquiry.',{align:'center',color:[255,255,255]});
add('052',725,477,128,15,'LeadForma',{background:[245,247,249],color:[30,38,45],weight:'SemiBold'});
add('052',1124,662,72,11,'LeadForma',{background:[245,247,249],color:[30,38,45],weight:'SemiBold'});
// Tiny logos and clipped contact labels missed by OCR.
add('036',1091,701,36,10,'Whizora',{background:[255,133,0],color:[45,60,80]});
add('042',70,250,330,24,'Contact support',{background:[25,28,31],color:[255,255,255]});
add('044',350,463,97,19,'EStrata',{background:[255,255,255],color:[40,40,40],weight:'SemiBold'});
add('048',222,269,192,31,'EStrata',{background:[255,255,255],color:[30,30,30],weight:'SemiBold'});
add('051',222,269,192,31,'EStrata',{background:[255,255,255],color:[30,30,30],weight:'SemiBold'});
// Full wordmark regions include the decorative stroke that OCR omitted.
for(const id of ['020','023']){const e=get(id).edits.find(e=>e.replacement==='Tukio');if(e){e.x-=3;e.y-=12;e.w+=12;e.h+=14;e.background=[245,248,250];e.color=[35,116,173];}}
add('022',484,127,109,61,'TukioConnect',{fontSize:6,angle:27,polygon:[[486,128],[591,179],[590,188],[486,138]],background:[247,250,252],color:[125,137,148]});
add('067',53,111,80,18,'InfiScribe',{background:[255,255,255],color:[60,81,65],weight:'Light'});
add('073',317,152,79,21,'SilaFlow',{background:[255,255,255],color:[65,65,65],weight:'SemiBold'});
add('073',292,215,130,22,'Welcome to SilaFlow!',{background:[255,255,255],color:[45,45,45],weight:'SemiBold'});
add('073',380,412,35,8,"SilaFlow's",{background:[255,255,255],color:[75,75,75]});
// HabitStride uses the new initials in its splash mark, matching its white line style.
add('079',732,330,149,139,'HS',{color:[255,255,255],weight:'Light',background:[123,107,255],align:'center'});
add('083',144,174,92,81,'HS',{color:[255,255,255],weight:'Light',align:'center'});
// The pantry's retained circle and rules surround the new two-line name.
for(const id of ['087','088','090','092'])for(const e of get(id).edits){e.replacement='PANTRY\nONE';e.weight='Bold';e.align='center';}
// A freelancer directory composition belongs to another project, not PantryOne.
get('089').excluded='Unrelated freelancer marketplace composition; no food-ordering interface.';
// Bear Republic is the longer wordmark within the BR-Tennis source artwork.
add('101',347,493,75,12,'RallyBridge',{background:[6,14,39],color:[255,255,255],weight:'SemiBold'});
add('101',939,659,53,9,'RallyBridge',{background:[6,14,39],color:[255,255,255],weight:'SemiBold'});
add('104',142,113,76,13,'RallyBridge',{background:[7,15,42],color:[255,255,255],weight:'SemiBold'});
add('105',164,272,125,22,'RallyBridge',{background:[7,15,42],color:[255,255,255],weight:'SemiBold'});
add('107',199,272,120,22,'RallyBridge',{background:[7,15,42],color:[255,255,255],weight:'SemiBold'});
// No readable wordmark survives the intentionally blurred login backdrop (103/106/108).
// Final enlarged-region review: clear complete glyph bounds, keep adjacent UI intact.
for(const p of plan)for(const e of p.edits){
 if(/@|\.com/i.test(e.text)){e.replacement='Contact support';e.color=p.slug==='whizara'?[255,255,255]:[95,95,95];}
 if(p.slug==='parachute'&&e.x<350&&e.y<500&&e.replacement==='ParaNest'){e.x-=8;e.y-=8;e.w+=20;e.h+=24;e.weight='Regular';}
 if(p.slug==='app-silasync'&&e.y<310){e.background=[255,255,255];e.color=[65,65,65];}
 if(['087','088','090'].includes(p.id)){e.background=[255,255,255];e.color=[106,177,56];}
}
remove('027',e=>e.x===925);add('027',920,604,69,22,'ParaNest',{background:[255,255,255],color:[25,25,25]});
remove('036',e=>e.x===1091);add('036',451,452,88,10,'Contact support',{background:[22,17,45],color:[255,255,255]});
remove('052',e=>e.confidence==='manual'&&e.replacement==='LeadForma');
add('052',740,468,84,12,'LeadForma',{background:[245,247,249],color:[30,38,45],weight:'SemiBold'});
add('052',1139,646,64,12,'LeadForma',{background:[245,247,249],color:[30,38,45],weight:'SemiBold'});
remove('067',()=>true);add('067',78,103,82,24,'InfiScribe',{background:[255,255,255],color:[60,81,65],weight:'Light'});
remove('073',()=>true);
add('073',311,148,88,24,'SilaFlow',{background:[255,255,255],color:[65,65,65],weight:'SemiBold'});
add('073',254,212,205,22,'Welcome to SilaFlow!',{background:[255,255,255],color:[45,45,45],weight:'SemiBold'});
add('073',426,460,42,10,"SilaFlow's",{background:[255,255,255],color:[100,100,100]});
remove('101',e=>e.confidence==='manual');
add('101',354,484,63,13,'RallyBridge',{background:[6,14,39],color:[255,255,255],weight:'SemiBold'});
add('101',939,646,58,13,'RallyBridge',{background:[6,14,39],color:[255,255,255],weight:'SemiBold'});
for(const id of ['048','051'])for(const e of get(id).edits){e.y=266;e.h=39;e.fontSize=27;}
get('102').edits[0].background=[9,16,46];get('102').edits[0].color=[255,255,255];
for(const id of ['010','012','014','017','018'])for(const e of get(id).edits)if(e.replacement==='Tukio'){e.x-=2;e.w+=10;e.background=[255,255,255];e.color=[35,116,173];}
const hs=get('079').edits.find(e=>e.replacement==='HS');delete hs.background;
get('022').excluded='Angled account composition replaced by the matching renamed interface screens.';
await fs.writeFile('audit/rebrand/edit-plan.json',JSON.stringify(plan,null,2));
console.log(plan.reduce((n,p)=>n+p.edits.length,0)+' reviewed text regions');
