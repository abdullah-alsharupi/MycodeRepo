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
    const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format

    const endDate = new Date();
    const startDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

    const getOppontement = await prisma.oppontement.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        patient: { select: { patName: true } },
        doctor: { select: { doctorName: true } },
      },
    });
    res.json(getOppontement);
  } catch (error) {}
};
