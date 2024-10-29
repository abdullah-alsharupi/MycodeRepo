"use client";

import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useGetUsers } from "@/queries/users/useGetUsers";
import { updateUser } from "@/mutations/users/updateUser";
import { UpdateUser, User } from "@/app/types/types";
import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/button";
import Link from "next/link";
import AddUser from "../addUser/page";
import { deleteUser } from "@/mutations/users/deleteUser";
import DangerDialog from "@/app/components/ui/danger-dialog";
import ToastContainer from "@/app/components/ui/toastCobtainer";

interface UserWithEditState extends User {
  isEditing: boolean;
  tempData?: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>;
}

export default function UserTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteuserId, setdeleteUserId] = React.useState("");
  const [Error,setError]=React.useState('')
  const [success,setSuccess]=React.useState('')
  const { data: users, error, isLoading, refetch } = useGetUsers();

  const mutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteUser,
    onSuccess() {
      setSuccess('delete successfully')

      refetch();
    },
    onError(error:any){
setError(error)
    }
  });
  const handleDelete = (id: string) => {
    mutation.mutate(id);
    setOpenDialog(false);
  };
  const [editedUsers, setEditedUsers] = useState<UserWithEditState[]>([]);
  useEffect(() => {
    if (users) {
      setEditedUsers(users.map((user) => ({ ...user, isEditing: false })));
    }
  }, [users]);

  const handleEditClick = (userId: string) => {
    setEditedUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, isEditing: true, tempData: { ...user } }
          : user
      )
    );
  };

  const handleCancelEdit = (userId: string) => {
    setEditedUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, isEditing: false, tempData: undefined }
          : user
      )
    );
  };

  const handleUpdate = async (userId: string) => {
    const userToUpdate = editedUsers.find((user) => user.id === userId);
    if (userToUpdate && userToUpdate.tempData) {
      try {
        const updatedUserData: UpdateUser = {
          id: userId,
          userName: userToUpdate.tempData.userName ?? userToUpdate.userName,
          email: userToUpdate.tempData.email ?? userToUpdate.email,
          password: userToUpdate.tempData.password ?? userToUpdate.password,
          role: userToUpdate.tempData.role || userToUpdate.role,
        };

        const updatedUser: any = await updateUser(updatedUserData);
        setEditedUsers((prev) =>
          prev.map((user) =>
            user.id === userId
              ? { ...updatedUser, isEditing: false, tempData: undefined }
              : user
          )
        );
        refetch(); // Refetch users after update (optional)
      } catch (err) {
        console.error("Update failed:", err);
      }
    }
  };

  const handleInputChange = (userId: string, field: string, value: any) => {
    setEditedUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, tempData: { ...user.tempData, [field]: value } }
          : user
      )
    );
  };

  if (error) {
    return (
      <div className="text-red-500 text-center">
        حدث خطأ أثناء جلب المستخدمين
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-gray-400 text-center">جارٍ تحميل المستخدمين...</div>
    );
  }
  const Close = () => {
    setOpenDialog(false);
  };
  // let width=(window.screen.width-200)/5
 
  return (
    <div className="w-[100%] font-serif bg-slate-200 p-2">
    
      <Button
        onClick={() => setIsModalOpen(true)}
        label={``}
        className={` mr-3 rounded-[10px] borded border-solid`}
      >
        <img src="/plus.png" width={20} height={20} alt="plus" />
      </Button>
      <AddUser
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        refetch={refetch}
      />
      <div className="mt-2 mb-2 overflow-auto scroll-auto">
        <table className="w-[100%] divide-y  ">
          <thead className="p-3">
            <tr className="p-3  bg-[#91A1B6] border-[3px]  border-solid  ">
              <th className="px-6 py-3 text-[16px] text-black  tracking-wider w-1/5 rounded-tr-[20px]">
                الاسم
              </th>
              <th className="px-6 py-3 text-[16px] font-medium text-black  tracking-wider w-1/5">
                البريد الإلكتروني
              </th>
              <th className="px-6 py-3 text-[16px] font-medium text-black  tracking-wider w-1/5">
                كلمة المرور
              </th>
              <th className="px-6 py-3 text-[16px] font-medium text-black  tracking-wider w-1/5">
                الدور
              </th>
              <th className="px-6 py-3 text-[16px] font-medium text-black uppercase tracking-wider w-1/5 text-center rounded-tl-[20px]">
                الإجراءات
              </th>
            </tr>
          </thead>

          <tbody className="divide-y-[3px]">
            {editedUsers?.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap w-1/5 text-center bg-white ">
                  {user.isEditing ? (
                    <Input
                      type="text"
                      value={user.tempData?.userName || ""}
                      onChange={(e) =>
                        handleInputChange(user.id, "userName", e.target.value)
                      }
                      className="border p-1"
                    />
                  ) : (
                    user.userName
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap w-1/5 text-center bg-white">
                  {user.isEditing ? (
                    <Input
                      type="email"
                      value={user.tempData?.email || ""}
                      onChange={(e) =>
                        handleInputChange(user.id, "email", e.target.value)
                      }
                      className="border p-1"
                    />
                  ) : (
                    user.email ?? "لا يمكن العثور على البريد الإلكتروني"
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap w-1/5 text-center bg-white">
                  {user.isEditing ? (
                    <Input
                      type="password"
                      value={user.tempData?.password || ""}
                      onChange={(e) =>
                        handleInputChange(user.id, "password", e.target.value)
                      }
                      className="border p-1"
                    />
                  ) : (
                    "••••••••"
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap w-1/5 text-center bg-white">
                  {user.isEditing ? (
                    <select onChange={(e)=>handleInputChange(user.id,'role',e.target.value)} name="role">
                    <option value="">اختر...</option>
                    <option value="admin">ADMIN</option>
                    <option value="user">USER</option>
                  </select>
                  ) : (
                    user.role
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap w-1/5 text-center bg-white ">
                  {user.isEditing ? (
                    <div className="flex justify-center gap-3">
                      <Button
                        label={"تحديث"}
                        onClick={() => handleUpdate(user.id)}
                        className=" py-[3px]"
                      />

                      <Button
                        label={"إلغاء"}
                        onClick={() => handleCancelEdit(user.id)}
                        className=" py-[3px] bg-red-700 "
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center gap-3" key={user.id}>
                      <Button
                        label={"تعديل"}
                        onClick={() => handleEditClick(user.id)}
                        className="py-[3px]"
                      />
                      <Button
                        label={"حذف"}
                        onClick={() => {
                          setdeleteUserId(user.id);
                          setOpenDialog(true);
                        }}
                        className="py-[3px] bg-red-700"
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DangerDialog
        content="هل تريد حذف المستخدم حقاً؟"
        onClose={Close}
        onConfirm={() => handleDelete(deleteuserId)}
        open={openDialog}
        title="حذف مستخدم"
      ></DangerDialog>
        <ToastContainer message={Error} type={"error"} />
        <ToastContainer message={success} type={"success"} />
    </div>
  );
}
