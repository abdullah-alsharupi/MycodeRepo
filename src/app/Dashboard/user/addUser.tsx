"use client";

import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import { doctroType, userType, userZodSchema } from "@/app/types/types";
import { addUser } from "@/mutations/users/addUser";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { message, Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; // تأكد من استيراد zod
import { useCookies } from "react-cookie";



interface userProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult<any, any>>;
}

export default function AddUser({
  isOpen,
  setIsOpen,
  refetch,
}: userProps): React.JSX.Element {

  const [cookies]=useCookies(['authToken'])
  const { control, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "", // إضافة حقل إعادة كلمة المرور
      roleName: "",
    },
    resolver: zodResolver(userZodSchema),
  });

  const mutation = useMutation({
    mutationKey: ["new-user"],
    mutationFn:(data:doctroType)=> addUser(data,cookies.authToken),
    onError: (err: any) => {
      const errorMessage = err.message || "حدث خطأ غير متوقع";
      message.error(errorMessage);
    },
    onSuccess: () => {
      setIsOpen(false);
      control._reset();
      refetch();
      message.success("تم إضافة المستخدم بنجاح");
    },
  });

  const user: userType = {
    userName: control._getWatch("userName"),
    email: control._getWatch("email"),
    password: control._getWatch("password"),
    
    confirmPassword:control._getWatch("confirmPassword"),
  
    roleName: control._getWatch("roleName"),
    };
  const onSubmit = (data:any) => {

    mutation.mutate(data )
    
  };

  return (
    <div dir="rtl">
      <Modal open={isOpen} closeIcon={false} footer={null}>
        <h2 className="text-2xl font-bold mb-4 font-serif text-center">
          إضافة مستخدم جديد
        </h2>
        <form
          dir="rtl"
          className="grid grid-cols-2 gap-2 justify-start font-serif font-normal text-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label htmlFor="userName" className="block font-medium mb-2">
              الاسم
            </label>
            <Controller
              name="userName"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="userName"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  placeholder="ادخل اسم المستخدم"
                  {...field}
                />
              )}
            />
            {errors.userName && (
              <span className="text-red-500 text-[16px]">
                {errors.userName.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              البريد الالكتروني
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  placeholder="ادخل البريد الالكتروني"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <span className="text-red-500 text-[16px] ">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              كلمة المرور
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  id="password"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  placeholder="ادخل كلمة المرور"
                  {...field}
                />
              )}
            />
            {errors.password && (
              <span className="text-red-500 text-[16px]">
                {errors.password.message}
              </span>
            )}
            {errors.confirmPassword && errors.confirmPassword.message === "كلمات المرور لا تتطابق" && (
              <span className="text-red-500 text-[16px]">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-medium mb-2">
              تأكيد كلمة المرور
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  id="confirmPassword"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-black"
                  placeholder="تأكيد كلمة المرور"
                  {...field}
                />
              )}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-[16px]">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          

          <div className="mb-4">
            <label htmlFor="roleName" className="block font-medium mb-2">
              الدور
            </label>
            <Controller
              name="roleName"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                >
                  <option value="">اختر...</option>
                  <option value="admin">ADMIN</option>
                  <option value="user">USER</option>
                </select>
              )}
            />
            {errors.roleName && (
              <span className="text-red-500 text-[16px]">
                {errors.roleName.message}
              </span>
            )}
          </div>

          <div className="col-span-2 flex justify-between items-center">
            <Button
              label={"إضافة"}
              onClick={handleSubmit(onSubmit)}
              className={`w-[70px]`}
            />
            <Button
              label={"إلغاء"}
              onClick={() => setIsOpen(false)}
              className={`w-[70px] bg-red-700`}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}