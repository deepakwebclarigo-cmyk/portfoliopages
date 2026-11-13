import fs from 'node:fs/promises';
const themes=JSON.parse(await fs.readFile(new URL('../lib/project-themes.json',import.meta.url),'utf8'));
export function thumbnailThemeCss(slug){
 const t=themes[slug];if(!t)return '';
 const dark=t.thumbnailTone==='dark',fg=dark?'#f7f8fc':t.ink,muted=dark?'#d5dceb':t.muted,pill=dark?'#ffffff50':t.border;
 return `body{background:radial-gradient(ellipse at 8% 0%,${dark?t.action:t.soft},transparent 68%),linear-gradient(135deg,${t.thumbnailBackground},${dark?t.deep:t.surface});color:${fg}}
 .dot{color:${dark?t.onDeep:t.action}}.kind{color:${muted};border-color:${pill}}.discipline,.foot{color:${muted}}
 .stage{background:linear-gradient(145deg,${t.canvas},${t.soft});border-color:${dark?'#ffffff44':'#ffffff'}}
 .bar{background:${t.canvas};border-color:${t.border}}.bar span{color:${t.muted}}
 .artwork{background:radial-gradient(ellipse at 4% 20%,${t.surface},transparent 68%),${t.canvas}}
 .brandLine{background:linear-gradient(90deg,${t.action},${t.primary})}.brandCopy h2{color:${t.ink}}.brandCopy .copy{color:${t.muted}}
 .tags span{border-color:${t.border};background:${t.soft};color:${t.action}}`;
}
