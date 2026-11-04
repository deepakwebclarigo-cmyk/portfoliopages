// Static, generic fallback for unavailable WebGL or disabled JavaScript.
export default function HeroShowcaseFallback() {
  return <div className="heroShowcaseFallback" aria-hidden="true"><svg viewBox="0 0 500 460" fill="none">
    <rect x="74" y="69" width="149" height="66" rx="12" fill="#FFF5F7" stroke="white" strokeWidth="2"/>
    <rect x="91" y="84" width="39" height="25" rx="5" fill="#F9D7DF"/><path d="M143 88H201M143 99H184" stroke="#B7B3BE" strokeWidth="5" strokeLinecap="round"/>
    <rect x="87" y="107" width="301" height="250" rx="15" fill="white" stroke="#F9D7DF" strokeWidth="2"/>
    <rect x="87" y="107" width="301" height="29" rx="12" fill="#EA1B3D"/>
    <circle cx="103" cy="122" r="3" fill="white"/><circle cx="115" cy="122" r="3" fill="#F9D7DF"/><circle cx="127" cy="122" r="3" fill="#FFF5F7"/>
    <rect x="105" y="154" width="123" height="91" rx="7" fill="#F9D7DF"/>
    <path d="M112 233L149 183L182 233Z" fill="white"/><path d="M159 233L186 197L216 233Z" fill="#FFF5F7"/><circle cx="206" cy="173" r="8" fill="#EA1B3D"/>
    <path d="M249 165H365M249 185H348M249 205H358" stroke="#B7B3BE" strokeWidth="5" strokeLinecap="round"/>
    <rect x="248" y="225" width="74" height="14" rx="7" fill="#EA1B3D"/>
    {[0,1,2].map(index=><g key={index}><rect x={105+index*89} y="267" width="77" height="70" rx="7" fill="#FFF5F7"/><rect x={113+index*89} y="275" width="61" height="31" rx="5" fill="#F9D7DF"/><path d={'M'+(114+index*89)+' 317h52m-52 10h37'} stroke="#B7B3BE" strokeWidth="3" strokeLinecap="round"/></g>)}
    <rect x="346" y="195" width="88" height="193" rx="16" fill="white" stroke="#EA1B3D" strokeWidth="2"/>
    <rect x="355" y="215" width="70" height="155" rx="9" fill="#FFF5F7"/><rect x="378" y="203" width="27" height="5" rx="2.5" fill="#B7B3BE"/>
    <rect x="362" y="225" width="57" height="49" rx="5" fill="#F9D7DF"/><path d="M367 264L383 241L400 264Z" fill="white"/>
    <path d="M363 287H414M363 297H402M363 317H414M363 327H402" stroke="#B7B3BE" strokeWidth="3" strokeLinecap="round"/><rect x="363" y="345" width="51" height="11" rx="5" fill="#EA1B3D"/>
    <rect x="97" y="365" width="155" height="63" rx="11" fill="white"/>{['#EA1B3D','#F5B3C1','#FFF5F7','#B7B3BE'].map((color,index)=><circle key={color} cx={119+index*34} cy="386" r="10" fill={color}/>)}<path d="M116 410H231" stroke="#F9D7DF" strokeWidth="5" strokeLinecap="round"/>
    <rect x="347" y="60" width="72" height="80" rx="11" fill="white"/><text x="358" y="107" fill="#EA1B3D" fontFamily="Geist, Arial, sans-serif" fontSize="37">Aa</text>
  </svg></div>;
}
