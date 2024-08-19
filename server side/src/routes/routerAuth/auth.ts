import {Router} from "express"
import { addUser ,getUser,login} from "../../controllers/authController/auth"
import { errorHandler } from "../../error-handler"
import authMiddleware from "../../middleware/auth";



const authRoutes:Router=Router()

authRoutes.post('/addUser',errorHandler(addUser));
authRoutes.get('/getUsers',errorHandler(getUser));
authRoutes.post('/login',errorHandler(login));

// authRoutes.post('/logout',logout);
// authRoutes.post('/validate',validate);
// authRoutes.get('/me',errorHandler(me))

export default authRoutes;