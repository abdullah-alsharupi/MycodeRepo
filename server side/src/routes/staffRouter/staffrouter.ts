import { Router } from "express";
import { addStaff,get_Staff_ById,delete_Staff,delete_Staff_ById, updateSttff, get_All_Staff } from "../../controllers/staffController/staffController";

const routerstaff:Router=Router()
routerstaff.post("/add_staff",addStaff)
routerstaff.post("/update_stafff",updateSttff)
routerstaff.post("/delete_staffId/:id",delete_Staff_ById)
routerstaff.post("/delete_staff",delete_Staff)
routerstaff.get("/get_staffId/:id",get_Staff_ById)

routerstaff.get("/get_staff",get_All_Staff)
export default routerstaff