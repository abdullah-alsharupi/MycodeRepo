'use client'
import React from "react";
import Link from "next/link";
import { menu } from "./data";
import { useBooleanContext } from "@/app/Dashboard/layout";
export default function Menu() {
  const {isVisible}=useBooleanContext()
  return (
    <div className="text-black   font-serif font-bold text-[20px]   bg-white w-[100%] ">
      <div className="flex justify-center"></div>
      <div className="rounded-xl ml-[10px] mr-[10px] pl-[50px] pr-[50px] pt-[5px] pb-[5px] border-solid max-md:hidden max-lg:hidden max-xl:hidden max-sm:hidden mt-[8%] bg-[#091e3a]"><h1 className="text-white rounded-sm">Dashboard</h1></div>
      {menu.map((item ,index) => (
        <div className="w-[100%] hover:bg-gray-200 hover:shadow-2xl hover:shadow-current " key={index}>
        <label  htmlFor=""></label>

        { <Link  style={{display:`${isVisible && item.id===2 ?`none`:``}`}} href={item.url} className="flex items-center">
           
           <div  className=" text-center p-2 w-[100%]   ">
             {item.title}
           </div>
         </Link>}
       
        </div>
      ))}
    </div>
  );
}
