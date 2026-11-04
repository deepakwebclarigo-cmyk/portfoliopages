// Decorative artwork built from the existing coral, lavender, and white palette.
export default function HeroSculpture() {
  return <div className="heroSculpture"><div className="heroSculptureFloat">
    <svg viewBox="0 0 500 460" fill="none" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id="hero-glass-base" x1="115" y1="260" x2="356" y2="425" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity=".86" /><stop offset=".5" stopColor="#dedaff" stopOpacity=".5" /><stop offset="1" stopColor="white" stopOpacity=".35" />
        </linearGradient>
        <linearGradient id="hero-glass-middle" x1="128" y1="185" x2="360" y2="341" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity=".95" /><stop offset=".49" stopColor="#f4efff" stopOpacity=".75" /><stop offset="1" stopColor="#f9d4de" stopOpacity=".55" />
        </linearGradient>
        <linearGradient id="hero-coral-face" x1="150" y1="110" x2="337" y2="267" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffe1e9" /><stop offset=".36" stopColor="#fb9ab0" /><stop offset=".76" stopColor="#f4415a" /><stop offset="1" stopColor="#eb3656" />
        </linearGradient>
        <linearGradient id="hero-coral-edge" x1="104" y1="190" x2="355" y2="266" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f895aa" /><stop offset=".55" stopColor="#e93957" /><stop offset="1" stopColor="#cf2948" />
        </linearGradient>
        <linearGradient id="hero-glass-rim" x1="100" y1="175" x2="400" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" /><stop offset=".5" stopColor="white" stopOpacity=".85" /><stop offset="1" stopColor="#d6cfea" stopOpacity=".3" />
        </linearGradient>
        <linearGradient id="hero-face-light" x1="158" y1="145" x2="302" y2="224" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity=".64" /><stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter id="hero-ground-blur" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="12" /></filter>
      </defs>
      <ellipse cx="250" cy="407" rx="137" ry="18" fill="#dc3b61" opacity=".09" filter="url(#hero-ground-blur)" />
      <g className="heroLayerEntrance heroLayerBase">
        <g className="heroPlaneBase">
          <path d="M90 327L239 407Q250 414 261 407L410 327V334Q410 340 402 344L261 420Q250 426 239 420L98 344Q90 340 90 334V327Z" fill="#d8d1ed" fillOpacity=".52" />
          <path d="M239 243Q250 237 261 243L410 323Q422 330 410 337L261 417Q250 423 239 417L90 337Q78 330 90 323L239 243Z" fill="url(#hero-glass-base)" stroke="url(#hero-glass-rim)" strokeWidth="1.5" />
          <path d="M116 326L241 259Q250 254 259 259L384 326" stroke="white" strokeOpacity=".45" strokeWidth="1" />
        </g>
      </g>
      <g className="heroLayerEntrance heroLayerMiddle">
        <g className="heroPlaneMiddle">
          <path d="M101 252L239 326Q250 333 261 326L399 252V260Q399 266 391 270L261 340Q250 346 239 340L109 270Q101 266 101 260V252Z" fill="#e3c4db" fillOpacity=".54" />
          <path d="M239 171Q250 165 261 171L399 245Q411 252 399 259L261 333Q250 339 239 333L101 259Q89 252 101 245L239 171Z" fill="url(#hero-glass-middle)" stroke="url(#hero-glass-rim)" strokeWidth="1.5" />
          <path d="M126 249L242 187Q250 183 258 187L374 249" stroke="white" strokeOpacity=".6" strokeWidth="1" />
        </g>
      </g>
      <g className="heroLayerEntrance heroLayerCap">
        <g className="heroPlaneCap">
          <path d="M108 178L239 248Q250 255 261 248L392 178V188Q392 194 384 198L261 264Q250 270 239 264L116 198Q108 194 108 188V178Z" fill="url(#hero-coral-edge)" />
          <path d="M239 99Q250 93 261 99L392 169Q404 176 392 183L261 253Q250 259 239 253L108 183Q96 176 108 169L239 99Z" fill="url(#hero-coral-face)" stroke="url(#hero-glass-rim)" strokeWidth="1.2" />
          <path d="M143 169L239 118Q250 112 261 118L356 169Q367 175 356 181L261 232Q250 238 239 232L143 181Q132 175 143 169Z" fill="url(#hero-face-light)" />
          <path d="M109 173L239 103Q250 97 261 103L391 173" stroke="white" strokeOpacity=".5" strokeWidth="1" />
        </g>
      </g>
    </svg>
  </div></div>;
}
