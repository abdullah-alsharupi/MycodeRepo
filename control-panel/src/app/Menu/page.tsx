import React from 'react'
import Link  from "next/link"
import { menu } from '../../../data'
export default function Menu() {
  return (
    <div>
      {menu.map((item)=>(
       
       
          <div className='w-[100%]'  key={item.id} >
          <Link href={item.url} className='flex items-center gap-[4px] '>
          <img src={item.icon} alt={item.title}  />
          <span className="hover:bg-slate-400 p-2 w-[100%] rounded-md  max-lg:hidden">{item.title}</span>
          </Link>
          </div>
      ))}
     
    </div>
  )
}


