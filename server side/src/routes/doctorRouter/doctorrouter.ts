import { Router } from "express";
import { addDoctor, deleteDoctor, getDoctors, getDoctorsById, searchDoctor, updateDoctor } from "../../controllers/doctorController/doctorcontroller";
import { errorHandler } from "../../error-handler";
import upload from "../../middleware/multermiddleware";
import authMiddleware from "../../middleware/auth";

const routerDoctor:Router=Router();

routerDoctor.post('/addDoctor',upload.single('img'),errorHandler(addDoctor));

routerDoctor.get('/getDoctor',errorHandler(getDoctors));
routerDoctor.get('/getDoctorById/:id',authMiddleware,errorHandler(getDoctorsById));
routerDoctor.put('/updateDoctor/:id',authMiddleware,upload.single('img'),errorHandler(updateDoctor));
routerDoctor.put('/deleteDoctor/:id',authMiddleware,errorHandler(deleteDoctor));
routerDoctor.get('/searchDoctor',errorHandler(searchDoctor));
export default routerDoctor