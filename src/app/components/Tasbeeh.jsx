import React, {useState} from 'react'

const TASBEEH_LIST=[
  {ar:"سُبْحَانَ اللهِ",en:"SubhanAllah",goal:33},
  {ar:"الْحَمْدُ لِلّهِ",en:"Alhamdulillah",goal:33},
  {ar:"اللهُ أَكْبَرُ",en:"Allahu Akbar",goal:33},
  {ar:"أَسْتَغْفِرُ اللهَ",en:"Astaghfirullah",goal:100},
  {ar:"صَلِّ عَلَى النَّبِيِّ",en:"Salawat",goal:100},
]

export default function TasbeehTab(){
  const [counts,setCounts]=useState(TASBEEH_LIST.map(()=>0))
  const [active,setActive]=useState(0)
  const tap=()=>{setCounts(c=>{const n=[...c];if(n[active]<TASBEEH_LIST[active].goal)n[active]++;return n;})}
  const reset=()=>setCounts(c=>{const n=[...c];n[active]=0;return n;})
  const t=TASBEEH_LIST[active]
  const count=counts[active]
  const pct=Math.round((count/t.goal)*100)
  const circ=2*Math.PI*56

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16,padding:'8px 0'}}>
      <div style={{display:'flex',gap:6,flexWrap:'wrap',justifyContent:'center'}}>
        {TASBEEH_LIST.map((tt,i)=>(<button key={i} onClick={()=>setActive(i)} style={{padding:'6px 12px',borderRadius:20,border:`1.5px solid ${active===i?'#8BAF8A':'#C8DEC7'}`,background:active===i?'#8BAF8A':'transparent',color:active===i?'#FFFFFF':'#5C8A5B',fontFamily:'Georgia,serif',fontSize:12,cursor:'pointer',transition:'all 0.2s'}}>{tt.en}</button>))}
      </div>
      <p style={{fontFamily:'Georgia,serif',fontSize:30,color:'#5C8A5B',margin:0,letterSpacing:2,direction:'rtl'}}>{t.ar}</p>
      <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <svg width="130" height="130">
          <circle cx="65" cy="65" r="56" fill="none" stroke="#C8DEC7" strokeWidth="7"/>
          <circle cx="65" cy="65" r="56" fill="none" stroke="#8BAF8A" strokeWidth="7" strokeDasharray={`${circ*pct/100} ${circ}`} strokeLinecap="round" transform="rotate(-90 65 65)" style={{transition:'stroke-dasharray 0.3s'}}/>
        </svg>
        <div style={{position:'absolute',textAlign:'center'}}>
          <div style={{fontSize:30,fontFamily:'Georgia,serif',color:'#3A3228',fontWeight:'bold'}}>{count}</div>
          <div style={{fontSize:11,color:'#7A6E63'}}>of {t.goal}</div>
        </div>
      </div>
      <button onClick={tap} disabled={count>=t.goal} style={{width:80,height:80,borderRadius:'50%',border:'none',background:count>=t.goal?'#C8DEC7':`linear-gradient(135deg,#8BAF8A,#5C8A5B)`,color:'#FFFFFF',fontSize:22,cursor:count>=t.goal?'default':'pointer',boxShadow:'0 4px 16px #8BAF8A55',transition:'all 0.15s'}}>{count>=t.goal?'✓':'◉'}</button>
      {count>=t.goal && <p style={{color:'#C8A96E',fontFamily:'Georgia,serif',fontSize:14,margin:0}}>🦋 MashaAllah! Goal reached!</p>}
      <button onClick={reset} style={{fontSize:11,color:'#7A6E63',background:'none',border:'none',cursor:'pointer',textDecoration:'underline'}}>Reset</button>
    </div>
  )
}
