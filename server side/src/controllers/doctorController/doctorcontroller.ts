import { Request,Response,NextFunction } from "express";
import { prisma } from "../..";
import { UnprocessableEntity } from "../../exceptions/valdations";
import { ErrorCode } from "../../exceptions/root";
import { NotFoundException } from "../../exceptions/not-found";
import { doctorSchema } from "../../../prisma/valdateInput";

export const addDoctor = async (req: Request, res: Response, next: NextFunction) => {
    const { depName, weekdays, doctorName, specialist, phone } = req.body;
    doctorSchema.parse(req.body);

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
        next(new UnprocessableEntity(error?.cause?.issues,'Unprocessable Entity',ErrorCode.UPPROCESSABLE_ENTITY))
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
// export const addShift = async (req: Request, res: Response, next: NextFunction) => {
//     const { depName, weekdays, doctorName, specialist, phone } = req.body;

//     try {
//         await prisma.department.create({data:{depName:"h"}})
//         // Find the department
//         const department = await prisma.department.findFirst({
//             where: { depName },
//             select: { id: true }
//         });

//         if (!department) {
//             return res.status(404).json({ message: 'Department not found' });
//         }

//         // Create the shift with the associated doctor and weekdays
//         const shift = await prisma.shift.create({
//             data: {
//               doctor: {
//                 create: {
//                   doctorName,
//                   specialist,
//                   phone,
//                   department: {
//                     connect: { id: department.id }
//                   }
//                 }
//               },
//               startTime: new Date(),
//               endTime: new Date(),
//               weekdays: {
//                 connectOrCreate: weekdays.map((dayId: number) => ({
//                   where: { id: dayId },
//                   create: { id: dayId }
//                 }))
//               }
//             }
//           });

//         res.json(shift);
//     } catch (error) {
//         console.error('Error creating shift:', error);
//         res.status(500).json({ message: 'Internal server error', error });
//     }
// };
// import { Request, Response, NextFunction } from "express";
// import { prisma } from "../.."; // Assuming prisma is a Prisma Client instance

// export const addDoctor = async (req: Request, res: Response, next: NextFunction) => {
//   const depName = req.params.depName;

//   try {
//     // 1. Validate required parameters:
//     const validationErrors = [];
//     if (!depName) {
//       validationErrors.push('Department name (depName) is required.');
//     }
//     if (!req.body.name) {
//       validationErrors.push('Doctor name is required.');
//     }
//     if (!req.body.phone) {
//       validationErrors.push('Doctor phone number is required.');
//     }

//     if (validationErrors.length > 0) {
//       return res.status(400).json({ errors: validationErrors });
//     }

//     // 2. Find department or create if it doesn't exist:
//     let department;
//     try {
//       department = await prisma.department.findFirst({
//         where: { depName },
//         select: { id: true }, // Select only the necessary field for efficiency
//       });
//     } catch (error) {
//       console.error('Error finding department:', error);
//       return next(error); // Re-throw for global error handling
//     }

//     if (!department) {
//       try {
//         department = await prisma.department.create({
//           data: { depName },
//         });
//       } catch (error) {
//         console.error('Error creating department:', error);
//         return next(error); // Re-throw for global error handling
//       }
//     }

//     // 3. Create doctor with department connection:
//     const doctor = await prisma.doctor.create({
//       data: {
//         doctorName: req.body.name,
//         phone: req.body.phone,
//         department: {
//           connect: { id: department.id },
//         },
//       },
//     });

//     // 4. Send successful response:
//     res.status(201).json({ message: 'Doctor added successfully!', doctor });
//   } catch (error) {
//     console.error('Error adding doctor:', error);
//     return next(error); // Re-throw for global error handling
//   }
// };
