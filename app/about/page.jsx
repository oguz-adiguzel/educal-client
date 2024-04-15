"use client";
import React from "react";
import { TiTick } from "react-icons/ti";
import YouTube from "react-youtube";
import { GiConfirmed, GiWorld } from "react-icons/gi";
import { BsJournalBookmark } from "react-icons/bs";
import { PiUsersThreeLight, PiStudentLight } from "react-icons/pi";
import Head from "next/head";
import Iframe from 'react-iframe'

const page = () => {
  const student = [
    {
      id: 1,
      src: "student-4.jpg",
    },
    {
      id: 2,
      src: "student-3.jpg",
    },
    {
      id: 3,
      src: "student-2.jpg",
    },
    {
      id: 4,
      src: "student-1.jpg",
    },
  ];

  const opts = {
    height: "320",
    width: "550",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <div className="w-full">
      <title>Educal - About</title>

      <div className="w-full courses-title flex items-center">
        <div className="container mx-auto">
          <h1 className="text-white text-6xl font-bold mt-2">About</h1>
          <p className="text-white mt-2">Home . About</p>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-2 gap-x-28">
        <div className="relative flex justify-end py-36">
          <img className="w-1/2 rounded-md" src="about.jpg" />
          <img
            className="w-56 rounded-md absolute bottom-14 right-64"
            src="about-banner.jpg"
          />
          <div className="absolute bottom-16 right-10 ">
            <div className="flex -space-x-3">
              {student.map((item) => (
                <img
                  key={item.id}
                  className="rounded-full border-2 border-white w-10"
                  src={item.src}
                />
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Join over <span className="font-bold text-black"> 4,000+ </span>{" "}
              students
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-4xl font-bold">Achieve Your</h1>
          <h1 className="text-4xl font-bold">Goals With Educal</h1>
          <p className="text-sm text-gray-400 pr-96 mt-4">
            Lost the plot bobby such a fibber bleeding bits and bobs don't get
            shirty with me bugger all mate chinwag super pukka william barney,
            horse play buggered.
          </p>
          <div className="flex items-center space-x-3 mt-5">
            <TiTick color="green" />
            <p className="font-bold">Upskill your organization.</p>
          </div>
          <div className="flex items-center space-x-3 mt-3">
            <TiTick color="green" />
            <p className="font-bold">Access more then 100K online courses</p>
          </div>
          <div className="flex items-center space-x-3 mt-3">
            <TiTick color="green" />
            <p className="font-bold">Learn the latest skills</p>
          </div>
          <button className="px-7 py-3 border-2 border-gray-300 rounded-sm shadow-md text-sm bg-white mt-8 font-semibold">
            Apply Now
          </button>
        </div>
      </div>
      <p className="text-center font-bold text-xl mt-16">
        Trusted by 100 world's best companies
      </p>
      <div className="container mx-auto flex justify-around px-20 mt-10">
        <img src="brand-1.png" />
        <img src="brand-2.png" />
        <img src="brand-3.png" />
        <img src="brand-4.png" />
        <img src="brand-5.png" />
        <img src="brand-1.png" />
      </div>
      <div className="w-full h-[780px] about-section mt-36">
        <div className="container mx-auto grid grid-cols-2 py-32">
          <div className="pl-40 pt-10">
            <p className="text-4xl font-bold text-white">Student</p>
            <p className="text-4xl font-bold text-white">Community Feedback</p>
            <p className="text-xl text-white mt-3">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            <div className="flex space-x-5 mt-12">
              {student.map((item) => (
                <img
                  key={item.id}
                  className="rounded-full w-16"
                  src={item.src}
                />
              ))}
            </div>
          </div>
          <div className="pl-40">
            <YouTube videoId="y9LkICwfpF0" opts={opts} onReady={onReady} />
            <div className="w-[550px] py-10 bg-white flex justify-center items-center space-x-5">
              <div className="bg-[#0fa0dd] w-16 h-16 rounded-full flex justify-center items-center">
                <GiConfirmed size={24} color="white" />
              </div>
              <div className="w-96">
                <p className="text-xl font-bold">Course Outcome</p>
                <p className="text-gray-400 mt-2">
                  Faff about A bit of how's your father getmate cack codswallop
                  crikey argy-bargy cobblers lost his bottle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-2 px-40 py-32">
        <div className="flex flex-col justify-center px-20">
          <p className=" text-blue-400 font-semibold">Why Choses Me</p>
          <p className="text-4xl font-bold mt-2">Tools For Teachers And</p>
          <p className="text-4xl font-bold mt-1">Learners</p>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            Oxford chimney pot Eaton faff about blower blatant brilliant, bubble
            and squeak he legged it Charles bonnet arse at public school
            bamboozled.
          </p>
          <button className="self-start mt-5 bg-blue-600 text-white text-sm px-7 py-4 rounded-[4px] hover:shadow-xl duration-300">
            Join for free
          </button>
        </div>
        <div className="flex justify-center relative">
          <img
            className="absolute -z-10 top-32 right-11"
            src="why-shape-green.png"
          />
          <img className="absolute -z-20 top-36 " src="why-shape-pink.png" />
          <img className="absolute top-36 right-12" src="why-shape-line.png" />
          <img
            className="absolute bottom-10 right-24"
            src="why-shape-dot.png"
          />
          <img src="why.png" />
        </div>
      </div>
      <div className="container mx-auto pb-20">
        <p className="text-4xl font-bold text-center">We Are Proud</p>
        <p className="text-gray-500 text-center mt-2">
          You don't have to struggle alone, you've got our assistance and help.
        </p>
        <div className="flex justify-around px-32 mt-14">
          <div>
            <PiUsersThreeLight color="#fc4d93" size={36} />
            <p className="text-xl font-bold mt-2">345421</p>
            <p className="text-gray-500">Students Enrolled</p>
          </div>
          <div>
            <BsJournalBookmark color="#ff8f21" size={32} />
            <p className="text-xl font-bold mt-2">2485</p>
            <p className="text-gray-500">Total Courses</p>
          </div>
          <div>
            <PiStudentLight color="#14c0da" size={36} />
            <p className="text-xl font-bold mt-2">24085</p>
            <p className="text-gray-500">Online Learners</p>
          </div>
          <div>
            <GiWorld color="#516eff" size={36} />
            <p className="text-xl font-bold mt-2">24085</p>
            <p className="text-gray-500">Online Learners</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
