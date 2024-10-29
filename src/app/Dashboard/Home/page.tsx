"use client";
import React, { useContext } from "react";
import Doctor from "../doctor/doctorHome";
import BigChartBox from "../chart/page";
import DepartmentHome from "../department/departmentHome";
import AppointmentToday from "../patients/patientHome";
import { PermissionContext } from "../../permision/hashpermision";
import { apifetch } from "@/api";
import { useCookies } from "react-cookie";
import { NextResponse } from "next/server";

export default function Home() {
  const permission = useContext(PermissionContext);


  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 p-4 font-serif">
      <div className="rounded-lg border border-gray-200 shadow-lg bg-white col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-4">
        <BigChartBox />
      </div>

      <div className="rounded-lg border overflow-scroll border-gray-200 shadow-lg bg-white h-80   col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
        <Doctor />
      </div>

      <div className="rounded-lg border border-gray-200 shadow-lg bg-white h-72 overflow-y-auto mb-4  col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-4">
        <div className="sticky top-0 z-10 bg-[#091e3a] p-4">
          <h1 className="text-2xl font-normal text-center text-white font-serif">
            حجوزات اليوم
          </h1>
        </div>
        <AppointmentToday />
      </div>

      <div style={{scrollbarWidth:"none"}}  className="rounded-lg border overflow-scroll border-gray-200 shadow-lg bg-white h-72   col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
        <DepartmentHome />
      </div>
    </div>
  );
}