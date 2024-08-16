import React from 'react'

export default function NavBar() {
  return (
    <div className='flex justify-between  w-[100%] fixed top-0 left-0  z-[999] shadow-md p-[10px]' style={{ position: 'sticky', top: 0, zIndex: 1 }}>
    <div className='flex mt-5 items-center gap-10'  >
      <img src="logo.svg" alt="log" width={25} height={5}/>
      <span>
        Dashboard 
      </span>
    </div>
    <div className='flex space-x-4 mt-5 items-center'>
    <img src="search.svg" alt="log" width={25} height={5} className='max-sm:hidden'/>
    <img src="app.svg" alt="log" width={25} height={5} className='max-sm:hidden'/>
    <img src="/expand.svg" alt="log" width={25} height={5} className='max-sm:hidden'/>
      <div className=' flex items-center relative'>
      <img src="/notifications.svg" alt="log" width={25} height={5}/>
      <span className='bg-red-600 text-white w-5 h-5 rounded-full absolute -top-4 -right-3 flex justify-center items-center'>1</span>

      </div>
      <div className='flex items-center gap-2'>
        <img src="/users.png" alt="" width={26} height={26} className='rounded-[50%] object-cover' />
        <span>abood</span>
      </div>
      <img src="/setting.svg" alt="log" width={25} height={5} className='max-sm:hidden'/>

      

    </div>
    </div>
  );
}

