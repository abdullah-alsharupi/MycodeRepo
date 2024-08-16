import { Router } from "express";
import { addOppon } from "../../controllers/OpponController/opponcontroller";
import { errorHandler } from "../../error-handler";
const opponRouter:Router=Router()
opponRouter.post('/oppon',errorHandler(addOppon))

export default opponRouter;