import {Router} from "express"
import { addUser ,deleteUser,getUser,login, updateUser,validateSession} from "../../controllers/authController/auth"
import { errorHandler } from "../../error-handler"



const authRoutes:Router=Router()

authRoutes.post('/addUser',errorHandler(addUser));
authRoutes.get('/getUsers',errorHandler(getUser));
authRoutes.put('/updateUser',errorHandler(updateUser));
authRoutes.delete('/deleteUser/:id',errorHandler(deleteUser));
authRoutes.post('/login',errorHandler(login));

// authRoutes.post('/logout',logout);
authRoutes.get('/validate',validateSession);
// authRoutes.get('/me',errorHandler(me))

export default authRoutes;