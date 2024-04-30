"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "../middleware/useAuth";
import axios from "axios";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import CourseCard from "../components/Cards/CourseCard";
import Cookies from "js-cookie";

const page = () => {
  const [userData, setUserData] = useState();
  const [userCourses, setUserCourses] = useState();
  const [studentCourseId, setstudentCourseId] = useState();
  const [studentCourse, setStudentCourse] = useState([]);
  const [modal, setModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [name, setName] = useState();
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()
  const [location, setLocation] = useState()
  const [date, setDate] = useState()
  const [desc, setDesc] = useState();
  const [category, setCategory] = useState();
  const [photo, setPhoto] = useState();
  const [video, setVideo] = useState();
  const [categories, setCateries] = useState();
  const [id, setId] = useState();
  const [age, setAge] = useState()
  // const role = localStorage.getItem("role");
  const role = Cookies.get("role")

  useAuth();

  const getUserData = async () => {
    // const token = await localStorage.getItem("tokenKey");
    const token = await Cookies.get("tokenKey")
    try {
      const response = await axios.get("https://educal-api.onrender.com/users/profile", {
        headers: {
          Authorization: token,
        },
      });
      if (response) {
        setUserData(response.data.user);
        setUserCourses(response.data.courses);
      }
      if (response.data.user.role === "student") {
        setstudentCourseId(response.data.user.courses);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCategory = async () => {
    try {
      const response = await axios.get(
        "https://educal-api.onrender.com/categories/getCategories"
      );
      setCateries(response.data.categories);
    } catch (error) {
      console.log("error", error);
    }
  };

  const createCourse = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("category", category);
    formData.append("user", id);
    formData.append("image", photo);
    formData.append("videoID", video);

    try {
      const response = await axios.post(
        "https://educal-api.onrender.com/courses",
        formData
      );
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
      }, 1500);
    } catch (error) {
      console.log("error", error);
    }
  };

  const openModal = async () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Düzgün animasyon ile kaydırma
    });
    setModal(!modal);
    // await getCategory();
  };
  const openUserModal = async () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Düzgün animasyon ile kaydırma
    });
    setUserModal(!userModal);
    // await getCategory();
  };

  useEffect(() => {
    const handleWheelDisable = (e) => {
      if (modal || userModal) {
        e.preventDefault();
      }
    };

    if (modal || userModal) {
      window.addEventListener("wheel", handleWheelDisable, { passive: false });
    } else {
      window.removeEventListener("wheel", handleWheelDisable);
    }

    return () => {
      window.removeEventListener("wheel", handleWheelDisable);
    };
  }, [modal || userModal]);

  useEffect(() => {
    getUserData();
    getCategory();
  }, []);

  useEffect(() => {
    if (userData) setId(userData._id);
    setUserName(userData?.name)
    setDate(userData?.age)
    setLocation(userData?.location)
  }, [userData]);

  useEffect(() => {
    if (studentCourseId) getEnrollCourses();
  }, [studentCourseId]);

  const getEnrollCourses = async () => {
    try {
      if (role === "student") {
        for (let index = 0; index < studentCourseId.length; index++) {
          const id = studentCourseId[index];
          const response = await axios.post(
            "https://educal-api.onrender.com/users/getStudentCourses",
            {
              id: id,
            }
          );
          const c = response.data.course;
          setStudentCourse((prev) => [...prev, c]);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const repeatObject = () => {
    // Tekrarlanan id'leri bulmak için bir yardımcı nesne oluşturun
    let idler = {};

    // Tekrarlanan id'leri bulun ve filtreleyin
    let sonuc = studentCourse.filter(function (obje) {
      // Eğer id daha önce görülmemişse, id'yi kaydedin ve bu nesneyi sonuca dahil edin
      if (!idler[obje?._id]) {
        idler[obje?._id] = true;
        return true;
      }
      // Eğer id daha önce görülmüşse, bu nesneyi sonuca dahil etmeyin
      return false;
    });
    console.log('sonuc', sonuc);
    return sonuc;
  };

  const calculateAge = () => {
    const today = new Date();
    const birthdateDate = new Date(userData?.age);

    let age = today.getFullYear() - birthdateDate.getFullYear();
    const monthDiff = today.getMonth() - birthdateDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateDate.getDate())) {
        age--;
    }

    setAge(age)
};


const updateUser = async() =>{
  try{
    const response = await axios.put('https://educal-api.onrender.com/users/update',{
      id: userData._id,
      name: userName,
      age: date,
      location: location
    })
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
    }, 1500);


  }catch(error){
    console.log('error', error);
  }
}

