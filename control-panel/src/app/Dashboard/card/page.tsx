"use client"

import { Port_Lligat_Sans } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  Row?: any;
  NameOfField?: any;
  height?: any;
  width?: any;
  header?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Card(props: Props) {
  const [show,setShow]=useState<any>();
  
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedDays, setSelectedDays] = useState<
    { day: string; startTime: string; endTime: string }[]
  >([]);

  const handleDropdownToggle = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const handleCheckboxChange = (workItem: any) => {
    const { day } = workItem;
    setSelectedDays((prev) => {
      const isSelected = prev.some((item) => item.day === day);
      if (isSelected) {
        return prev.filter((item) => item.day !== day);
      } else {
        return [
          ...prev,
          {
            day: day,
            startTime: new Date(workItem.startTime)
              .toLocaleTimeString("it-IT")
              .slice(0, 5),
            endTime: new Date(workItem.endTime)
              .toLocaleTimeString("it-IT")
              .slice(0, 5),
          },
        ];
      }
    });
  };

  const handleTimeChange = (
    day: string,
    type: "startTime" | "endTime",
    time: string
  ) => {
    setSelectedDays((prev) =>
      prev.map((item) => (item.day === day ? { ...item, [type]: time } : item))
    );
  };

  const renderTable = (data:any) => (
    <div className="w-[100%] table border-collapse">
      <div style={{ display: "table-header-group" }}>
        <div style={{ display: "table-row" }}>
          {props.NameOfField?.map((field: any, idx: number) => (
            <div
              key={idx}
              style={{
                width: "calc(100% / " + props.NameOfField.length + ")",
              }}
              className="table-cell text-center border-solid border-slate-200 border-b-[10px] p-[10px] mb-[3px]"
            >
              {field}
            </div>
          ))}
        </div>
      </div>
      <div className="table-row-group">
        {data?.map((item: any, index: number) => (
          <div key={index} style={{ display: "table-row" }}>
            {Object.entries(item).map(
              ([key, value]: [string, any], idx: number) => (
                key!=="id"&&<div
                key={idx}
                style={{
                  width:
                    "calc(100% / " + (props.NameOfField.length + 1) + ")",
                }}
                className="table-cell text-center align-middle border-solid border-slate-200 border-b-[5px] p-[10px] mb-[3px]"
              >
                {typeof value === "object" &&
                Array.isArray(value) &&
                key === "weekwork" ? (
                  <>
                    <button
                      className="flex items-center h-[30px]   overflow-clip w-full   text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        handleDropdownToggle(index);
                      }}
                    >
                      {selectedIndex == index
                        ? `${selectedDays.map((day) => day.day).join(", ")}`
                        : value.length > 0
                        ? `${value.map((day) => day.day).join(", ")}`
                        : ""}
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          selectedIndex === index ? "rotate-80" : ""
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {selectedIndex === index && (
                      <div
                        style={{
                          position: "absolute",
                          backgroundColor: "white",
                          border: "1px solid black",
                          zIndex: 1,
                          width: "320px",
                        }}
                      >
                        {value.map((workItem: any, workIdx: number) => (
                          <div key={workIdx}>
                            <label>
                              <input
                                type="checkbox"
                                checked={
                                  !!selectedDays.find(
                                    (item) => item.day === workItem.day
                                  )
                                }
                                onChange={() =>
                                  handleCheckboxChange(workItem)
                                }
                              />
                              {workItem.day}:
                              <input
                                type="time"
                                value={
                                  selectedDays.find(
                                    (item) => item.day === workItem.day
                                  )?.startTime ||
                                  new Date(workItem.startTime)
                                    .toLocaleTimeString("it-IT")
                                    .slice(0, 5)
                                }
                                onChange={(e) =>
                                  handleTimeChange(
                                    workItem.day,
                                    "startTime",
                                    e.target.value
                                  )
                                }
                              />{" "}
                              إلى
                              <input
                                type="time"
                                value={
                                  selectedDays.find(
                                    (item) => item.day === workItem.day
                                  )?.endTime ||
                                  new Date(workItem.endTime)
                                    .toLocaleTimeString("it-IT")
                                    .slice(0, 5)
                                }
                                onChange={(e) =>
                                  handleTimeChange(
                                    workItem.day,
                                    "endTime",
                                    e.target.value
                                  )
                                }
                              />
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : typeof value === "object" ? (
                  <div>{value.depName}</div>
                ) : (
                value
                )}
              </div>
              )
            )}
            <div
              style={{}}
              className="table-cell align-middle  text-center   border-solid border-slate-200 border-b-[5px] p-[10px] mb-[3px]"
            >
             <div className="flex flex-row gap-3">

             
                <Link className="bg-yellow-500 text-white text flex justify-items-center rounded" href={`../Update/${item.id}`}> تعديل </Link>
               
              
              <button
                onClick={() => {
                  console.log(item);
                }}
                className="bg-yellow-500 text-white text flex justify-items-center rounded"
              >
                حذف
              </button>
             </div>
            </div>
          </div>
        ))} 
      </div>
    </div>
  );
  console.log(selectedDays);
  return (
     <div className="w-[100%] table border-collapse">
    
       
                <div
      style={{ height: `${props.height}`, width: `${props.width}` }}
      className="bg-white justify-center"
    >
      <h1 className="text-center font-serif font-bold">{props.header}</h1>
      {Array.isArray(props.Row) ? (
        renderTable(props.Row)
      ) : (
        <div className="w-[100%] h-[100%]">{props.Row}</div>
      )}


    </div>
    </div>
  );

  function update(items:any) {
    return (
      <div className="w-screen h-screen absolute top-0 left-0 bg-[rgba(0,0,0,0.724)] flex items-center justify-center">
        <div className="p-[50px] rounded-[10px] bg-white  relative ">
          <span
           
            className="cursor-pointer top-[10px] right-[10px] absolute hover:bg-red-700 p-[5px] rounded-[5px]"
          >
            X
          </span>
          <h1 className="mb-[40px] text-[20px] text-black font-bold font-serif">
            {" "}
            إضافةجديد{" "}
          </h1>
          <form className="flex flex-wrap max-w-[500px] justify-between">
            {
              <div className="flex flex-col gap-[10px] mb-[20px] font-serif font-bold w-[40%]">
                <label className="text-[14px] text-black font-serif font-bold"></label>

                <div className="w-[100%] table border-collapse">
    
       
                <div
      style={{ height: `${props.height}`, width: `${props.width}` }}
      className="bg-white justify-center"
    >
      <h1 className="text-center font-serif font-bold">{props.header}</h1>
      {Array.isArray(props.Row) ? (
        renderTable(props.Row)
      ) : (
        <div className="w-[100%] h-[100%]">{props.Row}</div>
      )}


    </div>
    </div>
              </div>
            }
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
  }
}
