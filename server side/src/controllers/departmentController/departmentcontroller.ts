import { Request,Response,NextFunction } from "express";
import { prisma } from "../..";

export const addDepartment=async(req:Request,res:Response,next:NextFunction)=>{
try {
    
    const department=await prisma.department.create({
        data:{
            depName:req.body.name,
        },
    });
    res.json(department)
} catch (error) {
    res.status(500).json({message:"error",error});
}
}