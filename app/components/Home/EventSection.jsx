import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const EventSection = () => {
  const events = [
    {
      id: 1,
      date: "Jun 14 2023 | 12:00 am - 2:30 pm | New York",
      title: "Digital transformation conference",
    },
    {
      id: 2,
      date: "April 10, 2023 | 9:00 am - 5:00 pm | Mindahan",
      title: "World education day conference",
    },
    {
      id: 3,
      date: "July 16, 2023 | 10:30 am - 1:30 pm | Weedpatch",
      title: "Foundations of global health",
    },
    {
      id: 4,
      date: "March 24, 2023 | 10:30 am - 12:00 pm | Lnland",
      title: "Business creativity workshops",
    },
  ];
  return (
    <div className="w-full py-20 lg:py-36 bg-white relative flex flex-col items-center">
      <div className="w-full lg:container mx-auto event">
        <h2 className="text-center text-4xl font-bold">Current Events</h2>
        <p className="text-sm text-center text-gray-500 mt-1">
          We found 13 events available for you.
        </p>
        <div className="flex flex-col items-center mt-10 px-3 lg:px-0">
          {events.map((item) => (
            <div
              key={item.id}
              className="w-full lg:w-2/3 py-10 rounded-lg shadow-lg flex flex-col lg:flex-row justify-between px-10 mt-5 bg-white hover:border-l-2 border-blue-500 duration-100"
            >
              <div>
                <p className="text-sm text-gray-400">{item.date}</p>
                <p className="text-xl font-semibold mt-2 cursor-pointer hover:text-blue-500 duration-300">
                  {item.title}
                </p>
              </div>
              <div className="flex items-center mt-7 lg:mt-0">
                <p className="mr-2 font-semibold text-sm cursor-pointer hover:text-blue-500 duration-300">
                  View More
                </p>
                <FaArrowRightLong />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='w-3/5 mx-auto h-52 mt-20 hidden start-card lg:flex justify-between items-center px-10 rounded-xl absolute -bottom-28 shadow-md'>
            <div className='text-4xl font-bold text-white pl-10'>
                <p>You can be your own</p>
                <p>Guiding star with our help</p>
            </div>
            <button className='bg-gray-200 px-9 py-4 text-sm mr-16 rounded-sm hover:shadow-xl duration-300'>Get Started</button>
      </div>
    </div>
  );
};

export default EventSection;
