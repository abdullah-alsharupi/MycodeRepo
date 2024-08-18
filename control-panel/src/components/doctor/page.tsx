export default function Doctor() {
  return (
    <div className="text-black">
      <h1 className="mb-[20px] ">Top Deals</h1>
      <div className="bg-white">
        <div
          key={"users.id"}
          className="flex items-center justify-between mt-[20px] space-x-1"
        >
          <div className="flex flex-3 gap-[20px]">
            <img
              alt=""
              className="w-[40px] h-[40px] rounded-[50%] object-cover max-sm:hidden"
            />
            <div className="flex flex-col gap-[5px]">
              <span className="font-medium text-[14px]">
                {"users.username"}
              </span>
              <span className="text-[12px]">{"users.email"}</span>
            </div>
          </div>
          <span className="font-medium flex-2">${"users.amount"}</span>
        </div>
      </div>
    </div>
  );
}
