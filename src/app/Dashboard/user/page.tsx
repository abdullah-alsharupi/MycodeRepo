"use client";

import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useGetUsers } from "@/queries/users/useGetUsers";
import Button from "@/app/components/ui/button";
import { deleteUser } from "@/mutations/users/deleteUser";
import DangerDialog from "@/app/components/ui/danger-dialog";
import ToastContainer from "@/app/components/ui/toastCobtainer";
import AddUser from "./addUser";
import UserUpdate from "./updateUser";
import { hashPermision } from "@/app/permision/hashpermision";
import { useCookies } from "react-cookie";

export default function UserTable() {
  const [cookies]=useCookies(['authToken'])
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [deletenewsId, setdeletenewsId] = useState("");
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: user, isLoading, error, refetch } = useGetUsers(cookies.authToken);
  const [filterUsers, setFilterUsers] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");


  const mutation = useMutation({
    mutationKey: ["delete-user"],
    
    mutationFn:(id:string)=>deleteUser(id,cookies.authToken),
    onSuccess() {
      setSuccess("delete successfully");
      refetch();
    },
    onError(error: any) {
      setError(error);
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
    setOpenDialog(false);
  };
  const Close = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    
    if (user) {
      setFilterUsers(user?.map((user:any) => ({ ...user })));
    }
  }, [user]);
  
  const filteredUsers = filterUsers.filter((user) =>
    user.userName?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
  if (isLoading) return <p>جاري جلب بيانات المستخدمين...</p>;
  if (error) return <p>خطأ في جلب بيانات المستخدمين...</p>;
 
  return (
    <div className="overflow-y-scroll   rounded-br-2xl rounded-bl-2xl"  style={{height:`${window.screen.height - window.screen.height / 4}px` ,direction:"ltr",scrollbarWidth:"none"} } >
       <DangerDialog
        content="هل تريد حذف المستخدم حقاً؟"
        onClose={Close}
        onConfirm={() => handleDelete(deletenewsId)}
        open={openDialog}
        title="حذف مستخدم"
      />
      <div className="flex flex-row gap-3 mt-2 sticky top-0 z-[1] bg-slate-200" style={{direction:"rtl"}}>
 
        <Button
          onClick={() => setIsModalOpen(true)}
          className={`mr-3 py-[3px] rounded-[10px] border border-solid h-9 mt-1`}
        >
          <img src="/plus.png" width={20} height={20} alt="plus" />
        </Button>
        <AddUser
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          refetch={refetch}
        />
        {isModalOpenUpdate && (
          <UserUpdate
            id={userId}
            isOpen={isModalOpenUpdate}
            refetch={refetch}
            setIsOpen={setIsModalOpenUpdate}
          />
        )}
        <input
          type="text"
          placeholder="بحث عن المستخدمين..."
          className="mb-4 p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mt-2 mb-2 min-w-full  border-x-3 border-gray-200 shadow-2xl shadow-white rounded-2xl  " style={{direction:"rtl"}}>
        <table className="divide-y w-[100%] ">
          <thead className="bg-[#91A1B6] max-sm:hidden ">
            <tr>
              <th className={`px-1 py-3 text-white  rounded-tr-[20px]`}>
                اسم المستخدم
              </th>

              <th className={`px-1 py-3 text-white `}>البريد الالكتروني</th>

              <th className={`px-1 py-3 text-white `}>الدور</th>
              <th className={`px-1 py-3 text-white  rounded-tl-[20px]`}>
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-[3px] ">
            {filteredUsers?.map((users) => (
              <tr
                key={users.id}
                className="hover:bg-gray-100 max-sm:grid max-sm:grid-flow-row"
              >
                <td
                  className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                >
                  <h1 className="sm:hidden font-bold">اسم المستخدم</h1>{" "}
                  {users.userName}
                </td>
                <td
                  className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                >
                  <h1 className="sm:hidden font-bold"> البريد الالكتروني</h1>{" "}
                  {users.email}
                </td>

                <td
                  className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
                >
                  <h1 className="sm:hidden font-bold">الدور</h1> {users.role}
                </td>
                <td
                  className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col`}
                >
                  <div className="flex justify-center gap-3">
                    <Button
                      onClick={() => {
                        setUserId(users.id as string);
                        setIsModalOpenUpdate(true);
                      }}
                    >
                      تعديل
                    </Button>

                    <Button
                      className=" bg-red-700"
                      onClick={() => {
                        setdeletenewsId(users.id as string);
                        setOpenDialog(true);
                      }}
                    >
                      حذف
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
      <ToastContainer message={Error} type={"error"} />
      <ToastContainer message={success} type={"success"} />
    </div>
  );
}
