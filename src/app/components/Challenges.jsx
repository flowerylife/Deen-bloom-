import React, {useState} from 'react'

const CHALLENGES_DATA=[
  {name:'7-Day Salah Challenge',days:7,icon:'🕌',reward:'Rose 🌹'},
  {name:'30-Day Quran Challenge',days:30,icon:'📖',reward:'Lily 🌸'},
  {name:'7 Days Without Gossip',days:7,icon:'🤐',reward:'Daisy 🌼'},
  {name:'Morning Adhkar Challenge',days:14,icon:'🌅',reward:'Tulip 🌷'},
  {name:'Tahajjud Challenge',days:21,icon:'🌙',reward:'Lavender 💜'},
]

export default function ChallengesTab(){
  const [progress,setProgress]=useState(CHALLENGES_DATA.map(()=>0))
  const checkin=(i)=>setProgress(p=>{const n=[...p];if(n[i]<CHALLENGES_DATA[i].days)n[i]++;return n})

  return (
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      {CHALLENGES_DATA.map((ch,i)=>{
        const pct=Math.round((progress[i]/ch.days)*100)
        const done=progress[i]===ch.days
        return (
          <div key={i} style={{background:'#FFFFFF',borderRadius:14,padding:'14px 16px',boxShadow:'0 2px 10px rgba(0,0,0,0.07)',border:done?`1.5px solid #C8A96E`:'none'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:20}}>{ch.icon}</span>
                <div>
                  <p style={{margin:0,fontSize:13,fontFamily:'Georgia,serif',color:'#3A3228'}}>{ch.name}</p>
                  <p style={{margin:0,fontSize:11,color:'#7A6E63'}}>{progress[i]}/{ch.days} days · Unlocks {ch.reward}</p>
                </div>
              </div>
              {done ? <span style={{fontSize:18}}>🌸</span> : <button onClick={()=>checkin(i)} style={{padding:'5px 12px',background:'linear-gradient(135deg,#8BAF8A,#5C8A5B)',color:'#FFFFFF',border:'none',borderRadius:10,fontSize:11,fontFamily:'Georgia,serif',cursor:'pointer'}}>+Day</button>}
            </div>
            <div style={{height:6,background:'#C8DEC7',borderRadius:3,overflow:'hidden'}}>
              <div style={{height:'100%',width:`${pct}%`,background:'linear-gradient(90deg,#8BAF8A,#5C8A5B)',borderRadius:3,transition:'width 0.4s'}}/>
            </div>
            {done && <p style={{margin:'6px 0 0',fontSize:11,color:'#C8A96E',fontFamily:'Georgia,serif'}}>✦ Challenge complete! Rare flower unlocked in your garden.</p>}
          </div>
        )
      })}
    </div>
  )
}
