import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";

export const addOppon=async(req:Request,res:Response,next:NextFunction)=>{
  const doctorname=req.body.doctorname;
  const doctor=await prisma.doctor.findFirst({where:{doctorName:doctorname},select:{id:true}});
try {
  const oppon=await prisma.oppontement.create({
   data:{
    date:new Date(),
    patient:{
    create:{
    patName:req.body.name,
    phone:req.body.phone,
    address:req.body.address
    }},
    doctor:{
      connect:{id:doctor?.id}
    }
   }
  });

  res.json(oppon)
} catch (error) {
  res.json({message:"error",error})
}
}

