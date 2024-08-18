"use client";
import React from "react";
import Doctor from "../doctor/page";
import BigChartBox from "../chart/page";
import { useGetDoctor } from "../queries/page";

const Home = () => {
  const { isLoading, error, data } = useGetDoctor();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="grid gap-[10px] grid-cols-4  max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1   h-[calc(100%-20px)] max-sm:grid-cols-1">
      <div className=" rounded-[10px] border-[1px] border-solid col-span-3 shadow-lg    pr-[40px] bg-white">
        <BigChartBox />
      </div>
      <div className=" rounded-[10px] border-[1px] border-solid border-white shadow-lg p-[40px]  bg-white">
        <Doctor />
      </div>

      <div className=" rounded-[10px]  border-[1px] border-solid col-span-3  overflow-y-scroll p-[40px]  shadow-lg mt-0 bg-white ">
        {data?.map((data) => (
          <div key={data.id}>
            <h1>{data.doctorName}</h1>
            <div key={data.department.id}>
              <h2>{data.department.depName}</h2>
            </div>
            <h3>{data.phone}</h3>
          </div>
        ))}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore,
        veniam officiis vel aperiam eveniet placeat maxime alias neque sint
        omnis ducimus itaque aut mollitia temporibus perspiciatis repudiandae
        sunt nisi animi ab nihil laboru m. Blanditiis sequi, aut ut quo placeat
        quas sunt laborum odit ipsa dolor corporis! Neque dicta est quam eius id
        obcaecati ab so luta sapiente, ex assumenda optio recusandae, vel
        possimus quas, doloribus cupiditate veniam officiis consequatur dolores
        itaque nam ipsam? Adipisci hic consectetur eveniet. Cum, fugit nostrum!
        Quod cupiditate ullam delectus totam sapiente excepturi quae, facere
        dignissimos ex! Provident mollitia tenetur accusamus laboriosam libero
        officiis ducimus molestiae, non aspernatur laudantium illo quasi
        expedita voluptates animi fugiat adipisci? At magnam laborum eaque
        consequatur, consequuntur tempora quidem adipisci totam ut dolore quas
        dolor qui nisi aperiam mollitia enim reprehenderit ipsam? Laboriosam sed
        consequuntur natus. Voluptatibus doloribus nam sunt suscipit voluptatum.
        Necessitatibus, voluptates cum! Ea modi omnis obcaecati, quas laudantium
        autem delectus totam id quisquam quia inventore libero alias dolores
        beatae, molestiae deleniti provident facilis impedit error dolorem
        aperiam harum neque? Fuga consequatur dolores officiis, saepe quasi in
        omnis nulla aliquid quod laboriosam id deleniti explicabo atque
        necessitatibus rerum libero consequuntur molestias nisi modi! Impedit,
        similique. Dolorem fuga dignissimos obcaecati porro.
      </div>
      <div className="rounded-[10px] border-[1px] border-solid border-white shadow-md p-[40px]  bg-white "></div>
    </div>
  );
};

export default Home;
