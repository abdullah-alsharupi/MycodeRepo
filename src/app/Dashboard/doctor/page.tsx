"use client";
import React, { useEffect, useState } from "react";

import { useGetDoctor } from "@/queries/doctors/getAllDoctors";

import { useGetDepartments } from "@/queries/department/useGetAllDepartment";

import Button from "@/app/components/ui/button";
import UpdateDeprt from "../department/departmentUpdate";
import UpdateDoctor from "./doctorUpdate";
import AddDoctor from "./doctorAdd";

import DangerDialog from "@/app/components/ui/danger-dialog";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { doctorDelete } from "@/mutations/doctors/deleteDoctro";
import Card from "../card/page";
import { cookies } from "next/headers";
import { useCookies } from "react-cookie";
import ToastContainer from "@/app/components/ui/toastCobtainer";
import { useBooleanContext } from "../layout";
import { useRouter } from "next/navigation";
const NameOfField = [
  "الصوره",
  "اسم الطبيب",
  "التخصص",
  " القسم",
  "رقم الهاتف",
  "معلومات الدكتور",
  "اوقات الدوام",
];
export default function Doctors() {

  const router = useRouter();
  const [cookies] = useCookies(["authToken"]);
  useEffect(()=>{

    if(cookies.authToken===undefined){

      router.push('/login')
     }
  },[])
  const [open, setOpen] = useState(false);
  const { isLoading,error, data, refetch } = useGetDoctor();
  const [searchTerm, setSearchTerm] = useState("");
  const [updating, setUpating] = useState(false);
  const [success, setSuccess] = useState("");
const {isVisible}=useBooleanContext()
  const [add, setAdd] = useState(false);
  const [id, setId] = useState<any>({ id: "", name: "" });
  const [idUpdate, setIdUpate] = useState("");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const Close = () => {
    setOpen(false);
  };

  const handleDropdownToggle = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const mutation = useMutation({
    mutationKey: ["deletDoctor"],
    mutationFn: (id: String) => doctorDelete(id as string, cookies.authToken),
    onError(err: any) {
      const errorMessage = err.message || "حدث خطأ غير متوقع";
      message.error(errorMessage);
      setOpen(false);
    },
    onSuccess() {
      refetch(), setOpen(false);
      setSuccess("لقد تم الحذف بنجاح");
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id as string);
  };

  if (isLoading) return <p>جاري جلب بيانات المستخدمين...</p>;
  if (error) return <p>خطأ في جلب بيانات المستخدمين...</p>;

  // Filter data based on the search term
  
  const filteredDoctor = data?.filter((doctor: any) =>
    doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    
    <div
      className="overflow-y-scroll   rounded-br-2xl rounded-bl-2xl"
      style={{
        height: `${window.screen.height -( window.screen.height / 3.8)}px`,
        direction: "ltr",
     
      }}
    >
      <DangerDialog
        content={`هل تريد الحذف  حقاً`}
        onClose={Close}
        onConfirm={() => handleDelete(id.id)}
        open={open}
        title={`  سيتم حذف ${id.name} `}
      ></DangerDialog>
      <ToastContainer message={success} type={"success"} />
      <div
      
        className="flex flex-row gap-3 mt-2 sticky top-0 z-[1] bg-slate-200"
        style={{ direction: "rtl" }}
      >
        <Button
        disabled={isVisible}
          onClick={() => setAdd(true)}
          
          className={`mr-3 py-[3px] rounded-[10px]  border border-solid h-9 mt-1`}
        >
          <img src="/plus.png" width={20} height={20} alt="plus" />
        </Button>

        <input
          type="text"
          placeholder="ابحث عن طبيب..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 mb-4"
        />
      </div>

      <Card
        type="Table"
        // eslint-disable-next-line react/no-children-prop
        children={
          <div
            className="mt-2 mb-2 min-w-full  border-x-3 border-gray-200 shadow-2xl shadow-white rounded-2xl  "
            style={{ direction: "rtl" }}
          >
            <table className="divide-y w-[100%]  ">
              <thead className="bg-[#91A1B6] max-sm:hidden">
                <tr>
                  <th className={`px-2 py-3 text-white  rounded-tr-[20px]`}>
                    الصوره{" "}
                  </th>

                  <th className={`px-1 py-3 text-white `}>اسم الدكتور</th>

                  <th className={`px-1 py-3 text-white  `}>التخصص</th>
                  <th className={`px-1 py-3 text-white `}>اسم القسم</th>
                  <th className={`px-1 py-3 text-white `}>رقم الهاتف</th>
                  <th className={`px-1 py-3 text-white  `}>
                    معلومات عن الدكتور
                  </th>
                  <th className={`px-1 py-3 text-white `}>اوقات الدوام</th>
                  <th className={`px-1 py-3 text-white  rounded-tl-[20px]`}>
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-[3px] ">
                {filteredDoctor?.map((doctor: any, index: number) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 max-sm:grid max-sm:grid-flow-row"
                  >
                    <td
                      className={`px-3 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-50 max-sm:border-solid max-sm:border-[3px]`}
                    >
                      <h1 className="sm:hidden font-bold">الصوره</h1>{" "}
                      {
                        <img
                          height={50}
                          width={50}
                          src={`/images/${doctor.img}`}
                          className="rounded-full"
                          alt="Doctor"
                        />
                      }
                    </td>
                    <td
                      className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-50 max-sm:border-solid max-sm:border-[3px]`}
                    >
                      <h1 className="sm:hidden font-bold">اسم الدكتور</h1>{" "}
                      {doctor.doctorName}
                    </td>
                    <td
                      className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                    >
                      <h1 className="sm:hidden font-bold"> تخصص الدكتور</h1>{" "}
                      {doctor.specialist}
                    </td>

                    <td
                      className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                    >
                      <h1 className="sm:hidden font-bold">اسم القسم</h1>{" "}
                      {doctor.department.depName}
                    </td>

                    <td
                      className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                    >
                      <h1 className="sm:hidden font-bold"> رقم الهاتف</h1>{" "}
                      {doctor.phone}
                    </td>
                    <td
                      className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                    >
                      <h1 className="sm:hidden font-bold">
                        معلومات عن الدكتور
                      </h1>{" "}
                      {doctor.information}
                    </td>
                    <td
                      className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                    >
                      <h1 className="sm:hidden font-bold"> اوقات الدوام</h1>
                      <div className="   text-center text-balance">
                        <button
                          className="flex h-[30px] overflow-clip   text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => {
                            handleDropdownToggle(index);
                          }}
                        >
                          {doctor.weekwork.length > 0 &&
                            `${doctor.weekwork
                              .map((day: any) => day.day)
                              .join(", ")}`}
                          <svg
                            className={`w-5 h-5 text-center transition-transform ${
                              selectedIndex === index ? "rotate-80" : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {selectedIndex === index && (
                          <div
                            style={{
                              position: "absolute",
                              backgroundColor: "white",
                              border: "1px solid black",
                              left: "0px",
                              bottom:'30%',
                              zIndex: 1,
                            }}
                          >
                            {doctor.weekwork.map(
                              (workItem: any, workIdx: number) => (
                                <div key={workIdx}>
                                  <label>
                                    <input
                                      type="checkbox"
                                      checked={true}
                                      onChange={() => ""}
                                    />
                                    {workItem.day}:
                                    <input
                                      type="time"
                                      value={workItem.startTime}
                                      onChange={() => ""}
                                    />{" "}
                                    إلى
                                    <input
                                      type="time"
                                      value={workItem.endTime}
                                      onChange={() => ""}
                                    />
                                  </label>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    <td
                      className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col`}
                    >
                      <div className="flex justify-center gap-3">
                        <Button
                        disabled={isVisible}
                          onClick={() => {
                            setIdUpate(doctor.id);

                            setUpating(true);
                          }}
                          label={`تعديل`}
                          className={`hover:bg-green-700 mr-5`}
                        ></Button>

                        <Button
                        disabled={isVisible}
                          onClick={() => {
                            setId({ id: doctor.id, name: doctor.doctorName });
                            setOpen(true);
                          }}
                          label={`حذف`}
                          className={`mr-3 bg-red-700 `}
                        ></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         
        }
        NameOfField={[
          "الصوره",
          "اسم الطبيب",
          "التخصص",
          " القسم",
          "رقم الهاتف",
          "معلومات الدكتور",
          "اوقات الدوام",
        ]}
        header=""
      ></Card>
      {data && add && (
        <AddDoctor refetch={refetch} setAdd={setAdd} isAdd={add} />
      )}
      {updating && (
        <UpdateDoctor
          refetch={refetch}
          id={idUpdate}
          isUpdating={updating}
          setUpdating={setUpating}
        />
      )}
    </div>
  );
}
