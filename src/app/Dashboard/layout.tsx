"use client";
import Home from "./Home/page";
import Menu from "../components/Menu/page";
import NavBar from "../components/navbar/page";
import FunProvider from "../permision/hashpermision";
import { apifetch } from "@/api";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { dividerClasses } from "@mui/material";
import Doctor from "./doctor/doctorHome";
import axios from "axios";
import React, { createContext, useContext, ReactNode } from "react";
import { NextResponse } from "next/server";

// Define the shape of your context value

interface BooleanContextType {
  isVisible: boolean;
  toggleVisibility: () => void;
}

// إنشاء السياق مع قيمة افتراضية
const disableButtonCUD = createContext<BooleanContextType | undefined>(
  undefined
);

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
 
  const [cookies] = useCookies(["authToken", "id"]);
  const [authorize, setAuthorize] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
const [logout,setLogOut]=useState(true)
  const router = useRouter();
  const Authorization = async () => {
   
   if(cookies.authToken===undefined){

    router.push('/login')
   }
   

    
 
    if (cookies.authToken && cookies.id) {
      const response = await apifetch.get(`/login`, {
        headers: { Authorization: `Bearer ${cookies.authToken}` },
      });

      if (response.data.map((e: any) => e.role) == "user") {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };
  Authorization();
  //  const checkSession = async () => {
  //    try {

  //      if (cookies.authToken&&cookies.id) {

  //   const response= await apifetch.get(`/getUserbyId/${cookies.id}`,{headers:{Authorization:`${cookies.authToken}`}});
  //        if (response.status === 200 && response.data) {

  //          setAuthorize(true)
  //        } else {

  //        }
  //      }  else {

  //      }
  //    } catch (error: any) {

  //      console.error('Error checking session:', error);
  //    }
  //  }

  //checkSession()
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    authorize && (
      <>
        <div className="flex bg-slate-200 w-[100%] font-serif">
          <disableButtonCUD.Provider value={{ isVisible, toggleVisibility }}>
            <div
              className="font-sans shadow-lg  text-black p-1 flex-flex4 flex max-sm:w-[80%] flex-col h-[100%] "
              dir="rtl"
            >
              <NavBar />

              <div className=" pr-5 pl-5  mt-[10px] bg-slate-200 w-[100%]">
                <FunProvider>{children}</FunProvider>
              </div>
            </div>
            <div className=" rounded-[10px] border-solid border-white  border-[10px] bg-white w-[20%] ">
              <Menu />
            </div>{" "}
          </disableButtonCUD.Provider>
        </div>
        {/*    :router.push('../components/Forbidden') */}
      </>
    )
  );
}
export const useBooleanContext = () => {
  const context = useContext(disableButtonCUD);
  if (context === undefined) {
    throw new Error("useBooleanContext must be used within a BooleanProvider");
  }
  return context;
};
