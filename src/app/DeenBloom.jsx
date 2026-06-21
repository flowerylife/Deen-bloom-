import React, {useState} from 'react'
import Garden from './components/Garden'
import TasbeehTab from './components/Tasbeeh'
import JournalTab from './components/Journal'
import DuaTab from './components/Dua'
import ChallengesTab from './components/Challenges'
import '../styles.css'

const PRAYERS=["Fajr","Dhuhr","Asr","Maghrib","Isha","Tahajjud"]
const ADHKAR=["Morning Adhkar","Evening Adhkar","Daily Dhikr","Islamic Learning"]
const TABS=[
  {id:"home",label:"Home",icon:"🌷"},
  {id:"salah",label:"Salah",icon:"🕌"},
  {id:"quran",label:"Quran",icon:"📖"},
  {id:"tasbeeh",label:"Tasbeeh",icon:"📿"},
  {id:"challenges",label:"Challenges",icon:"🌟"},
  {id:"journal",label:"Journal",icon:"📝"},
  {id:"duas",label:"Duas",icon:"🤲"},
]

export default function DeenBloom(){
  const [tab,setTab]=useState('home')
  const [prayers,setPrayers]=useState(PRAYERS.map(()=>false))
  const [adhkar,setAdhkar]=useState(ADHKAR.map(()=>false))
  const [quranPages,setQuranPages]=useState(0)
  const quranGoal=5
  const [surahs,setSurahs]=useState(0)

  const totalHabits=PRAYERS.length+ADHKAR.length+1
  const completedHabits=prayers.filter(Boolean).length+adhkar.filter(Boolean).length+(quranPages>=quranGoal?1:0)
  const butterflies=[33,66,100].filter(t=>Math.round(completedHabits/totalHabits*100)>=t).length
  const pct=Math.round(completedHabits/totalHabits*100)

  const togglePrayer=(i)=>setPrayers(p=>{const n=[...p];n[i]=!n[i];return n;})
  const toggleAdhkar=(i)=>setAdhkar(a=>{const n=[...a];n[i]=!n[i];return n;})

  const card={background:'var(--white)',borderRadius:18,padding:'18px 18px',margin:'0 16px 14px',boxShadow:'0 2px 16px rgba(0,0,0,0.06)'}
  const secTitle={fontSize:13,color:'var(--sage-dark)',letterSpacing:1,margin:'0 0 12px',textTransform:'uppercase',fontFamily:'Georgia,serif'}
  const row={display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:`1px solid var(--cream)`}
  const chk=(checked)=>({width:22,height:22,borderRadius:6,border:`2px solid ${checked?'var(--sage)':'var(--sage-light)'}`,
    background:checked?'var(--sage)':'transparent',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0,transition:'all 0.2s'})

  return (
    <div style={{minHeight:'100vh',background:'var(--cream)',fontFamily:'Georgia,serif',maxWidth:430,margin:'0 auto',paddingBottom:72}}>
      <div style={{padding:'20px 20px 0',textAlign:'center'}}>
        <h1 style={{fontSize:24,color:'var(--sage-dark)',margin:0,letterSpacing:1}}>🌷 DeenBloom</h1>
        <p style={{fontSize:12,color:'var(--text-soft)',margin:'4px 0 0',letterSpacing:2}}>GROW YOUR DEEN, ONE DAY AT A TIME</p>
      </div>

      {tab==='home' && <>
        <div style={{...card,padding:'16px 12px'}}>
          <p style={{...secTitle,textAlign:'center'}}>Your Garden Today</p>
          <Garden completedCount={completedHabits} totalCount={totalHabits} butterflies={butterflies} />
          <div style={{display:'flex',justifyContent:'center',gap:6,marginTop:10}}>
            <div style={{background:'var(--sage-light)',borderRadius:10,padding:'4px 14px',fontSize:12,color:'var(--sage-dark)'}}>
              {completedHabits}/{totalHabits} habits · {pct}%
            </div>
            {butterflies>0 && <div style={{background:'var(--petal1)55',borderRadius:10,padding:'4px 10px',fontSize:12,color:'var(--blush-dark)'}}>🦋 ×{butterflies}</div>}
          </div>
        </div>

        <div style={{...card,background:`linear-gradient(135deg,var(--sage-light)33,var(--petal3)33)`,border:`1px solid var(--gold-light)`}}>
          <p style={secTitle}>📜 Card of the Day</p>
          <p style={{fontSize:13,color:'var(--text)',lineHeight:1.7,margin:0}}>A short daily reminder for your practice.</p>
        </div>

        <div style={card}>
          <p style={secTitle}>🕌 Salah</p>
          {PRAYERS.slice(0,5).map((pr,i)=>(
            <div key={i} style={row}>
              <div style={chk(prayers[i])} onClick={()=>togglePrayer(i)}>
                {prayers[i] && <span style={{fontSize:13,color:'var(--white)'}}>✓</span>}
              </div>
              <span style={{fontSize:14,color:prayers[i]?'var(--text)':'var(--text-soft)'}}>{pr}</span>
              {prayers[i] && <span style={{marginLeft:'auto',fontSize:11,color:'var(--gold)'}}>✦ Alhamdulillah</span>}
            </div>
          ))}
        </div>

        <div style={card}>
          <p style={secTitle}>🌿 Daily Habits</p>
          {ADHKAR.map((a,i)=>(
            <div key={i} style={row}>
              <div style={chk(adhkar[i])} onClick={()=>toggleAdhkar(i)}>
                {adhkar[i] && <span style={{fontSize:13,color:'var(--white)'}}>✓</span>}
              </div>
              <span style={{fontSize:14,color:adhkar[i]?'var(--text)':'var(--text-soft)'}}>{a}</span>
            </div>
          ))}
        </div>

        <div style={{...card,marginBottom:0}}>
          <p style={secTitle}>📖 Quran Today</p>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <button onClick={()=>setQuranPages(p=>Math.max(0,p-1))}
              style={{width:32,height:32,borderRadius:8,border:`1.5px solid var(--sage-light)`,background:'none',fontSize:16,cursor:'pointer',color:'var(--sage)'}}>−</button>
            <div style={{flex:1,textAlign:'center'}}>
              <span style={{fontSize:22,color:'var(--sage-dark)'}}>{quranPages}</span>
              <span style={{fontSize:12,color:'var(--text-soft)'}}> / {quranGoal} pages</span>
            </div>
            <button onClick={()=>setQuranPages(p=>p+1)}
              style={{width:32,height:32,borderRadius:8,border:`1.5px solid var(--sage-light)`,background:'none',fontSize:16,cursor:'pointer',color:'var(--sage)'}}>+</button>
          </div>
          <div style={{height:6,background:'var(--sage-light)',borderRadius:3,overflow:'hidden',marginTop:12}}>
            <div style={{height:'100%',width:`${Math.min(quranPages/quranGoal*100,100)}%`,background:`linear-gradient(90deg,var(--sage),var(--sage-dark))`,borderRadius:3,transition:'width 0.3s'}}/>
          </div>
          {quranPages>=quranGoal && <p style={{margin:'8px 0 0',fontSize:12,color:'var(--gold)'}}>✦ Daily Quran goal reached! BārakAllāhu fīk.</p>}
        </div>
      </>}

      {tab==='salah' && <div style={card}><p style={secTitle}>🕌 Daily Salah Tracker</p></div>}
      {tab==='quran' && <div style={card}><p style={secTitle}>📖 Quran Tracker</p></div>}
      {tab==='tasbeeh' && <div style={card}><TasbeehTab/></div>}
      {tab==='challenges' && <div style={{padding:'0 16px'}}><ChallengesTab/></div>}
      {tab==='journal' && <div style={card}><JournalTab/></div>}
      {tab==='duas' && <div style={{padding:'0 16px'}}><DuaTab/></div>}

      <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:430,background:'var(--white)',borderTop:`1px solid var(--sage-light)`,display:'flex',justifyContent:'space-around',padding:'8px 0 10px',boxShadow:'0 -2px 12px rgba(0,0,0,0.07)'}}>
        {TABS.map(t=>(
          <div key={t.id} onClick={()=>setTab(t.id)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,cursor:'pointer',opacity:tab===t.id?1:0.45,transition:'opacity 0.2s'}}>
            <span style={{fontSize:18}}>{t.icon}</span>
            <span style={{fontSize:9,color:tab===t.id?'var(--sage-dark)':'var(--text-soft)',letterSpacing:0.5}}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
