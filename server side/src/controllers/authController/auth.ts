import { NextFunction, Request,Response } from "express"
import { prisma } from "../..";
import {hashSync,compareSync} from "bcrypt"
import  jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../secret";
import { ErrorCode } from "../../exceptions/root";
import { BadRequestsException } from "../../exceptions/bad-request";
import { userZodSchema } from "../../../prisma/valdateInput";
import { NotFoundException } from "../../exceptions/not-found";
import { UnprocessableEntity } from "../../exceptions/valdations";
import { error } from "console";

export const addUser=async(req:Request,res:Response,next:NextFunction)=>{

  try {
    userZodSchema.safeParse(req.body)
    const {email,userName,password}=req.body;
  let user=await prisma.users.findFirst({
    where:{email}
  });
  if(user)
  {
    next( new BadRequestsException('user already exist!', ErrorCode.USER_ALREADY_EXISTS));
  }
  user=await prisma.users.create({
    data:{
        email,
        userName,
        password:hashSync(password,10)
    }
  });

  // const session = await createSession(user.id);
  res.json({ user });

  } catch (err:any) {
    next(new UnprocessableEntity(err?.cause?.issues,"Unprocessable Entity",ErrorCode.UPPROCESSABLE_ENTITY));
  }
      }
 export const getUser=async(req:Request,res:Response,next:NextFunction)=>{
try {
  const users=await prisma.users.findMany({
    where:{isDeleted:false},
    include:{
      news:true,sessions:true
    }
  })
 if(!users){
  throw new Error("not get users");
 }
 res.json(users)
} catch (error) {
  next(error)
}

 }

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await prisma.users.findFirst({
    where: { email }
  });
  if (!user) {
    throw new NotFoundException('User does not exist', ErrorCode.USER_NOT_FOUND);
  }

  if (!compareSync(password, user.password)) {
    throw new BadRequestsException('Incorrect password', ErrorCode.INCORRECT_PASSWORD);
  }



  const token = jwt.sign(
    {
      userId: user.id
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  res.cookie('token',token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 3600000 // 1 hour,
  });
  res.json({ user,token });
  }

// export const logout = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { userId } = req.body;
//       await deleteSessions(userId);
//       res.status(200).json({ message: 'Logout successful' });
//     } catch (err) {
//       next(err);
//     }
//   };
  // export const validate = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { userId, id } = req.body;
  //     await validateSession(userId, id);
  //     res.status(200).json({ message: 'Validate' });
  //   } catch (err) {
  //     next(err);
  //   }
  // };
// export const login=async(req:Request,res:Response)=>{

//     const {email,password}=req.body;
//     let user=await prisma.users.findFirst({
//       where:{email}
//     });
//     if(!user)
//     {
//       throw new NotFoundException('user does not exist',ErrorCode.USER_NOT_FOUND)
//     }

//   if(!compareSync(password,user.password))
//   {
//     throw new BadRequestsException('password not correct!',ErrorCode.INCORRECT_PASSWORD);
//   }
//   const token=jwt.sign({
//     userId:user.id
//   },JWT_SECRET,{expiresIn:"1h"});
  
//     res.json({user,token})
//   }

//   export const me = async (req:Request, res: Response,next:NextFunction) => {
   
//     res.json(req.user);
//   };
 
  // export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  //   signupSchema.parse(req.body);
  //   const { email, name, password ,role} = req.body;
  //   let user = await prisma.users.findFirst({
  //     where: { email }
  //   });
  //   if (user) {
  //     next(new BadRequestsException('User already exists!', ErrorCode.USER_ALREADY_EXISTS));
  //   }
  //   user = await prisma.users.create({
  //     data: {
  //       email,
  //       name,
  //       password: hashSync(password, 10),
  //       role
  //     }
  //   });
  
  //   // Create a new session for the user
    
  // };
  
