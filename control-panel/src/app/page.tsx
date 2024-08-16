import NavBar from '@/app/navbar/page';
import Footer from './Footer/page';
import Menu from './Menu/page';

export default function Home() {
  return (
    <div className="font-sans bg-slate-800 text-white p-1" dir="rtl" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <NavBar  />
      <div className="flex-grow" style={{ overflowY: 'auto' }}>
        <div className="flex mx-[5px]" dir="rtl">
          <div className="w-[150px] border-l-2 border-solid border-slate-500 h-[calc(100%-80px)] p-[5px,20px] max-lg:w-[5%] mt-[10px]">
            <Menu />
          </div>
        </div>
      </div>
      <Footer  />
    </div>
  );
}
