'use client'
import { useGetNews } from "@/queries/news/useGetNews";
import React from "react"
export default function NewsTable(){
   
    const {data:news,isLoading,error,refetch}=useGetNews();

    return( 
    
    <div className="w-[100%] font-serif  p-8">
        <div className="mt-2 mb-2 overflow-auto scroll-auto">
                <table className="w-[100%] divide-y ">
                  <thead className="p-3">
                    <tr className="p-3  bg-[#91A1B6] border-[3px]  border-solid ">
                      <th className="px-6 py-3 text-[16px] text-black  tracking-wider w-1/5 rounded-tr-[20px]">
                        الموضوع
                      </th>
                      <th className="px-6 py-3 text-[16px] font-medium text-white  tracking-wider w-1/5">
                        العنوان
                      </th>
                      <th className="px-6 py-3 text-[16px] font-medium text-white  tracking-wider w-1/5">
                      المستخدم                      </th>
                      <th className="px-6 py-3 text-[16px] font-medium text-white  tracking-wider w-1/5">
                      القسم
                      </th>
                      <th className="px-6 py-3 text-[16px] font-medium text-white uppercase tracking-wider w-1/5 text-center rounded-tl-[20px]">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-[3px]" >
                    {news?.map((newsItem)=>(
                    <tr key={newsItem.id}>
                        <td className="px-6 py-4 whitespace-nowrap w-1/5 text-center bg-white">
                        {newsItem.headline}
 
                        </td >
                        <td className="px-6 py-4 whitespace-nowrap w-1/5 text-center bg-white">
                            {newsItem.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap w-1/5 text-center bg-white">
                            {newsItem?.user?.userName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap w-1/5 text-center bg-white">
                            {newsItem.department.depName}
                        </td >
                        <td className="px-6 py-4 whitespace-nowrap w-1/5 text-center bg-white">
                            5
                        </td>
                    </tr>
        ))}
                  </tbody>
                  </table>
                  </div>
                </div>
    )
}