import fs from 'node:fs/promises';
const rows=(await fs.readFile('audit/rebrand/ocr-portfolio.jsonl','utf8')).trim().split(/\r?\n/).map(JSON.parse);
const manifest=JSON.parse(await fs.readFile('audit/rebrand/portfolio-ocr-manifest.json','utf8'));
const forbidden=/streamdatax|tukeeconnect|parachute|whizara|esplatform|leadmanagement|simplyrecruited|infinote|silasync|digitalhabittracker|onepantry|streetsheets|brtennis|bearrepublic/;
const normalize=s=>s.toLowerCase().replace(/[^a-z0-9]/g,'');
const findings=[];for(const row of rows){for(const line of row.lines)if(forbidden.test(normalize(line.text)))findings.push({id:row.id,slug:row.slug,text:line.text,source:manifest.find(m=>m.id===row.id)?.src});}
const report={expected:manifest.length,scanned:new Set(rows.map(r=>r.id)).size,findings,method:'Offline Windows English OCR on upscaled current artwork; supplemented by enlarged wordmark and cover review.'};
await fs.writeFile('audit/rebrand/ocr-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));if(report.scanned!==report.expected||findings.length)process.exitCode=1;
