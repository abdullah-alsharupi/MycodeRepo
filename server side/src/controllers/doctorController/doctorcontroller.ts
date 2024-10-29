import { Request,Response,NextFunction } from "express";
import { prisma } from "../..";
import { UnprocessableEntity } from "../../exceptions/valdations";
import { ErrorCode } from "../../exceptions/root";
import { NotFoundException } from "../../exceptions/not-found";
import { BadRequestsException } from "../../exceptions/bad-request";


export const addDoctor = async (req: Request, res: Response, next: NextFunction) => {
    const {  weekwork, doctorName, specialist, phone,information } = req.body;
  
    const {depName}=req.body.department
    try {
      
        // Find the department
        const department = await prisma.department.findFirst({
            where: { depName },
            select: { id: true }
        });

        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        let doctor = await prisma.doctor.findFirst({
          where: { doctorName },
        });
    
        if (doctor) {
          return next(
            new BadRequestsException(
              "اسم الدكتور موجود فعلا!",
              ErrorCode.USER_ALREADY_EXISTS
            )
          );
        }
        // Create the shift with the associated doctor and weekdays
        const shift = await prisma.doctor.create({
            data: {img:req.file?.filename,
                doctorName,specialist,
                phone,
                information,
                department:{connect:{id:department.id}},
           weekwork:{create:weekwork}
            },
            include:{weekwork:true}
             
            });

        res.json(shift);
    } catch (error:any) {
        next(error)
    }
};




export const updateDoctor = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const {  weekwork, doctorName, specialist, phone,information } = req.body;
const {depName}=req.body.department


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
        img:req.file?.filename,
        doctorName,
        specialist,
        phone,information:information,
        department:{connect: {id:department.id}},
        weekwork: {
          deleteMany:{docID:id},
          create:weekwork, 
        },
      },
      include: { weekwork: true },
    });
   
    res.json(updatedDoctor);
  } catch (error:any) {
      next(new UnprocessableEntity(error?.cause?.issues,'Unprocessable Entity',ErrorCode.UPPROCESSABLE_ENTITY))
  }
};
export const getDoctors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctors = await prisma.doctor.findMany({
        where:{isDeleted:false },
        select: { 
          id:true,
          img:true,
          doctorName:true,
          specialist:true,
        
          department:{select:{depName:true}},
          phone:true,
          information:true,
          weekwork:{select:{startTime:true,endTime:true,day:true}},
          patient:true,
          
         
        },
        
      });
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };
  export const getDoctorsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctors = await prisma.doctor.findFirst({
        where:{id:req.params.id ,isDeleted:false},
        select: { 
          
         img:true,
          doctorName:true,
          specialist:true,
        
          department:{select:{depName:true}},
          phone:true,
          information:true,
          weekwork:{select:{startTime:true,endTime:true,day:true}},
          
         
        },
        
      });
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };

 
  
export const deleteDoctor=async(req:Request,res:Response,next:NextFunction)=>{
 
    const {id}=req.params;
    try {
        await prisma.doctor.update({
            where:{id:id},
            data:{isDeleted:true}
          
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
