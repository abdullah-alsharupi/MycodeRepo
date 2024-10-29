import { Router } from "express";
import { addDepartment, deleteDepartmentById, getDepartment, getDepartmentById, getNewsDepart,  updateDepartment } from "../../controllers/departmentController/departmentcontroller";
import authMiddleware from "../../middleware/auth";
const routerDepart:Router=Router()

routerDepart.post("/adddepartment",authMiddleware,addDepartment)
routerDepart.get("/getnews_depart",getNewsDepart)
routerDepart.get("/getDepartment",getDepartment)
routerDepart.get("/getDepartmentById/:id",authMiddleware,getDepartmentById)
routerDepart.put("/updateDepartment/:id",authMiddleware,updateDepartment)
routerDepart.put("/deleteDepartment/:id",authMiddleware,deleteDepartmentById)

export default routerDepart