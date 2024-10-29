import { Request, Response, NextFunction } from "express";
import { prisma } from "../..";
import { BadRequestsException } from "../../exceptions/bad-request";
import { ErrorCode } from "../../exceptions/root";
import { UnprocessableEntity } from "../../exceptions/valdations";

export const addDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { depName } = req.body;
  try {


    let depart = await prisma.department.findFirst({
      where: { depName:depName },
    });

    if (depart) {
      return next(
        new BadRequestsException(
          "اسم القسم موجود فعلا!",
          ErrorCode.USER_ALREADY_EXISTS
        )
      );
    }


    const department = await prisma.department.create({
      data: {
        depName,
      },
    });
   res.json("")
  } catch (err:any) {
  
  }
};

export const getDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const department = await prisma.department.findMany({
      where:{isDeleted:false},
      select: {id: true, depName: true, doctors:{select:{doctorName:true}} },
    });
    res.json(department);
  } catch (error) {}
};

export const getDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const department = await prisma.department.findMany({
      where: { id: req.params.id },
      select: {depName: true },
    });
    res.json(department);
  } catch (error) {}
};
export const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isex=await prisma.department.findFirst({
      where:{depName:req.body.depName },select:{depName:true,id:true}
    })
    
 
if(isex==null||isex.id===req.params.id){
  
    const department = await prisma.department.update({
      where: { id: req.params.id },
      data: {
        depName: req.body.depName,
      },
    });
    res.json(department);}
     if(isex!==null){
    return next(
      new BadRequestsException(
        "اسم القسم موجود فعلا!",
        ErrorCode.USER_ALREADY_EXISTS
      )
    );
  }
  } catch (error) {}
};


export const deleteDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   
    const department = await prisma.department.update({
      where: { id: req.params.id },data:{
        isDeleted:true
      }
    });
    res.json(department);
  } catch (error) {}
};
export const getNewsDepart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const news = await prisma.department.findFirst({
      where: { depName: req.body.depName ,isDeleted:true },
      include: { news: true },
    });
    res.json(news);
  } catch (error) {}
};
