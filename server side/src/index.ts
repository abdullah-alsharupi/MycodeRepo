import expres,{Express,NextFunction,Request,Response} from "express"
import { PORT } from "./secret";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { errorMiddleware } from "./middleware/error";

import cookieParser = require("cookie-parser")
import routerDoctor from "./routes/doctorRouter/doctorrouter";
import opponRouter from "./routes/opponRouter/opponRouter";
import routerDepart from "./routes/departmentRouter/departmentrouter";
import routerOppont from "./routes/opponRouter/opponRouter";
import routernews from "./routes/newRouter/routernews";
import routerstaff from "./routes/staffRouter/staffrouter";
import routerPatient from "./routes/patientRouter/patienRouter";
import authRoutes from "./routes/routerAuth/auth";


const app:Express=expres();

app.use(expres.json());
app.use(cookieParser());
app.use(cors({
origin:["http://localhost:3000"],
methods:["POST","GET","PUT","DELETE"],
credentials:true,

}));
export const prisma=new PrismaClient({
    log:["error"],
});

app.use('/api',routerDoctor);
app.use('/api',opponRouter);
app.use("/api",routerDepart);
app.use('/api',routerPatient);
app.use("/api",routerOppont);
app.use('/api',routerDoctor);
app.use('/api',routernews)
app.use("/api",routerstaff)
app.use('/api',authRoutes);
app.use(errorMiddleware);

app.listen(PORT,()=>{
console.log(`running on PORT ${PORT}`);
});

