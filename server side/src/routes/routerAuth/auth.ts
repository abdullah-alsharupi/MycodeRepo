import {Router} from "express"

import { errorHandler } from "../../error-handler"
import authMiddleware from "../../middleware/auth";
import { addUser ,deleteUser,getUser,getUserbyId,login, updateUser,validateSession } from "../../controllers/patientController/authController/auth";
import { forgetPassword, resetPassword } from "../../controllers/authController/auth";



const authRoutes:Router=Router()

authRoutes.post('/addUser',authMiddleware,errorHandler(addUser));
authRoutes.get('/getUsers',errorHandler(getUser));
authRoutes.get('/getUserbyId/:id',errorHandler(getUserbyId));

authRoutes.put('/updateUser/:id',authMiddleware,errorHandler(updateUser));
authRoutes.put('/deleteUser/:id',authMiddleware,errorHandler(deleteUser));
authRoutes.post('/login',errorHandler(login));
authRoutes.post('/forgetPassword',errorHandler(forgetPassword))
authRoutes.put('/resetPassword',errorHandler(resetPassword))

// authRoutes.post('/logout',logout);
authRoutes.get('/validate',validateSession);
// authRoutes.get('/me',errorHandler(me))

export default authRoutes;