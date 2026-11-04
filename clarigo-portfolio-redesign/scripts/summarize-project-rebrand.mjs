import fs from 'node:fs/promises';
const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const initial=await read('audit/rebrand/browser-tests.json'),recheck=await read('audit/rebrand/browser-tests-recheck.json');
function collect(suites){return suites.flatMap(suite=>[...(suite.specs??[]).flatMap(spec=>spec.tests.map(test=>({title:spec.title,project:test.projectName,status:test.results.at(-1)?.status}))),...collect(suite.suites??[])]);}
const first=collect(initial.suites),rechecks=collect(recheck.suites),final=first.map(test=>rechecks.find(next=>next.title===test.title&&next.project===test.project)??test);
const assets=await read('audit/rebrand/asset-verification.json'),ocr=await read('audit/rebrand/ocr-verification.json'),visuals=await read('audit/rebrand/visual-verification.json');
const report={buildId:(await fs.readFile('.next-production/BUILD_ID','utf8')).trim(),projects:47,web:19,mobile:28,renamedBrands:13,renamedPages:14,browser:{total:final.length,passed:final.filter(t=>t.status==='passed').length,unresolved:final.filter(t=>t.status!=='passed'),initial:initial.stats,recheck:recheck.stats,note:'One resource-exhausted desktop test passed on an isolated rerun; both raw reports are retained.'},assets,ocr,visuals:{pages:visuals.length,images:56,errors:visuals.filter(v=>v.errors.length||v.overflow||v.status!==200)}};
await fs.writeFile('audit/rebrand/verification.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report));if(report.browser.unresolved.length||assets.errors.length||ocr.findings.length||ocr.scanned!==ocr.expected||report.visuals.errors.length)process.exitCode=1;
