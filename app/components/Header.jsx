"use client";
import React, { useEffect, useState } from "react";
import { TbGridDots } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { TiTimes } from "react-icons/ti";
import { BsPlus } from "react-icons/bs";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios"

const Header = () => {
  const router = useRouter();
  const nav = [
    {
      id: 1,
      title: "Home",
      path: "/",
    },
    {
      id: 2,
      title: "Courses",
      path: "/courses",
    },
    {
      id: 3,
      title: "Blog",
      path: "/",
    },
    {
      id: 4,
      title: "Pages",
      path: "/",
    },
    {
      id: 5,
      title: "Contact",
      path: "/contact",
    },
  ];
  const categories = [
    {
      id: 1,
      title: "Data Science",
    },
    {
      id: 2,
      title: "Business",
    },
    {
      id: 3,
      title: "Art & Design",
    },
    {
      id: 4,
      title: "Lifestyle",
    },
    {
      id: 5,
      title: "Marketing",
    },
    {
      id: 6,
      title: "Finance",
    },
  ];

  const pages = [
    {
      id: 1,
      title: "About",
      path: "/about",
    },
    {
      id: 2,
      title: "Instructor",
      path: "/instructor",
    },
    {
      id: 3,
      title: "Dashboard",
      path: "/dashboard",
    },
  ];

  const [mobileToggle, setMobileToggle] = useState(false);
  const [categoryData, setCategoryData] = useState()

  const token = localStorage.getItem("tokenKey");

  useEffect(() => {
    const handleWheelDisable = (e) => {
      if (mobileToggle) {
        e.preventDefault();
      }
    };

    if (mobileToggle) {
      window.addEventListener("wheel", handleWheelDisable, { passive: false });
    } else {
      window.removeEventListener("wheel", handleWheelDisable);
    }

    return () => {
      window.removeEventListener("wheel", handleWheelDisable);
    };
  }, [mobileToggle]);

  useEffect(() => {
   getCategories()
  }, [])
  

  const path = usePathname();

  const logOut = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("role");
    localStorage.removeItem("userData");
    router.push("/signin");
    toast.warn("Çıkış yapıldı", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const getCategories = async() =>{
    try{
      const response = await axios.get('https://educal-api.onrender.com/categories/getCategories')
      setCategoryData(response.data.categories)
    }catch(error){
      console.log('error', error);
    }
  }

  return (
    <div className=" py-5 lg:flex lg:justify-between lg:items-center px-4 lg:px-0 container mx-auto absolute left-0 right-0">
      {mobileToggle && (
        <div className="w-full h-screen absolute top-0 right-0 z-50 flex">
          <div
            onClick={() => setMobileToggle(!mobileToggle)}
            className="w-1/5 h-screen z-50 bg-[#00000031]"
          ></div>
          <div className="w-4/5 h-screen z-50 bg-white">
            <div className="flex items-center justify-between px-10 mt-5">
              <img src="/logo.png" />
              <div
                onClick={() => setMobileToggle(!mobileToggle)}
                className="w-10 h-10 rounded-full border border-gray-600 flex justify-center items-center"
              >
                <TiTimes size={22} color="gray" />
              </div>
            </div>
            <div className="w-full px-7 mt-10">
              {nav.map((item, index) => (
                <div
                  key={index}
                  className="border-b py-2 flex justify-between items-center group"
                >
                  <p
                    onClick={() => router.push(`${item.path}`)}
                    className="uppercase text-xs font-bold text-gray-500 group-hover:tracking-widest group-hover:text-blue-500	duration-300"
                  >
                    {item.title}
                  </p>
                  <div className="border-l px-2">
                    <BsPlus size={26} />
                  </div>
                </div>
              ))}
            </div>
            <div className="relative mt-7 w-4/5 mx-auto flex justify-center">
              <span className="absolute top-3 left-2">
                <CiSearch color="black" size={22} />
              </span>
              <input
                className="pl-10 h-12 w-full rounded-md text-xs text-black bg-gray-200"
                type="search"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between lg:justify-start items-center w-full lg:w-1/3">
        {path === "/" ? (
          <div
            onClick={() => router.push("/")}
            className="lg:border-r border-gray-400 pr-10 cursor-pointer"
          >
            <img src="/logo.png" />
          </div>
        ) : (
          <div
            onClick={() => router.push("/")}
            className="lg:border-r border-gray-400 pr-10 cursor-pointer"
          >
            <img src="/logo-2.png" />
          </div>
        )}

        <div
          onClick={() => setMobileToggle(!mobileToggle)}
          className="block lg:hidden"
        >
          <RxHamburgerMenu color="blue" size={32} />
        </div>
        <div className="pl-10 hidden lg:flex items-center cursor-pointer relative group">
          <div className="hidden group-hover:block">
            <TbGridDots color="#2B4EFF" size={24} />
          </div>
          <div className="block group-hover:hidden">
            <TbGridDots color={path === "/" ? "black" : "white"} size={24} />
          </div>
          <p
            className={`${
              path === "/" ? "text-[#0e1133]" : "text-white"
            } pl-2 group-hover:text-blue-500 duration-300`}
          >
            Category
          </p>
          <div className="w-52 bg-white py-3 absolute top-7 cursor-default shadow-md invisible group-hover:visible translate-y-4 group-hover:translate-y-0 duration-200">
            {categoryData?.map((item, index) => (
              <p
                key={index}
                className="text-gray-500 ml-8 mt-1.5 cursor-pointer hover:text-[#2B4EFF]"
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`${
          path === "/" ? "text-[#0e1133]" : "text-white"
        } w-1/3 text-sm font-semibold`}
      >
        <ul className="hidden lg:flex justify-around">
          {nav.map((item, index) => (
            <div key={index} className={item.title === "Pages" ? "group" : ""}>
              <li
                onClick={() => router.push(`${item.path}`)}
                key={item.id}
                className="cursor-pointer hover:text-blue-500 duration-300"
              >
                {item.title}
              </li>
              <div className="w-52 bg-white py-3 px-3 absolute top-16 z-50 cursor-default shadow-md invisible group-hover:visible translate-y-4 group-hover:translate-y-0 duration-200">
                {token
                  ? pages.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => router.push(`${item.path}`)}
                        className="w-full pages-link group my-1 pl-3"
                      >
                        <p
                          key={item.id}
                          className="text-gray-500 mt-1.5 py-3 w-full cursor-pointer relative z-50"
                        >
                          {item.title}
                        </p>
                      </div>
                    ))
                  : pages
                      .filter((p) => p.title !== "Dashboard")
                      .map((item, index) => (
                        <div
                          key={index}
                          onClick={() => router.push(`${item.path}`)}
                          className="w-full pages-link group my-1 pl-3"
                        >
                          <p
                            key={item.id}
                            className="text-gray-500 mt-1.5 py-3 w-full cursor-pointer relative z-50"
                          >
                            {item.title}
                          </p>
                        </div>
                      ))}
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div className="w-1/3 hidden lg:flex justify-between pl-10">
        <div className="relative">
          <span className="absolute top-3 left-2">
            <CiSearch color="black" size={22} />
          </span>
          <input
            className="pl-10 h-12 w-72 rounded-md text-xs text-black"
            type="search"
            placeholder="Search..."
          />
        </div>
        {!token && <button
          onClick={() => router.push("/signup")}
          className="bg-[#2b4eff] px-4 h-12 rounded-md text-sm text-white hover:shadow-xl duration-300"
        >
          Try for free
        </button>}
        {token ? (
          <button
            onClick={() => logOut()}
            className="px-3 bg-red-500 text-sm text-white rounded-md"
          >
            Çıkış
          </button>
        ) : (
          <button
            onClick={() => router.push("/signin")}
            className="px-3 bg-[#2b4eff] text-sm text-white rounded-md"
          >
            Login
          </button>
        )}
        {/* <button
          onClick={() => router.push("/signin")}
          className="px-3 bg-[#2b4eff] text-sm text-white rounded-md"
        >
          Login
        </button> */}
      </div>
    </div>
  );
};

export default Header;
