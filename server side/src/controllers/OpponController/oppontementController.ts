import { Request, Response, NextFunction } from "express";
import { prisma } from "../..";
import { date } from "zod";
export const get_Patients_Withِ_All_Oppontment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getOppontement = await prisma.oppontement.findMany({
      include: { doctor: true, patient: true },
    });
    res.json(getOppontement);
  } catch (error) {}
};
export const get_Patient_With_OppontmentByNam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getOppontement = await prisma.oppontement.findMany({
      where: { patient: { patName: { contains: req.body.name } } },
      include: { doctor: true, patient: true },
    });
    res.json(getOppontement);
  } catch (error) {}
};
export const getOppontement_Of_Today = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date(); // Get the current date
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ); // Get the start of today
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000 - 1); // Get the end of today

    const getOppontement = await prisma.oppontement.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        patient:true,
        doctor: { select: { doctorName: true } },
      },
    });
    res.json(getOppontement);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Failed to retrieve appointments" }); // Send an error response
  }
};
