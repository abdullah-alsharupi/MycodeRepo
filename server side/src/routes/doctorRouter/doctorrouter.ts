import { Router } from "express";
import { addDoctor, deleteDoctor, getDoctors, searchDoctor, updateDoctor } from "../../controllers/doctorController/doctorcontroller";
import { errorHandler } from "../../error-handler";

const routerDoctor:Router=Router();

routerDoctor.post('/addDoctor/',errorHandler(addDoctor));
routerDoctor.get('/getDoctor',errorHandler(getDoctors));
routerDoctor.put('/updateDoctor/:id',errorHandler(updateDoctor));
routerDoctor.delete('/deleteDoctor/:id',errorHandler(deleteDoctor));
routerDoctor.get('/searchDoctor',errorHandler(searchDoctor));
export default routerDoctor