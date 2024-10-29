
import db from "@/db/db"
import { message } from "antd"
import { hashSync } from "bcrypt"
import { NextResponse } from "next/server"

export async function PUT(request:Request){

const {password,email,token}=await request.json()
try {
  const resetPasswor=await db.users.update({
    where:{email:email,token:token},data:{
      password:hashSync(password, 10),
    }
  })
  return NextResponse.json({message:"تم إعادة تعيين كلمة المرور بنجاح"})

} catch (error) {
  return NextResponse.json({message:"خطأ في إعادة تعيين كلمة المرور"},{status:500})
  
}
}