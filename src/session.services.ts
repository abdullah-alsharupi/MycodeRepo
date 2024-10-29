
import jwt from "jsonwebtoken";
  import { Session } from "./type/express";
import { JWT_SECRET } from './secret';
import db from "./db/db";



// Create a new session

export async function createSession(userId: string,): Promise<Session> {
 
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 24); // 24 hours from now

  const session = await db.session.create({
    data: {
     userId:userId,
      expirationDate: expirationDate,
  
       
    },
  });

  return session;
}

export async function verifySession(sessionId: string): Promise<boolean> {
  try {
    const session = await db.session.findFirst({
      where: {
       id:sessionId,
        expirationDate: {
          gte: new Date(),
        },
      },
    });

    return session !== null;
  } catch (error) {
    console.error('Error verifying session:', error);
    return false;
  }
}

// export async function validateSession(userId: number, sessionId: string): Promise<boolean> {
//   const session = await prisma.session.findUnique({
//     where: {
//         userId:userId,
//         id:sessionId,
//     },
//   });

//   return session !== null;
// }
// Retrieve a session by ID
export async function getSessionById(id: string): Promise<Session | null> {
  const session = await db.session.findUnique({
    where: {
      id
    }
  });
  return session;
}

// Update an existing session
export async function updateSession(id: string, data:any): Promise<Session> {
  const session = await db.session.update({
    where: {
      id
    },
    data: {
      ...data,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // Extend expiration by 1 day
    }
  });
  return session;
}

// Delete a session
// export async function deleteSessions(userId: number): Promise<void> {
//   await prisma.session.deleteMany({
//     where: {
//       userId: userId,
//     },
//   });
// }