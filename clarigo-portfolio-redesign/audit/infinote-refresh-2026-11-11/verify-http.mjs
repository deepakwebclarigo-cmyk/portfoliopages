import fs from 'node:fs/promises';import crypto from 'node:crypto';import sharp from 'sharp';
const dir='audit/infinote-refresh-2026-11-11',base='http://127.0.0.1:3100',inventory=JSON.parse(await fs.readFile('lib/project-inventory.json','utf8')),assets=JSON.parse(await fs.readFile('lib/project-assets.json','utf8')),routes=JSON.parse(await fs.readFile('.next-production/routes-manifest.json','utf8')),allowed=new Set(inventory.map(p=>'/portfolio/'+p.slug)),errors=[];let internalLinks=0,detailPages=0;
for(const route of ['/','/portfolio',...allowed]){
 const response=await fetch(base+route,{redirect:'manual'}),html=await response.text();if(response.status!==200)errors.push(route+' status '+response.status);
 if(/infiscribe/i.test(html))errors.push(route+' contains old brand');if(allowed.has(route))detailPages++;
 for(const match of html.matchAll(/href="(\/portfolio\/[^"#?]+)"/g)){internalLinks++;if(!allowed.has(match[1]))errors.push('Invalid project link '+match[1]);}
 const hasIcon=html.includes('/images/brand/projects/infinote-app-icon-32.png');
 if(hasIcon!==(route==='/portfolio/app-infinote'))errors.push(route+' scoped project icon incorrect');
 if(route==='/portfolio/app-infinote'&&!html.includes('https://clarigoinfotech.com/portfolio/app-infinote'))errors.push('Canonical missing.');
}
const redirects=routes.redirects.filter(r=>r.source.startsWith('/portfolio/'));for(const r of redirects){const res=await fetch(base+r.source,{redirect:'manual'});if(res.status!==308||res.headers.get('location')!==r.destination)errors.push('Redirect failed '+r.source);if(!allowed.has(r.destination))errors.push('Redirect points to missing project '+r.destination);}
const sitemap=await(await fetch(base+'/sitemap.xml')).text();if((sitemap.match(/<loc>/g)||[]).length!==45||sitemap.includes('infiscribe')||!sitemap.includes('/portfolio/app-infinote'))errors.push('Sitemap incorrect');
for(const slug of ['app-gobroker','app-law-legend','app-gymbet'])if((await fetch(base+'/portfolio/'+slug,{redirect:'manual'})).status!==404)errors.push('Removed project returned '+slug);
const set=assets['app-infinote'];let imageRequests=0;for(const a of[set.poster,...set.images,{src:set.poster.src.replace('.webp','-card.webp')},{src:set.poster.src.replace('.webp','-medium.webp')}]){
 const r=await fetch(base+a.src),buf=Buffer.from(await r.arrayBuffer());if(r.status!==200)errors.push('Image failed '+a.src);await sharp(buf).stats();imageRequests++;
}
const sizes={};for(const size of[32,180,192,512]){const src='/images/brand/projects/infinote-app-icon-'+size+'.png',r=await fetch(base+src),buf=Buffer.from(await r.arrayBuffer()),m=await sharp(buf).metadata();if(r.status!==200||m.width!==size||m.height!==size)errors.push('Icon size failed '+size);sizes[size]=[m.width,m.height];}
const supplied=await fs.readFile(dir+'/supplied-logo.png'),published=await fs.readFile('public/images/brand/projects/infinote-logo.png');if(!supplied.equals(published))errors.push('Logo bytes differ.');
const report={detailPages,listingPages:2,internalProjectLinks:internalLinks,verifiedRedirects:redirects.length,infinoteImages:imageRequests,projectIconSizes:sizes,sourceLogoExact:supplied.equals(published),sitemapEntries:45,errors};await fs.writeFile(dir+'/http-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));if(errors.length)process.exitCode=1;

