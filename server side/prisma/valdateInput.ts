import {date, z} from "zod";


export const signupSchema=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6),
    role:z.string()
});

// export const doctorSchema=z.object({
//     specialist:z.string(),
//     phone:z.string().min(9),
//     doctorName:z.string(),
//     depName:z.string(),
//     weekdays:z.string().array()
// });

// export type doctorData=z.infer<typeof doctorSchema>