useEffect(() => {
  if(date) calculateAge()
}, [date])


  return (
    <div className="w-full">
      {userModal && (
        <div className="w-full h-screen bg-[#000000c9] absolute z-10 flex justify-center items-center">
          <div className="w-full lg:w-1/2 mx-auto py-20 bg-white rounded-md relative">
            <div
              onClick={() => setUserModal(false)}
              className="absolute top-5 right-5 cursor-pointer"
            >
              <FaTimes size={24} color="darkgray" />
            </div>
            <div className="w-2/3 mx-auto">
              <p className="font-semibold">User Name</p>
              <div className="relative">
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  className="w-full py-6 pl-5 bg-gray-100 rounded-md text-xs mt-2"
                  type="text"
                  placeholder="User Name"
                />
              </div>
            </div>
            
            <div className="w-2/3 mx-auto mt-8">
              <p className="font-semibold">Birthday</p>
              <div className="relative">
              <input
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  className="w-full py-6 pl-5 bg-gray-100 rounded-md text-xs mt-2"
                  type="date"
                  // placeholder="Password"
                />
              </div>
            </div>
            <div className="w-2/3 mx-auto mt-8">
              <p className="font-semibold">Location</p>
              <div className="relative">
                <select
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full py-6 bg-gray-100 rounded-md text-sm mt-2 pl-5"
                >
                  <option disabled selected value>
                    {" "}
                    -- Select an category --{" "}
                  </option>
                  <option selected={location ? true : false} value="Türkiye">Türkiye</option>
                </select>
              </div>
            </div>
            <div className="w-2/3 mx-auto mt-7">
              <button
                onClick={() => updateUser()}
                className="w-full text-white font-bold text-sm bg-blue-600 py-4 rounded-[3px] hover:shadow-lg duration-300"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {modal && (
        <div className="w-full h-screen bg-[#000000c9] absolute z-10 flex justify-center items-center">
          <div className="w-full lg:w-1/2 mx-auto py-40 lg:py-20 bg-white rounded-md relative">
            <div
              onClick={() => setModal(!modal)}
              className="absolute top-5 right-5 cursor-pointer"
            >
              <FaTimes size={24} color="darkgray" />
            </div>
            <div className="w-2/3 mx-auto">
              <p className="font-semibold">Course Name</p>
              <div className="relative">
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-6 pl-5 bg-gray-100 rounded-md text-xs mt-2"
                  type="text"
                  placeholder="Course Name"
                />
              </div>
            </div>
            <div className="w-2/3 mx-auto mt-8">
              <p className="font-semibold">Description</p>
              <div className="relative">
                <textarea
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full h-40 pl-10 bg-gray-100 rounded-md text-xs mt-2 whitespace-pre"
                ></textarea>
              </div>
            </div>
            <div className="w-2/3 mx-auto">
              <p className="font-semibold">Youtube Video Id</p>
              <div className="relative">
                <input
                  onChange={(e) => setVideo(e.target.value)}
                  className="w-full py-6 pl-5 bg-gray-100 rounded-md text-xs mt-2"
                  type="text"
                  placeholder="Course Name"
                />
              </div>
            </div>
            <div className="w-2/3 mx-auto mt-8">
              <p className="font-semibold">Category</p>
              <div className="relative">
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full py-6 bg-gray-100 rounded-md text-sm mt-2 pl-5"
                >
                  <option disabled selected value>
                    {" "}
                    -- Select an category --{" "}
                  </option>
                  {categories?.map((item) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-2/3 mx-auto mt-8">
              <p className="font-semibold">Photo</p>
              <div className="relative">
                <div className="absolute top-8 left-2">
                  <CiImageOn size={21} color="gray" />
                </div>
                <input
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="w-full py-6 pl-10 bg-gray-100 rounded-md text-xs mt-2"
                  type="file"
                  placeholder="Re-Password"
                />
              </div>
            </div>
            <div className="w-2/3 mx-auto mt-7">
              <button
                onClick={() => createCourse()}
                className="w-full text-white font-bold text-sm bg-blue-600 py-4 rounded-[3px] hover:shadow-lg duration-300"
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}

      <title>Educal - Dashboard</title>
      <div className="w-full dashboard-title flex items-center">
        <div className="container mx-auto">
          <h1 className="text-white text-6xl font-bold mt-2">Dashboard</h1>
          <p className="text-white mt-2">Home . Dashboard</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 mx-auto bg-white my-10 border rounded-lg py-14 lg:px-20 relative">
        <div
          onClick={() => openUserModal()}
          className="absolute right-8 top-8 cursor-pointer"
        >
          <CiSettings size={24} />
        </div>
        <div className="flex space-x-8">
          <div className="flex flex-col">
            <div className="w-36 h-36 rounded-full border-2 border-gray-500">
              <img
                className="w-full h-full rounded-full object-cover"
                src={userData?.photoUrl}
              />
            </div>

            <div className="flex justify-center mt-3 space-x-2">
              <FaLinkedin size={22} color="gray" />
              <FaGithub size={22} color="gray" />
              <IoMdMail size={22} color="gray" />
            </div>
          </div>

          <div className="flex-col mt-2">
            <p className="text-lg font-semibold">{userData?.name}</p>
            <p className="text-sm">{userData?.email}</p>
            <p className="text-sm text-gray-500 mt-2">{age ? age : 'Güncelleyiniz'} - { userData?.location ? userData?.location : 'Güncelleyiniz'}</p>
            <p className="text-xs text-gray-400 capitalize mt-2">
              {userData?.role}
            </p>
            {userData?.role === "teacher" ? (
              <p className="text-xs text-gray-600 mt-1">
                {userData?.courses.length} kurs
              </p>
            ) : (
              <p className="text-xs text-gray-600 mt-1">
                {userData?.courses.length} katılım
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto border rounded-md bg-white py-20 my-10">
        <div className="flex justify-between px-20">
          <p className="text-lg font-semibold">Kurslarınız</p>
          {role === "teacher" && (
            <button
              onClick={() => openModal()}
              className="text-sm font-semibold bg-gray-100 px-6 py-2 rounded-md"
            >
              Kurs Ekle
            </button>
          )}
        </div>
        <div className="w-full lg:px-36 mt-10 grid grid-cols-1 px-5 lg:px-0 lg:grid-cols-3 gap-10">
          {userCourses?.map((item, index) => (
            <CourseCard
              key={index}
              item={item}
              categories={categories}
              teacher={userData.name}
              teacherPhoto={userData.photoUrl}
            />
          ))}
          {role === "student" &&
            repeatObject().map((item, index) => (
              <CourseCard
                key={index}
                item={item}
                categories={categories}
                // teacher={userData.name}
                // teacherPhoto={userData.photoUrl}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;
