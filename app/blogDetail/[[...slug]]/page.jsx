"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";

const page = () => {
  
  const [blogData, setBlogData] = useState()

  const params = useParams();

  const dateString = blogData?.createdAt;
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString();

  console.log('blogData', blogData);

  const getBlogData = async () => {
    try {
      let response = await axios.get(
        `https://educal-api.onrender.com/blog/${params.slug[0]}`
      );
      setBlogData(response.data.blog)
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getBlogData();
  }, []);

  return (
    <div className="w-full">
      <title>Educal - Blog</title>
      <div className="w-full blog-detail-title flex items-center">
        <div className="container mx-auto flex flex-col items-start">
          <p className="bg-[#30A820] text-white font-semibold text-xs px-2 py-1 rounded-[4px]">
            Art & Design
          </p>
          <h1 className="text-white text-6xl font-bold mt-2">
            {blogData?.title}
          </h1>
          <p className="text-white mt-2">
            Home . Blog . {blogData?.title}
          </p>
          <div className="flex items-center space-x-12 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
                <img
                  className="w-full h-full rounded-full"
                  src="/educal-pp.png"
                />
              </div>
              <p className="text-sm text-white">Educal - Admin</p>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <CiClock2 size={22} />
              <p className="text-sm">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 mx-auto py-10 px-10">
        <img className="w-2/3 mx-auto" src={blogData?.photoUrl} />
        <p className="mt-10 text-gray-500">
          {blogData?.text}
        </p>
        {/* <p className="mt-5 text-gray-500">
          Horse play it's all gone to pot codswallop easy peasy mush knees up
          down the pub jolly good nice one tosser it's your round lurgy, I
          vagabond barmy off his nut only a quid so I said is gosh Charles blow
          off, pardon me chip shop Richard spiffing skive off bleeding get
          stuffed mate porkies amongst the full monty. Daft burke you
        </p>
        <p className="mt-5 text-gray-500">
          Some dodgy chav car boot blower starkers bonnet tickety-boo no biggie
          cheesed off, Oxford bloke fantastic the wireless bevvy cobblers
          chancer give us a bell, bleeder jolly good hanky panky do one gormless
          matie boy. Pear shaped my good sir I cobblers at public school quaint
          tickety-boo crikey bits and bobs, wellies bugger all mate golly gosh
          brolly matie boy fanny around chimney pot cracking goal my lady, bodge
          so I said spiffing posh the full monty don't get shirty with me no
          biggie. Brolly grub blimey victoria sponge blag nancy boy don't get
          shirty with me skive off bobby burke in my flat bog-standard, easy
          peasy golly gosh up the duff show off show off pick your nose and blow
          off gosh a brilliant that what a load of rubbish.
        </p> */}
      </div>
    </div>
  );
};

export default page;
