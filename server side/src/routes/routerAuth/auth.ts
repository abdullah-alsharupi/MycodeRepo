import {Router} from "express"
import { signUp ,login} from "../../controllers/authController/auth"
import { errorHandler } from "../../error-handler"
import authMiddleware from "../../middleware/auth";



const authRoutes:Router=Router()

authRoutes.post('/signup',errorHandler(signUp));
authRoutes.post('/login',errorHandler(login));
// authRoutes.post('/logout',logout);
// authRoutes.post('/validate',validate);
// authRoutes.get('/me',errorHandler(me))

export default authRoutes;