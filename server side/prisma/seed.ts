import { prisma } from "../src";


export const dataDay=[{

}]
async function main() {
  const docID=  await prisma.doctor.findFirst({select:{id:true}})
  await prisma.doctor.create({
    data: {
      doctorName: "Dr. Smith",
      phone: "123-456-7890",
      specialist: "Cardiologist",
      depID: "department-id", // معرف القسم الذي ينتمي إليه الطبيب
      workHours: {
        create: [
          {
            startTime: new Date('2024-08-11T08:00:00Z'),
            endTime: new Date('2024-08-11T16:00:00Z'),
          },
          {
            startTime: new Date('2024-08-12T08:00:00Z'),
            endTime: new Date('2024-08-12T16:00:00Z'),
          }
        ]
      },
      weekdays: {
        create: [
          { name: "Monday" },
          { name: "Tuesday" }
        ]
      }
    }
  });
  
}