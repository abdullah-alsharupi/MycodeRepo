import { NextFunction, Request, Response } from "express";
import { UnAthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { prisma } from "..";
import { Users as User } from "@prisma/client";
import { compareSync, hashSync } from "bcrypt";
import { BadRequestsException } from "../exceptions/bad-request";


const authMiddleware = async (req:Request, res: Response, next: NextFunction) => {
  const token =req.headers.authorization?.split(' ')[1];


  if (!token) {
   
    next(new UnAthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }

  try {
   
    const payload = jwt.verify(req.headers.authorization?.split(' ')[1] as string, JWT_SECRET) as { userId: string };
 
    const user = await prisma.users.findFirst({
      where: { id: payload.userId as any },
      select:{email:true,password:true,role:true}
    });
   
    
if(user?.role==='user'){

  next(new UnAthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
}
    // if ((!compareSync(req.body.password, user?.password as any) || req.body.email!==user?.email)||user?.role==="user") {
    //   next(new UnAthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    // }
   
    next();
  } catch (error) {
    next(new UnAthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED, error));
  }
};

export default authMiddleware;