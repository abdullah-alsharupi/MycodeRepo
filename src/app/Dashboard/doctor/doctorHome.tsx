
import { useGetDoctor } from "@/queries/doctors/getAllDoctors";
import React from "react";
import { number } from "zod";

export default function Doctor() {
  const { isLoading, error, data } = useGetDoctor();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
 
  return (
    <div  className="text-black    w-[100%] ">
      <div className="rounded-xl  border-solid mb-[10px] sticky top-0 z-[1]  bg-[#091e3a]">
        <h1 className="text-white text-center justify-items-center  rounded-sm font-serif font-bold text-[20px] items-center">
          الدكاترة
        </h1>
      </div>
     
      
       
    
  {/* <Tooltip text="This button for add user"> 
   
      { <Button onClick={add}  label={"addUser"} className={``}/>}
       </Tooltip>
      <Input onChange={()=>add} value="1234" />
      <Checkbox checked={true} label="السيت" onChange={()=>add}/>
      <Label text="++++"/>
      <DropdownMenu  label="=" onSelect={()=>add} options={["add","delete"]}/>
        <StatusButton onClick={add} status="inactive" /> */}
      {data?.map((data: {
        img: any; doctorName: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; department: { depName: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; 
},index:number) => (
        <div
          key={index}
          className="hover:shadow-2xl hover:shadow-current pr-[10px] pl-[10px] o flex flex-row rounded-sm items-center justify-between  mb-[20px] w-[100%] hover:bg-gray-200 "
        >
         
          <div>
            <img
              src={`/images/${data.img}`}
              alt={`'s avatar`}
              width={50}
              height={50}
              className="rounded-full  bg-black"
            />
          </div>

          <div >
            <h2>{data.doctorName}</h2>
            <h2 className="opacity-70 text-center">
              {data.department.depName}
            </h2>
          </div>
          <div className="opacity-70 text-center">
            <h1>الامراض</h1>
            <div className="opacity-70 text-center font-sans">
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
