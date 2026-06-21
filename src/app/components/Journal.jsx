import React, {useState} from 'react'

const PROMPTS=["What am I grateful for today? 🌷","What did I improve in my deen today? 📖","What will I focus on tomorrow? 🌙"]

export default function JournalTab(){
  const [entries,setEntries]=useState(['','',''])
  const [saved,setSaved]=useState(false)
  const save=()=>{setSaved(true);setTimeout(()=>setSaved(false),2000)}
  const today = new Date()

  return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      <p style={{fontFamily:'Georgia,serif',color:'#7A6E63',fontSize:13,margin:0,textAlign:'center'}}>
        {today.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}
      </p>
      {PROMPTS.map((p,i)=>(
        <div key={i}>
          <label style={{fontSize:13,color:'#5C8A5B',fontFamily:'Georgia,serif',display:'block',marginBottom:6}}>{p}</label>
          <textarea value={entries[i]} onChange={e=>{const n=[...entries];n[i]=e.target.value;setEntries(n)}} rows={3} placeholder="Write here…" style={{width:'100%',border:'1.5px solid #C8DEC7',borderRadius:10,padding:'10px 12px',fontFamily:'Georgia,serif',fontSize:13,color:'#3A3228',background:'#FFFFFF',resize:'vertical',lineHeight:1.6}}/>
        </div>
      ))}
      <button onClick={save} style={{alignSelf:'center',padding:'10px 28px',background:'linear-gradient(135deg,#8BAF8A,#5C8A5B)',color:'#FFFFFF',border:'none',borderRadius:20,fontFamily:'Georgia,serif',fontSize:14,cursor:'pointer',boxShadow:'0 3px 10px #8BAF8A44'}}>{saved?'✓ Saved':'Save Reflection'}</button>
    </div>
  )
}
