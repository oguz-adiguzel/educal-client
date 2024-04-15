"use client";
import coursesData from "@/coursesData";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { TabView, TabPanel } from "primereact/tabview";
import { IoBookmarkOutline, IoHomeOutline } from "react-icons/io5";
import { PiBookThin } from "react-icons/pi";
import { GoDeviceCameraVideo, GoTag } from "react-icons/go";
import { CiClock2, CiStar, CiUser } from "react-icons/ci";
import { LuBook } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { GrLanguage } from "react-icons/gr";
import axios from "axios";
import { FaRegClock } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { SlEarphones } from "react-icons/sl";
import { AiOutlineFileText } from "react-icons/ai";
import { Accordion, AccordionTab } from "primereact/accordion";
import { toast } from "react-toastify";
import YouTube from "react-youtube";
import Cookies from "js-cookie";

const page = () => {
  // const data = coursesData;
  const [data, setData] = useState();
  const [tab, setTab] = useState("discription");
  const [studentCourses, setStudentCourses] = useState([]);
  const [find, setFind] = useState(false);
  const [title, setTitle] = useState();
  const [comment, setComment] = useState();
  const [raiting, setRaiting] = useState()
  const [averageRaiting, setAverageRaiting] = useState()
  // const token = localStorage.getItem("tokenKey");
  const token = Cookies.get("tokenKey")
  // const role = localStorage.getItem("role");
  const role = Cookies.get("role")
  // const userData = JSON.parse(localStorage.getItem("userData"));
  const userData = JSON.parse(Cookies.get("userData"))
  const params = useParams();
  const router = useRouter();

  const onPointerMove = (value, index) => setRaiting(value)

  const getCourse = async () => {
    try {
      const response = await axios.get(
        `https://educal-api.onrender.com/courses/${params.slug[0]}`
      );
      setData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const findCategory = () => {
    let a = data?.categories?.find((cat) => cat._id === data?.course?.category);
    return a?.name;
  };

  useEffect(() => {
    // setCourse(data.find((item) => item.slug === params.slug[0]));
    getCourse();
    getStudentCourse();
  }, []);

  const getStudentCourse = async () => {
    // const token = await localStorage.getItem("tokenKey");
    const token = await Cookies.get("tokenKey")
    try {
      const response = await axios.get(
        "https://educal-api.onrender.com/users/getTeacherCourses",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response) {
        setStudentCourses(response.data.courses);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const enrollCourse = async () => {
    try {
      const response = await axios.post(
        "https://educal-api.onrender.com/courses/enroll",
        {
          userID: userData._id,
          courseID: data.course._id,
        }
      );
      if (response) {
        getStudentCourse();
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
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const releaseCourse = async () => {
    try {
      const response = await axios.post(
        "https://educal-api.onrender.com/courses/release",
        {
          userID: userData._id,
          courseID: data.course._id,
        }
      );
      if (response) {
        getStudentCourse();
        toast.warn(response.data.message, {
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
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteCourse = async () => {
    try {
      const response = await axios.delete(
        `https://educal-api.onrender.com/courses/${params.slug[0]}`
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
      router.push("/dashboard");
    } catch (error) {
      console.log("error", error);
    }
  };

  const findCourse = async () => {
    const course = await studentCourses.find(
      (item) => item === data?.course?._id
    );
    if (course) {
      setFind(true);
    } else {
      setFind(false);
    }
  };

  useEffect(() => {
    // getStudentCourse()
    findCourse();
  }, [studentCourses]);

  const opts = {
    height: "420",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  const createComment = async () => {
    // const token = localStorage.getItem('tokenKey')
    const token = Cookies.get("tokenKey")

    if(token){
      // const userData = await JSON.parse(localStorage.getItem("userData"));
      const userData = await JSON.parse(Cookies.get("userData"))
      try {
        const response = await axios.post(
          "https://educal-api.onrender.com/courses/comment",
          {
            id: data.course._id,
            userName: userData.name,
            userPhoto: userData.photoUrl,
            title: title,
            comment: comment,
            raiting: raiting
          }
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
        setRaiting(0)
        getCourse()
        // raitingCount()
      } catch (error) {
        console.log("error", error);
      }
    }else{
      toast.warn('Lütfen Giriş Yapınız', {
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

  const raitingCount = () =>{
    let r = 0
    data?.course.comments.forEach((item) => {
      const q = (item.raiting + r)
      r = q
    });
    let average = r / (data?.course.comments.length)
    setAverageRaiting(average)
  }

  useEffect(() => {
    raitingCount()
  }, [data])
  
  return (
    <div className="w-full">
      <title>Educal - Course</title>
      <div className="w-full courseDetail-title flex items-center">
        <div className="container mx-auto">
          <h1 className="text-white text-6xl font-bold mt-2">Course Detail</h1>
          <p className="text-white mt-2">Home . Course</p>
        </div>
      </div>
      <div className="container my-16 px-20 mx-auto grid grid-cols-7 items-start gap-x-20">
        <div className="col-span-5">
          <p className="text-xs text-gray-500 mb-8">
            Home . Courses . {data?.course?.name}
          </p>
          <span className="text-xs text-white bg-green-600 px-2 py-1 rounded-sm">
            {findCategory()}
          </span>
          <p className="text-5xl font-bold pr-64 mt-5">{data?.course?.name}</p>
          <div className="flex space-x-20 items-center mt-8">
            <div className="flex items-center space-x-3">
              <div className="rounded-full border-2 w-12 h-12 border-blue-500">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src={data?.user?.photoUrl}
                />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">Teacher</p>
                <p className="text-sm font-bold mt-1">{data?.user?.name}</p>
              </div>
            </div>
            <div className="">
              <p className="text-xs font-bold text-gray-500">Last Update:</p>
              <p className="text-sm font-bold mt-1">June 21, 2023</p>
            </div>
            <div className="">
              <p className="text-xs font-bold text-gray-500">Review:</p>
              <div className="flex items-center space-x-2">
                <Rating
                  size={20}
                  readonly={true}
                  SVGstyle={{ display: "inline" }}
                  initialValue={4.5}
                />
                <p className="text-sm font-bold mt-1">4.5</p>
              </div>
            </div>
          </div>
          <img className="mt-7 w-5/6" src={data?.course?.photoUrl} />
          <div className="w-5/6 h-16 mt-5 bg-gray-300 grid grid-cols-4 rounded-l-md rounded-r-md">
            <div
              onClick={() => setTab("discription")}
              className={`border-r flex space-x-2 ${
                tab === "discription" ? "bg-blue-600" : ""
              } ${
                tab === "discription" ? "text-white" : ""
              } rounded-l-md justify-center items-center border-gray-400 cursor-pointer`}
            >
              <IoBookmarkOutline size={20} />
              <p>Discription</p>
            </div>
            <div
              onClick={() => setTab("curriculum")}
              className={`border-r flex space-x-2 justify-center items-center border-gray-400 ${
                tab === "curriculum" ? "bg-blue-600" : ""
              } ${tab === "curriculum" ? "text-white" : ""} cursor-pointer`}
            >
              <PiBookThin size={20} />
              <p>Curriculum</p>
            </div>
            <div
              onClick={() => setTab("reviews")}
              className={`border-r flex space-x-2 justify-center items-center border-gray-400 ${
                tab === "reviews" ? "bg-blue-600" : ""
              } ${tab === "reviews" ? "text-white" : ""} cursor-pointer`}
            >
              <CiStar size={22} />
              <p>Reviews</p>
            </div>
            <div
              onClick={() => setTab("members")}
              className={`flex space-x-2 rounded-r-md justify-center items-center border-gray-400 ${
                tab === "members" ? "bg-blue-600" : ""
              } ${tab === "members" ? "text-white" : ""} cursor-pointer`}
            >
              <CiUser size={22} />
              <p>Members</p>
            </div>
          </div>
          <div className="w-5/6 py-5 px-6 mt-5 rounded-l-md rounded-r-md">
            {tab === "discription" && (
              <>
                {" "}
                <p className="text-2xl font-semibold">Course Overview</p>
                <p className="mt-3 text-gray-400">
                  {data?.course?.description}
                </p>
                <div className="flex items-center space-x-2 mt-6">
                  <GoTag color="blue" />
                  <p className="text-sm hover:text-blue-400 duration-300 text-gray-400">
                    Big data, Data analysis, Data modeling
                  </p>
                </div>
                <p className="text-2xl font-semibold mt-8">
                  What is the Target Audience?
                </p>
                <div className="flex items-center space-x-2 mt-3">
                  <TiTick color="gray" size={24} />
                  <p className="text-gray-400">Business's managers, leaders</p>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <TiTick color="gray" size={24} />
                  <p className="text-gray-400">
                    {" "}
                    Downloadable lectures, code and design assets for all
                    projects
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <TiTick color="gray" size={24} />
                  <p className="text-gray-400">
                    {" "}
                    Anyone who is finding a chance to get the promotion
                  </p>
                </div>
              </>
            )}
            {tab === "curriculum" && (
              <>
                <YouTube
                  videoId={data?.course?.videoID}
                  opts={opts}
                  onReady={onReady}
                />{" "}
                <Accordion className="mt-10" multiple activeIndex={0}>
                  <AccordionTab
                    style={{ border: "1px solid #c8cacc", borderRadius: "5px" }}
                    header="Week 01"
                  >
                    <div className="w-full flex justify-between border-b py-4 hover:bg-gray-100 duration-300 rounded-sm px-1">
                      <div className="flex items-center text-sm">
                        <AiOutlineFileText />
                        <p className="font-bold ml-2">Reading :</p>
                        <p className="ml-1">Ut enim ad minim veniam</p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <CiClock2 size={22} />
                          <p>14 minutes</p>
                        </div>
                        <p className="px-4 py-1 text-white text-sm rounded-md bg-[#F2277E]">
                          2 questions
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex justify-between border-b py-4 hover:bg-gray-100 duration-300 rounded-sm px-1">
                      <div className="flex items-center text-sm">
                        <GoDeviceCameraVideo />
                        <p className="font-bold ml-2">Video :</p>
                        <p className="ml-1">Greetings and introduction</p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <CiClock2 size={22} />
                          <p>14 minutes</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between border-b py-4 hover:bg-gray-100 duration-300 rounded-sm px-1">
                      <div className="flex items-center text-sm">
                        <SlEarphones />
                        <p className="font-bold ml-2">Audio :</p>
                        <p className="ml-1">Interactive lesson</p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <CiClock2 size={22} />
                          <p>15 minutes</p>
                        </div>
                        <p className="px-4 py-1 text-white text-sm rounded-md bg-[#F2277E]">
                          3 questions
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex justify-between border-b py-4 hover:bg-gray-100 duration-300 rounded-sm px-1">
                      <div className="flex items-center text-sm">
                        <AiOutlineFileText />
                        <p className="font-bold ml-2">Reading :</p>
                        <p className="ml-1">Ut enim ad minim veniam</p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <CiClock2 size={22} />
                          <p>22 minutes</p>
                        </div>
                      </div>
                    </div>
                  </AccordionTab>
                </Accordion>
                <Accordion className="mt-10" multiple activeIndex={0}>
                  <AccordionTab
                    style={{ border: "1px solid #c8cacc", borderRadius: "5px" }}
                    header="Week 02"
                  >
                    <div className="w-full flex justify-between border-b py-4 hover:bg-gray-100 duration-300 rounded-sm px-1">
                      <div className="flex items-center text-sm">
                        <AiOutlineFileText />
                        <p className="font-bold ml-2">Reading :</p>
                        <p className="ml-1">Ut enim ad minim veniam</p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <CiClock2 size={22} />
                          <p>14 minutes</p>
                        </div>
                        <p className="px-4 py-1 text-white text-sm rounded-md bg-[#F2277E]">
                          2 questions
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex justify-between border-b py-4 hover:bg-gray-100 duration-300 rounded-sm px-1">
                      <div className="flex items-center text-sm">
                        <GoDeviceCameraVideo />
                        <p className="font-bold ml-2">Video :</p>
                        <p className="ml-1">Greetings and introduction</p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <CiClock2 size={22} />
                          <p>14 minutes</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-between border-b py-4 hover:bg-gray-100 duration-300 rounded-sm px-1">
                      <div className="flex items-center text-sm">
                        <SlEarphones />
                        <p className="font-bold ml-2">Audio :</p>
                        <p className="ml-1">Interactive lesson</p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <CiClock2 size={22} />
                          <p>15 minutes</p>
                        </div>
                        <p className="px-4 py-1 text-white text-sm rounded-md bg-[#F2277E]">
                          3 questions
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex justify-between border-b py-4 hover:bg-gray-100 duration-300 rounded-sm px-1">
                      <div className="flex items-center text-sm">
                        <AiOutlineFileText />
                        <p className="font-bold ml-2">Reading :</p>
                        <p className="ml-1">Ut enim ad minim veniam</p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <CiClock2 size={22} />
                          <p>22 minutes</p>
                        </div>
                      </div>
                    </div>
                  </AccordionTab>
                </Accordion>{" "}
              </>
            )}
            {tab === "reviews" && (
              <>
                {" "}
                <p className="text-xl font-bold">Reviews</p>
                <p className="text-sm text-gray-400 mt-3">
                  Gosh william I'm telling crikey burke I don't want no agro A
                  bit of how's your father bugger all mate off his nut that,
                  what a plonker cuppa owt to do
                </p>
                <div className="w-full grid grid-cols-6 gap-1 mt-3">
                  <div className="col-span-2 flex flex-col items-center justify-center py-12 bg-gray-200">
                    <p className="text-8xl font-semibold">{averageRaiting ? averageRaiting.toFixed(1) : '5'}</p>
                    <Rating
                      size={20}
                      readonly={true}
                      SVGstyle={{ display: "inline" }}
                      initialValue={4.5}
                    />
                    <p className="text-gray-400 mt-1">2 Raitings</p>
                  </div>
                  <div className="col-span-4 px-10 py-10 bg-gray-200 text-sm">
                    <p className="font-semibold">Detailed Rating</p>
                    <div className="flex justify-between items-center text-gray-500 mt-5">
                      <p>5 stars</p>
                      <div className="grid grid-cols-10 w-80 rounded-full">
                        <div className="col-span-10 py-[1.8px] rounded-full bg-blue-700"></div>
                      </div>
                      <p className="w-6">100</p>
                    </div>
                    <div className="flex justify-between items-center text-gray-500 mt-1">
                      <p>4 stars</p>
                      <div className="grid grid-cols-10 w-80 rounded-full">
                        <div className="col-span-3 py-[1.8px] rounded-l-full bg-blue-700"></div>
                        <div className="col-span-7 py-[1.8px] rounded-r-full  bg-gray-500"></div>
                      </div>
                      <p className="w-6">30</p>
                    </div>
                    <div className="flex justify-between items-center text-gray-500 mt-1">
                      <p>3 stars</p>
                      <div className="grid grid-cols-10 w-80 rounded-full">
                        <div className="col-span-10 py-[1.8px] rounded-full bg-gray-500"></div>
                      </div>
                      <p className="w-6">0</p>
                    </div>
                    <div className="flex justify-between items-center text-gray-500 mt-1">
                      <p>2 stars</p>
                      <div className="grid grid-cols-10 w-80 rounded-full">
                        <div className="col-span-10 py-[1.8px] rounded-full bg-gray-500"></div>
                      </div>
                      <p className="w-6">0</p>
                    </div>
                    <div className="flex justify-between items-center text-gray-500 mt-1">
                      <p>1 stars</p>
                      <div className="grid grid-cols-10 w-80 rounded-full">
                        <div className="col-span-10 py-[1.8px] rounded-full bg-gray-500"></div>
                      </div>
                      <p className="w-6">0</p>
                    </div>
                  </div>
                </div>
                <p className="mt-10 text-xl font-semibold ">2 Reviews</p>
                <div className="w-full flex bg-gray-200 px-10 py-5 rounded-sm mt-3">
                  <img
                    className="w-12 h-12 rounded-full"
                    src="/teacher-1.jpg"
                  />
                  <div className="w-full pl-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Eleanor Fant</p>
                      <Rating
                        size={14}
                        readonly={true}
                        SVGstyle={{ display: "inline" }}
                        initialValue={4.5}
                      />
                    </div>
                    <p className="text-xs text-gray-400">July 14, 2023</p>
                    <p className="text-gray-600 mt-4">
                      So I said lurgy dropped a clanger Jeffrey bugger cuppa
                      gosh David blatant have it, standard A bit of how's your
                      father my lady absolutely.
                    </p>
                  </div>
                </div>
                <div className="w-full flex bg-gray-200 px-10 py-5 rounded-sm mt-6">
                  <img
                    className="w-12 h-12 rounded-full"
                    src="/teacher-2.jpg"
                  />
                  <div className="w-full pl-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Shahnewaz Sakil</p>
                      <Rating
                        size={14}
                        readonly={true}
                        SVGstyle={{ display: "inline" }}
                        initialValue={4.5}
                      />
                    </div>
                    <p className="text-xs text-gray-400">July 17, 2023</p>
                    <p className="text-gray-600 mt-4">
                      So I said lurgy dropped a clanger Jeffrey bugger cuppa
                      gosh David blatant have it, standard A bit of how's your
                      father my lady absolutely.
                    </p>
                  </div>
                </div>
                {data?.course.comments.map((item) => (
                  <div className="w-full flex bg-gray-200 px-10 py-5 rounded-sm mt-6">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={item.userPhoto}
                    />
                    <div className="w-full pl-4">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{item.userName}</p>
                        <Rating
                          size={14}
                          readonly={true}
                          SVGstyle={{ display: "inline" }}
                          initialValue={item.raiting}
                        />
                      </div>
                      <p className="text-xs text-gray-400">{item.date}</p>
                      <p className="text-gray-600 font-bold text-sm mt-4">
                       {item.comment}
                      </p>
                      <p className="text-gray-600 mt-1">
                       {item.comment}
                      </p>
                    </div>
                  </div>
                ))}
                <p className="text-xl font-semibold mt-14">Write a Review</p>
                {/* <div className="w-full flex space-x-6 mt-10">
                  <input
                    placeholder="Your Name"
                    className="border w-full py-4 bg-gray-200 rounded-sm text-sm px-5 outline-blue-500"
                  />
                  <input
                    placeholder="Your Email"
                    className="border w-full py-4 bg-gray-200 rounded-sm text-sm px-5 outline-blue-500"
                  />
                </div> */}
                <div className="w-full flex space-x-6 mt-5">
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Review Title"
                    className="border w-full py-4 bg-gray-200 rounded-sm text-sm px-5 outline-blue-500"
                  />
                </div>
                <div className="mt-5 flex items-center space-x-3">
                  <p className="text-sm text-gray-400 mt-1">Raiting :</p>
                  <Rating
                    size={14}
                    SVGstyle={{ display: "inline" }}
                    initialValue={0}
                    onPointerMove={onPointerMove}
                  />
                </div>
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Review Summary"
                  className="w-full h-40 bg-gray-200 mt-5 text-sm p-5 outline-blue-500"
                ></textarea>
                <button
                  onClick={() => createComment()}
                  className="mt-5 text-white px-5 py-4 rounded-md bg-blue-700"
                >
                  Submit Review
                </button>{" "}
              </>
            )}
            {tab === "members" && (
              <>
                <div className="w-full py-2 bg-gray-200 rounded-md grid grid-cols-7">
                  <div className="col-span-3 pl-4 py-3 flex items-center border-r border-gray-400">
                    <img
                      className="w-20 h-20 rounded-full"
                      src="/teacher-3.jpg"
                    />
                    <div className="ml-4">
                      <p className="font-bold">Shahnewaz Sakil</p>
                      <p className="text-sm text-gray-600">Engineer</p>
                    </div>
                  </div>
                  <div className="col-span-4 py-3 flex items-center justify-around">
                    <div>
                      <p className="text-sm font-bold">07</p>
                      <p className="text-gray-600">Courses</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold">05</p>
                      <p className="text-gray-600">Reviw</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold">3.00</p>
                      <p className="text-gray-600">Raiting</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-span-2 border rounded-lg shadow-lg py-20 px-5">
          <div className="w-full h-60">
            <img
              className="w-full h-full object-contain"
              src={data?.course?.photoUrl}
            />
          </div>
          <p className="text-2xl font-bold mt-7">$32.00</p>
          <div className="flex items-center space-x-2 py-3 border-b border-gray-300 mt-2">
            <IoHomeOutline color="blue" />
            <p className="font-semibold">Instructor :</p>
            <p className="text-gray-600 ">{data?.user?.name}</p>
          </div>
          <div className="flex items-center space-x-2 py-3 border-b border-gray-300">
            <LuBook color="blue" />
            <p className="font-semibold">Lessons :</p>
            <p className="text-gray-600 ">35</p>
          </div>
          <div className="flex items-center space-x-2 py-3 border-b border-gray-300">
            <FaRegClock color="blue" />
            <p className="font-semibold">Duration :</p>
            <p className="text-gray-600 ">8 Weeks</p>
          </div>
          <div className="flex items-center space-x-2 py-3 border-b border-gray-300">
            <FiUser color="blue" />
            <p className="font-semibold">Duration :</p>
            <p className="text-gray-600 ">8 Weeks</p>
          </div>
          <div className="flex items-center space-x-2 py-3 border-b border-gray-300">
            <GrLanguage color="blue" />
            <p className="font-semibold">Language :</p>
            <p className="text-gray-600 ">English</p>
          </div>
          {token && role === "student" && !find && (
            <button
              onClick={() => enrollCourse()}
              className="w-full py-3 mt-9 mx-auto bg-blue-500 rounded-md text-white hover:shadow-lg hover:bg-white hover:text-blue-500 border-blue-500 duration-200"
            >
              Enroll
            </button>
          )}
          {token && role === "student" && find && (
            <button
              onClick={() => releaseCourse()}
              className="w-full py-3 mt-9 mx-auto bg-red-500 rounded-md text-white hover:shadow-lg hover:bg-white hover:text-blue-500 border-blue-500 duration-200"
            >
              Leave
            </button>
          )}
          {token &&
            role === "teacher" &&
            userData._id === data?.course?.user && (
              <button
                onClick={() => deleteCourse()}
                className="w-full py-3 mt-9 mx-auto bg-red-500 rounded-md text-white hover:shadow-lg hover:bg-white hover:text-blue-500 border-blue-500 duration-200"
              >
                Delete Course
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default page;
