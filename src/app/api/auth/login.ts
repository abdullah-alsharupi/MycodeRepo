import db from '@/db/db';
import type { NextApiRequest, NextApiResponse } from 'next'
import { use } from 'react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body
    let user = await db.users.findFirst({
        where: { email },
      });
 if(user){
    res.status(200).json({ success: true })}
    else{
        res.status(401).json({ error: 'Invalid credentials.' })
    }
  } catch (error) {
   
      res.status(500).json({ error: 'Something went wrong.' })
    
  }
}