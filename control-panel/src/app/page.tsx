import NavBar from "@/components/navbar/page";
import Menu from "../components/Menu/page";
import {Home} from "@/components/Home/page";


export default function Main() {
  return (
    <div
   
      className="font-sans shadow-lg bg-slate-200 text-black p-1"
      dir="rtl"
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      
      <NavBar />
      <div className="flex w-[100%]  bg-white " style={{ overflowY: "auto" }}>
        <div className="w-[200px] shadow-lg border-l-2 border-solid  p-[5px,20px] max-lg:w-[5%] mt-[5px]">
          <Menu />
        </div>

        <div className=" w-[100%] pr-5 pl-5  mt-[10px] bg-slate-200">
          <Home />
        </div>
      </div>
    </div>
  );
}
