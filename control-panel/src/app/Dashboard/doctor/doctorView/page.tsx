"use client";
import React, { useState } from "react";
import Card from "../../card/page";
import { useGetDoctor } from "@/queries/doctors/getAllDoctors";


export default function Doctors() {
  const [open, setOpen] = useState(false);
  const { isPending, data } = useGetDoctor();

  return (
    <div className="">
       
<Card Row={data} NameOfField={["اسم الطبيب","التخصص"," القسم","رقم الهاتف","اوقات الدوام"]} header=""></Card>
      
       
    </div>
  );
}
