export function isUiAntialias(rgb,colors,tolerance=12){
 if(Math.max(...rgb)-Math.min(...rgb)<8)return false;
 for(const c of colors)for(const end of [0,255]){const v=c.map(x=>x-end),p=rgb.map(x=>x-end),length=v.reduce((n,x)=>n+x*x,0);if(!length)continue;const t=Math.max(0,Math.min(1,p.reduce((n,x,i)=>n+x*v[i],0)/length));if(Math.max(...p.map((x,i)=>Math.abs(x-v[i]*t)))<=tolerance)return true;}
 return false;
}
