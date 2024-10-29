import { Router } from "express";
import { addPatient ,updatePatient} from "../../controllers/patientController/patientController";
const routerPatient:Router=Router();

routerPatient.post('/addPatient',addPatient);
routerPatient.put('/update_patient',updatePatient)

export default routerPatient