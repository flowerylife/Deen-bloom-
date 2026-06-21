import React, {useState} from 'react'

const INIT_DUAS=[
  {text:'Grant my family ease and happiness',category:'Family',status:'Making Dua'},
  {text:'Guide me in my Quran memorisation',category:'Hifz',status:'Making Dua'},
  {text:'Grant me good health and afiyah',category:'Health',status:'Answered 🤲'},
]
const STATUSES=['Making Dua','Answered 🤲','Ongoing']

export default function DuaTab(){
  const [duas,setDuas]=useState(INIT_DUAS)
  const [newText,setNewText]=useState('')
  const [newCat,setNewCat]=useState('Family')
  const add=()=>{if(!newText.trim())return;setDuas(d=>[...d,{text:newText.trim(),category:newCat,status:'Making Dua'}]);setNewText('')}
  const cycleStatus=(i)=>setDuas(d=>{const n=[...d];const cur=STATUSES.indexOf(n[i].status);n[i]={...n[i],status:STATUSES[(cur+1)%STATUSES.length]};return n})
  const remove=(i)=>setDuas(d=>d.filter((_,j)=>j!==i))
  const sc=s=>s==='Answered 🤲'?'#8BAF8A':s==='Ongoing'?'#C8A96E':'#C8907A'

  return (
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      {duas.map((d,i)=>(
        <div key={i} style={{background:'#FFFFFF',borderRadius:12,padding:'12px 14px',boxShadow:'0 1px 8px rgba(0,0,0,0.07)',display:'flex',alignItems:'flex-start',gap:10}}>
          <div style={{flex:1}}>
            <p style={{margin:0,fontSize:13,color:'#3A3228',fontFamily:'Georgia,serif',lineHeight:1.5}}>{d.text}</p>
            <span style={{fontSize:11,color:'#7A6E63'}}>{d.category}</span>
          </div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:4}}>
            <button onClick={()=>cycleStatus(i)} style={{fontSize:10,padding:'3px 8px',borderRadius:10,border:`1px solid ${sc(d.status)}`,color:sc(d.status),background:'transparent',cursor:'pointer',whiteSpace:'nowrap'}}>{d.status}</button>
            <button onClick={()=>remove(i)} style={{fontSize:10,color:'#7A6E63',background:'none',border:'none',cursor:'pointer'}}>✕</button>
          </div>
        </div>
      ))}
      <div style={{background:'#FFFFFF',borderRadius:12,padding:'12px 14px',boxShadow:'0 1px 8px rgba(0,0,0,0.07)'}}>
        <p style={{margin:'0 0 8px',fontSize:12,color:'#5C8A5B',fontFamily:'Georgia,serif'}}>+ Add a Dua</p>
        <input value={newText} onChange={e=>setNewText(e.target.value)} placeholder="Write your dua…" style={{width:'100%',border:'1.5px solid #C8DEC7',borderRadius:8,padding:'8px 10px',fontFamily:'Georgia,serif',fontSize:13,marginBottom:8}}/>
        <div style={{display:'flex',gap:8}}>
          <select value={newCat} onChange={e=>setNewCat(e.target.value)} style={{flex:1,border:'1.5px solid #C8DEC7',borderRadius:8,padding:'6px 8px',fontFamily:'Georgia,serif',fontSize:12}}>{['Family','Health','Hifz','Studies','Rizq','General'].map(c=>(<option key={c}>{c}</option>))}</select>
          <button onClick={add} style={{padding:'6px 16px',background:'#8BAF8A',color:'#FFFFFF',border:'none',borderRadius:8,fontFamily:'Georgia,serif',fontSize:12,cursor:'pointer'}}>Add</button>
        </div>
      </div>
    </div>
  )
}
