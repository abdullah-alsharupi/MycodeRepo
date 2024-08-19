import { Request,Response,NextFunction } from "express";
import { prisma } from "../..";
import { UnprocessableEntity } from "../../exceptions/valdations";
import { ErrorCode } from "../../exceptions/root";
import { NotFoundException } from "../../exceptions/not-found";


export const addDoctor = async (req: Request, res: Response, next: NextFunction) => {
    const { depName, weekdays, doctorName, specialist, phone } = req.body;
  

    try {
      
        // Find the department
        const department = await prisma.department.findFirst({
            where: { depName },
            select: { id: true }
        });

        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        // Create the shift with the associated doctor and weekdays
        const shift = await prisma.doctor.create({
            data: {
                doctorName,specialist,
                phone,
                department:{connect:{id:department.id}},
           weekwork:{create:weekdays}
            },
            include:{weekwork:true}
             
            });

        res.json(shift);
    } catch (error:any) {
        next(error)
    }
};

export const getDoctors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctors = await prisma.doctor.findMany({
        include: {
          weekwork: true,
          department: true,
        },
      });
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };

  export const updateDoctor = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { depName, weekdays, doctorName, specialist, phone } = req.body;
  
    try {
      // Find the department
      const department = await prisma.department.findFirst({
        where: { depName },
        select: { id: true },
      });
  
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
 
      const updatedDoctor = await prisma.doctor.update({
        where: { id:id },
        data: {
          doctorName,
          specialist,
          phone,
          department:{connect:{id:department.id}},
          weekwork: {
            deleteMany: { docID:id },
            create: weekdays, 
          },
        },
        include: { weekwork: true },
      });
     
      res.json(updatedDoctor);
    } catch (error:any) {
        next(new UnprocessableEntity(error?.cause?.issues,'Unprocessable Entity',ErrorCode.UPPROCESSABLE_ENTITY))
    }
  };
  
export const deleteDoctor=async(req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params;
    try {
        await prisma.doctor.delete({
            where:{id:id}
        });
        res.json({message:"deleted successfully"})
    } catch (error) {
        next(error)
    }
}
export const searchDoctor=async(req:Request,res:Response,next:NextFunction)=>{

    try {
        const doctor=await prisma.doctor.findFirst({
           where:{doctorName:{
            contains:req.body.doctorName,
        }},include:{
            department:true,
            weekwork:true
           }
        });
        if(doctor){
           
            res.json(doctor)
        }
        else
        {
            next(new NotFoundException('Doctor not found',ErrorCode.USER_NOT_FOUND))
        }


    } catch (error) {
        next(error)
    }
}
