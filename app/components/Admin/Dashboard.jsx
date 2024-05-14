"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiDollar } from "react-icons/ci";
import { FaBloggerB, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { SiCoursera } from "react-icons/si";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [categoryData, setCategoryData] = useState();
  const [blogData, setBlogData] = useState();
  const [blogCount, setBlogCount] = useState();
  const [coursCount, setCourseCount] = useState();
  const [teacherCount, setTeacherCount] = useState();
  const [studentCount, setStudentCount] = useState();
  const [userList, setUserList] = useState();
  const [popup, setPopup] = useState(false)

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://educal-api.onrender.com/categories/getCategories"
      );
      setCategoryData(response.data.categories);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getBlogs = async () => {
    try {
      const response = await axios.get("https://educal-api.onrender.com/blog");
      setBlogData(response.data.blogs);
      setBlogCount(response.data.blogs.length);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCoursesCount = async () => {
    try {
      const response = await axios.get(
        "https://educal-api.onrender.com/courses/count"
      );
      setCourseCount(response.data.coursesCount);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getTeacherCount = async () => {
    try {
      const response = await axios.get(
        "https://educal-api.onrender.com/users/teacherCount"
      );
      setTeacherCount(response.data.teacherCount);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getStudentCount = async () => {
    try {
      const response = await axios.get(
        "https://educal-api.onrender.com/users/studentCount"
      );
      setStudentCount(response.data.studentCount);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getUserList = async () => {
    try {
      const response = await axios.get(
        "https://educal-api.onrender.com/users/getAllUser"
      );
      setUserList(response.data.users);
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteUser = async (id) => {
    alert("Kullanıcı silinecek");
    try {
      const response = await axios.delete(
        `https://educal-api.onrender.com/users/${id}`
      );
      if (response) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Hata...!!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    getCategories();
    getBlogs();
    getCoursesCount();
    getTeacherCount();
    getStudentCount();
    getUserList();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-lg font-semibold text-white">DASHBOARD</h1>
      <div className="w-full grid grid-cols-12 gap-x-5 mt-5">
        <div className="col-span-4">
          <div className="w-full bg-[#2A3042]">
            <div className="w-full flex justify-between py-2 px-2 bg-[#34406B]">
              <div>
                <p className="text-[#556EE6] text-lg">Welcome Back !</p>
                <p className="text-sm text-[#556EE6]">Skote Dashboard</p>
              </div>
              <img className="w-44" src="admin-img1.png" />
            </div>
            <div className="flex space-x-20 py-2 px-8 relative bottom-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-full">
                  <img
                    className="w-full h-full rounded-full"
                    src="educal-pp.png"
                  />
                </div>
                <p className="text-white mt-3">Educal Admin</p>
                <p className="text-xs text-gray-400">Founder</p>
              </div>
              <div className="flex space-x-16 pt-12">
                <div>
                  <p className="text-white">{blogCount}</p>
                  <p className="text-xs text-gray-400">Blogs</p>
                </div>
                <div>
                  <p className="text-white">$1250</p>
                  <p className="text-xs text-gray-400">Revenue</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#2A3042] py-3 px-3 mt-5">
            <p className="text-white font-semibold">Monthly Earning</p>
            <div className="flex justify-between mt-3">
              <div>
                <p className="text-sm font-thin text-white">This month</p>
                <p className="text-white font-semibold text-xl mt-2">$34,252</p>
                <div className="flex space-x-3">
                  <p className="text-xs text-green-500">12%</p>
                  <p className="text-xs font-thin text-white">
                    From previous period
                  </p>
                </div>
                <button className="bg-[#485EC4] mt-5 px-6 py-2 text-white text-xs rounded-sm">
                  View More
                </button>
              </div>
              <div className="pr-7 pt-3">
                <CiDollar color="white" size={100} />
              </div>
            </div>
            <p className="text-xs text-white font-thin mt-5">
              We craft digital, graphic and dimensional thinking.
            </p>
          </div>

          <div className="w-full bg-[#2A3042] py-3 px-3 mt-5">
            <p className="text-white font-semibold">Social Source</p>
            <div className="flex flex-col items-center mt-3">
              <div className="w-12 h-12 bg-[#34406B] rounded-full flex justify-center items-center">
                <FaFacebook size={24} color="#556EE6" />
              </div>
              <div className="flex items-center space-x-1 font-semibold mt-3">
                <p className="text-white">Facebook</p>
                <span className="text-white">-</span>
                <p className="text-gray-400">125 sales</p>
              </div>
              <p className="text-sm text-gray-400 text-center mt-1">
                Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien
                ut libero venenatis faucibus tincidunt.
              </p>
              <div className="w-full flex justify-between px-10 mt-8">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#556EE6] flex justify-center items-center">
                    <FaFacebook color="white" />
                  </div>
                  <p className="text-white mt-3">Facebook</p>
                  <p className="text-sm text-gray-400">125 sales</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#50A5F1] flex justify-center items-center">
                    <FaTwitter color="white" />
                  </div>
                  <p className="text-white mt-3">Twitter</p>
                  <p className="text-sm text-gray-400">112 sales</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#E83E8C] flex justify-center items-center">
                    <FaInstagram color="white" />
                  </div>
                  <p className="text-white mt-3">İnstagram</p>
                  <p className="text-sm text-gray-400">104 sales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8 ">
          <div className="w-full grid grid-cols-3 gap-x-5">
            <div className="flex items-center px-5 py-4 justify-between bg-[#2A3042]">
              <div className="">
                <p className="text-gray-400 text-sm">Students</p>
                <p className="text-white font-semibold mt-2">
                  {studentCount ? studentCount : null}
                </p>
              </div>
              <div className="">
                <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#556EE6]">
                  <PiStudent size={22} color="white" />
                </div>
              </div>
            </div>
            <div className="flex items-center px-5 py-4 justify-between bg-[#2A3042]">
              <div className="">
                <p className="text-gray-400 text-sm">Teacher</p>
                <p className="text-white font-semibold mt-2">
                  {teacherCount ? teacherCount : null}
                </p>
              </div>
              <div className="">
                <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#556EE6]">
                  <GiTeacher size={22} color="white" />
                </div>
              </div>
            </div>
            <div className="flex items-center px-5 py-4 justify-between bg-[#2A3042]">
              <div className="">
                <p className="text-gray-400 text-sm">Courses</p>
                <p className="text-white font-semibold mt-2">
                  {coursCount ? coursCount : null}
                </p>
              </div>
              <div className="">
                <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#556EE6]">
                  <SiCoursera size={22} color="white" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full py-5 px-3 bg-[#2A3042] mt-8">
            <p className="text-white font-semibold">Course Categories</p>
            <div className="grid grid-cols-3 gap-5 py-10">
              {categoryData?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-5 py-4 justify-center bg-[#222736] text-gray-400"
                >
                  <MdOutlineCategory size={26} />
                  <p className="text-lg font-semibold">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full py-5 px-3 bg-[#2A3042] mt-8">
            <p className="text-white font-semibold">Website Blogs</p>
            <div className="grid grid-cols-3 gap-5 py-10">
              {blogData?.map((item) => (
                <div className="flex items-center space-x-2 px-5 py-4 justify-center bg-[#222736] text-gray-400">
                  <FaBloggerB size={26} />
                  <p className="text-lg font-semibold">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-5 px-3 bg-[#2A3042] mt-5">
        <p className="text-white font-semibold">Users Info</p>
        <div className="w-full mt-5">
          <table className="table-fixed w-full border-collapse border border-gray-400">
            <thead className="text-gray-400">
              <tr>
                <th className="border border-gray-400 p-2">Order ID</th>
                <th className="border border-gray-400 p-2">Photo</th>
                <th className="border border-gray-400 p-2">User Name</th>
                <th className="border border-gray-400 p-2">Email</th>
                <th className="border border-gray-400 p-2">Date</th>
                <th className="border border-gray-400 p-2">Course</th>
                <th className="border border-gray-400 p-2">Role</th>
                <th className="border border-gray-400 p-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-center text-white text-sm divide-y divide-gray-400">
              {userList?.map((item) => (
                <tr key={item._id} className="border">
                  <td className=" py-1">{item._id}</td>
                  <td className=" py-1 flex justify-center">
                    <div className="w-10 h-10">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src={item.photoUrl}
                      />
                    </div>
                  </td>
                  <td className=" py-1">{item.name}</td>
                  <td className=" py-1">{item.email}</td>
                  <td className=" py-1">{item.age}</td>
                  <td className=" py-1">{item.courses.length}</td>
                  <td className=" py-1">{item.role}</td>
                  <td className=" py-1">
                    <button
                      onClick={() => deleteUser(item._id)}
                      className="bg-red-500 w-10 h-10 rounded-full flex justify-center items-center mx-auto hover:bg-red-900 duration-200"
                    >
                      <AiOutlineDelete size={22} color="white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
