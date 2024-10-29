import db from "@/db/db";
import { message } from "antd";
import { NextResponse } from "next/server";

export async function GET(){

try {
    const getOppontement = await db.oppontement.findMany({
        where:{isDeleted:false,patient:{isDeleted:false}},
        select: { doctor: {select:{doctorName:true}, }, patient:{select:{patName:true,phone:true,address:true,id:true}},date:true },
      });



      return NextResponse.json(getOppontement)
} catch (error) {
    return NextResponse.json({message:"خطأ في عملية الجلب"},{status:500})
}

}