import { Request ,Response,NextFunction } from "express";
import { prisma } from "../..";
import { date } from "zod";
import { idText } from "typescript";

export const addPatient=async(req:Request,res:Response,next:NextFunction)=>{
const {doctorName,name,phone,address}=req.body;

try {
    const isExist=await prisma.oppontement.findFirst({where:{patient:{patName:name}},select:{date:true,}})
    
    const doctorID=await prisma.doctor.findFirst({where:{doctorName:doctorName},select:{id:true}});

    const patient=await prisma.oppontement.create({
        data:{
            date:new Date(),
            patient:{
                create:{patName:name,phone:phone,address,gender:req.body.gender}
            },

            doctor:{connect:{id:doctorID?.id}}
        },include:{patient:true,doctor:true}

    });
    res.json(patient)

} catch (error) {
    res.status(500).json({message:"errr",error})
}

}

export const updatePatient=async(req:Request,res:Response,next:NextFunction)=>{
    const doctorname=req.body.doctorName;
    try {
        const isExist=await prisma.oppontement.findFirst({where:{patient:{patName:req.body.name}},select:{date:true,}})
        
        const doctorID=await prisma.doctor.findFirst({where:{doctorName:doctorname},select:{id:true}});
    
        const patient=await prisma.oppontement.update({where:{docID_patID:{docID:req.body.docID,patID:req.body.patID}},
            data:{
                date:new Date(),
                patient:{
                    update:{data:{patName:req.body.name,phone:req.body.phone,address:req.body.address}}
                },
    
                doctor:{connect:{id:doctorID?.id}}
            },include:{patient:true,doctor:true}
    
        });
        res.json(patient)
    
    } catch (error) {
        res.status(500).json({message:"errr",error})
    }
    
    }
    export const deletePatientById=async(req:Request,res:Response,next:NextFunction)=>{
        const pateintId=req.params.id;
        try {
            
        
            const patient=await prisma.patient.delete({where:{id:pateintId}
              
        
            });
            res.json(patient)
        
        } catch (error) {
            res.status(500).json({message:"errr",error})
        }
            
            }
           