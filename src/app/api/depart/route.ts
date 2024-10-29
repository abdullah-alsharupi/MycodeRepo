import db from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  
    const {depName} = await request.json(); 
    
    
    // تحويل الجسم إلى JSON
    try {
     
  
      const user = await db.staff.create({
        data: {
          staffName:"lki",phone:depName,depID:"cm1otby42000hx7hhbk1ujm9p"
          // permissions:{connect:permissionId.map((perId:string)=>({id:perId}))}
        },
      });
      if(user)
      return NextResponse.json(user);
    } catch (error) {
      // طباعة الخطأ في السجل
      return NextResponse.json({ message: 'حدث خطأ أثناء معالجة الطلب' }, { status: 500 });
    }
  }