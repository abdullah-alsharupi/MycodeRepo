import db from "@/db/db";
import { json } from "stream/consumers";
import nodemailer from 'nodemailer'
import { compileWelcomeTemplate } from "@/lib/mail";
import { NextResponse } from "next/server";
import { message } from "antd";
export async function POST(request:Request){
const {email}=await request.json()
try {
    const findEamil=await db.users.findFirst({
        where:{email:email},select:{email:true,token:true}
      })
      if(findEamil){
  
        const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
        
          const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: SMTP_EMAIL,
              pass: SMTP_PASSWORD,
            },
          });
          try {
            const testResult = await transport.verify();
            
          } catch (error) {
         
            return;
          }
        
          try {
            const sendResult = await transport.sendMail({
              from: SMTP_EMAIL,
              to:email,
              subject:"reset password",
              html:compileWelcomeTemplate("reset Password", `http://localhost:3000/resetPassword?token=${findEamil.token}&email=${email}`),
            });
         
          return NextResponse.json({message:"تم الإرسال بنجاح"})
          } 
          catch (error) {
            console.log(error);
          }
        
              
            }




} catch (error) {
    
}


    
}