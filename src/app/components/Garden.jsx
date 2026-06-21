import React from 'react'
import '../styles.css'

const C = {
  cream:'#FAF6EF', sage:'#8BAF8A', 'sage-dark':'#5C8A5B', 'sage-light':'#C8DEC7',
  blush:'#E8C4B8', 'blush-dark':'#C8907A', 'gold':'#C8A96E', 'gold-light':'#EDD9A3',
  text:'#3A3228', 'text-soft':'#7A6E63', white:'#FFFFFF',
  petal1:'#F4B8C8', petal2:'#C8DEC7', petal3:'#EDD9A3', petal4:'#B8D4E8',
}

function GardenPlant({x,y,type,bloom,size=1}){
  const s=size
  const colors={
    rose:[C.petal1,C['blush-dark'],'#2D5A27'],
    tulip:[C.petal3,C.gold,'#3A6B35'],
    daisy:[C.white,C['gold-light'],'#4A7A45'],
    lavender:[C.petal4,'#8A9EC8','#3A5A35'],
    lily:[C.petal2,C.sage,'#2A5025'],
  }
  const [p,a,stem]=colors[type]||colors.rose
  const wilted=!bloom
  return (
    <g transform={`translate(${x},${y})`} style={{opacity:wilted?0.3:1,transition:'opacity 0.8s'}}>
      <line x1="0" y1="0" x2={wilted?'-3':'0'} y2={-34*s} stroke={stem} strokeWidth={2*s}/>
      {!wilted&&<>
        <ellipse cx={-7*s} cy={-14*s} rx={5*s} ry={2.5*s} fill={stem} transform={`rotate(-40,${-7*s},${-14*s})`} opacity="0.7"/>
        <ellipse cx={7*s} cy={-20*s} rx={5*s} ry={2.5*s} fill={stem} transform={`rotate(40,${7*s},${-20*s})`} opacity="0.7"/>
      </>}
      {type==='daisy' ? (
        <g transform={`translate(0,${-36*s})`}>
          {[0,45,90,135,180,225,270,315].map(ang=>(
            <ellipse key={ang} cx={Math.cos(ang*Math.PI/180)*8*s} cy={Math.sin(ang*Math.PI/180)*8*s}
              rx={4*s} ry={2.5*s} fill={p} transform={`rotate(${ang},${Math.cos(ang*Math.PI/180)*8*s},${Math.sin(ang*Math.PI/180)*8*s})`}/>
          ))}
          <circle cx="0" cy="0" r={5*s} fill={a}/>
        </g>
      ) : (
        <g transform={`translate(0,${-36*s})`}>
          {[0,72,144,216,288].map(ang=>(
            <ellipse key={ang}
              cx={Math.cos((ang-90)*Math.PI/180)*7*s} cy={Math.sin((ang-90)*Math.PI/180)*7*s}
              rx={5*s} ry={3*s} fill={p}
              transform={`rotate(${ang},${Math.cos((ang-90)*Math.PI/180)*7*s},${Math.sin((ang-90)*Math.PI/180)*7*s})`} />
          ))}
          <circle cx="0" cy="0" r={4*s} fill={a}/>
        </g>
      )}
    </g>
  )
}

function Butterfly({x,y,active}){
  if(!active) return null
  return (
    <g transform={`translate(${x},${y})`} className="butterfly">
      <ellipse cx="-6" cy="-4" rx="7" ry="5" fill={C.petal1} opacity="0.8"/>
      <ellipse cx="6" cy="-4" rx="7" ry="5" fill={C.petal1} opacity="0.8"/>
      <ellipse cx="-4" cy="2" rx="5" ry="3.5" fill={C.blush} opacity="0.7"/>
      <ellipse cx="4" cy="2" rx="5" ry="3.5" fill={C.blush} opacity="0.7"/>
      <line x1="0" y1="-8" x2="0" y2="6" stroke={C.text} strokeWidth="1"/>
    </g>
  )
}

export default function Garden({completedCount,totalCount,butterflies}){
  const ratio=totalCount>0?completedCount/totalCount:0
  const plants=[
    {x:40,y:130,type:'rose',bloom:ratio>=0.1},
    {x:80,y:120,type:'daisy',bloom:ratio>=0.25,size:0.85},
    {x:130,y:135,type:'tulip',bloom:ratio>=0.4},
    {x:175,y:118,type:'lavender',bloom:ratio>=0.55,size:0.9},
    {x:220,y:130,type:'lily',bloom:ratio>=0.65},
    {x:260,y:122,type:'rose',bloom:ratio>=0.75,size:0.85},
    {x:300,y:130,type:'daisy',bloom:ratio>=0.85,size:1.1},
    {x:345,y:120,type:'tulip',bloom:ratio>=0.92},
    {x:55,y:145,type:'lavender',bloom:ratio>=0.3,size:0.7},
    {x:155,y:148,type:'lily',bloom:ratio>=0.5,size:0.75},
    {x:280,y:145,type:'rose',bloom:ratio>=0.8,size:0.7},
  ]

  return (
    <svg viewBox="0 0 390 160" style={{width:'100%',maxWidth:420,display:'block',margin:'0 auto'}}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EEF6EE"/>
          <stop offset="100%" stopColor="#FAF6EF"/>
        </linearGradient>
        <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8C8A7"/>
          <stop offset="100%" stopColor="#7EA87D"/>
        </linearGradient>
      </defs>
      <rect width="390" height="160" fill="url(#sky)" rx="16"/>
      <ellipse cx="195" cy="160" rx="210" ry="30" fill="url(#grass)"/>
      {plants.map((p,i)=>(<GardenPlant key={i} {...p}/>))}
      <Butterfly x={100} y={70} active={butterflies>=1}/>
      <Butterfly x={200} y={55} active={butterflies>=2}/>
      <Butterfly x={300} y={68} active={butterflies>=3}/>
      {ratio===1 && <text x="195" y="28" textAnchor="middle" fontSize="11" fill="#C8A96E" fontFamily="Georgia,serif">✦ Garden in Full Bloom ✦</text>}
    </svg>
  )
}
