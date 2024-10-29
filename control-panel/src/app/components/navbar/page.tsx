"use client";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { decrypt } from "../../util/encrypt";
import DangerDialog from "../ui/danger-dialog";
import Button from "../ui/button";
export default function NavBar() {
  const [userName, setUserName] = useState("");
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);
  const router = useRouter();
  const [cookies, setCookies] = useCookies();
  const handleLogout = () => {
    setCookies("authToken", "", { path: "/", maxAge: -1 });
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("session");
    setOpen(true);
    router.push("/login");
  };
  const Close = () => {
    setOpen(false);
  };
  const Open = () => {
    setOpen(true);
  };
  return (
    <div
      className="flex justify-between bg-white shadow-md p-[20px]"
      style={{ position: "sticky", top: 0, zIndex: 1 }}
    >
      <div className="flex  items-center gap-10">
        <img src="logo.svg" alt="log" width={25} height={5} />
        <span>Dashboard</span>
      </div>
      <div className="flex gap-5  ">
        <div className="flex items-center gap-2">
          <span className="font-bold font-serif text-[16px]">
            {`مرحبا بك, ${decrypt(userName)}`}!
          </span>
        </div>
        <DangerDialog
          content="هل تريد تسجيل الخروج حقاً"
          onClose={Close}
          onConfirm={handleLogout}
          open={open}
          title="تسجيل الخروج"
        ></DangerDialog>
      <Button label={`تسجيل الخروج`} onClick={Open} className={`hover:bg-red-700 py-[3px]`} />
        {/* <img
    src="/setting.svg"
    alt="log"
    width={25}
    height={5}
    className="max-sm:hidden bg-red-700"
  /> */}
      </div>
    </div>
  );
}
