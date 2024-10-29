import { Router } from "express";
import { addPatient ,deletePatientById,updatePatient} from "../../controllers/patientController/patientController";
const routerPatient:Router=Router();

routerPatient.post('/addPatient',addPatient);
routerPatient.put('/updatePatient',updatePatient)
routerPatient.put("/deletePatient/:id",deletePatientById)

export default routerPatient