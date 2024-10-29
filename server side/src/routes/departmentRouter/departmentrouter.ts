import { Router } from "express";
import { addDepartment, deleteAllDepartment, getDepartment, getNewsDepart, searchDepart, updateDepartment } from "../../controllers/departmentController/departmentcontroller";
const routerDepart:Router=Router()

routerDepart.post("/add_depart",addDepartment)
routerDepart.get("/getnews_depart",getNewsDepart)
routerDepart.get("/get_depart",getDepartment)
routerDepart.put("/update_depart/:id",updateDepartment)
routerDepart.delete("/delete_depart/:id",deleteAllDepartment)
routerDepart.get("/search_depart",searchDepart)
export default routerDepart