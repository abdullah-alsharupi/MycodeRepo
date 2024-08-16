import { Request,Response,NextFunction } from "express";
import { prisma } from "../..";

export const addNews=async(req:Request,res:Response,next:NextFunction)=>{
const {headline,title,img,depName,userName}=req.body
try {

const user = await prisma.users.findFirst({
    where: {userName},select:{id:true}
  });
const departmentId=await prisma.department.findFirst({where:{depName},select:{id:true}})
  

  const newNews = await prisma.news.create({
    data: {
      headline,
      title,
      
      img,
      user: {
        connect: {
          id: user?.id
        }
      },
      department: {
        connect: {
          id: departmentId?.id
        }
      }
    },include:{user:true,department:true}
  });
  res.json(newNews)
} catch (error) {
    console.log(error)
}
}
export const updatenews=async(req:Request,res:Response,next:NextFunction)=>{
  const {headline,title,img,depName,userName}=req.body
  try {
      
  const user = await prisma.users.findFirst({
      where: {userName},select:{id:true}
    });
    
  const departmentId=await prisma.department.findFirst({where:{depName},select:{id:true}})
   
  
    const News = await prisma.news.update({
      where:{id:req.params.id},
      data: {
        headline,
        title,
        
        img,
        user: {
          connect: {
            id: user?.id
          }
        },
        department: {
          connect: {
            id: departmentId?.id
          }
        }
      },include:{department:true}
    });
    res.json(News)
  } catch (error) {
      console.log(error)
  }
  }
  export const getallnews=async(req:Request,res:Response,next:NextFunction)=>{
    
    try {
      const news = await prisma.news.findMany({
       include:{department:true}
      });
   res.json(news)
    } catch (error) {
        console.log(error)
    }
    }

    export const deleteAllnews=async(req:Request,res:Response,next:NextFunction)=>{
    
      try {
        const news = await prisma.news.deleteMany();
     res.json(news)
      } catch (error) {
          console.log(error)
      }
      }
      export const deletNewsById=async(req:Request,res:Response,next:NextFunction)=>{
    
        try {
          const news = await prisma.news.delete({
           where:{id:req.params.id}
          });
       res.json(news)
        } catch (error) {
            console.log(error)
        }
        }