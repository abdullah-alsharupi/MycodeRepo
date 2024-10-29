import db from "@/db/db";
import { JWT_SECRET } from "@/secret";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import { NextResponse } from "next/server";
import { message } from "antd";


export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        let user = await db.users.findFirst({
            where: { email },
        });

        if (!user) {
            // إرجاع استجابة "غير موجود" إذا لم يكن المستخدم موجودًا
            return NextResponse.json({ message: "هذا الحساب غير موجود" }, { status: 404 });
        }

        if (!compareSync(password, user.password as string)) {
            // إرجاع استجابة "خطأ في كلمة السر" إذا كانت كلمة المرور غير صحيحة
            return NextResponse.json({ message: "خطأ في كلمة السر أو في الإيميل" }, { status: 401 });
        }

        // إنشاء توكن
        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        

// إنشاء جلسة


const expirationDate = new Date();
expirationDate.setHours(expirationDate.getHours() + 24); // 24 hours from now

const session = await db.session.update({where:{userId:user.id},
  data: {
   token,
    expirationDate: expirationDate,

     
  },
});

        // تعيين الكوكيز
        const response = NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                userName: user.userName,
                role: user.role,
            },
            token,
            session,
        });

        response.cookies.set("token", token, {
            sameSite: "strict",
            maxAge: 3600, // 1 hour in seconds
        });

        return response; // إرجاع الاستجابة النهائية
    } catch (error) {
        // معالجة الأخطاء
        return NextResponse.json({ message: "حدث خطأ غير متوقع" }, { status: 500 });
    }
}
export async function GET(request:Request) {
  
   const token =  request.headers.get('authorization')?.split(" ")[1];

    
    
    try {
   
const session=await db.session.findFirst({where:{token},
    
select:{userId:true}})
if(!session){
    return NextResponse.json({message:"forbidden"},{status:403});
}
      const user = await db.users.findMany({
        where: { id:session?.userId  },
        select:{email:true,password:true,role:true}
      });
     
    
     
      if(user.length==0){
       
        return NextResponse.json(0)
      }
      return NextResponse.json(user);
    } catch (error) {
     
     return NextResponse.json({message:"forbidden"},{status:500});
    }
  }