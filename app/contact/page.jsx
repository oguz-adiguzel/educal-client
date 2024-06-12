'use client'
import axios from "axios";
import React, { useState } from "react";
import { CiLocationOn, CiMail, CiPhone, CiShare2 } from "react-icons/ci";
import { FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";

const page = () => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [message, setMessage] = useState()

  const sendMail = async() => {
    try{
      const response = await axios.post('https://educal-api.onrender.com/contact', {
        name:name,
        email:email,
        message:message
      })
    }catch(error){

    }
  };

  return (
    <div className="w-full">
      <title>Educal - Contact</title>
      <div className="w-full contact-title flex items-center">
        <div className="container mx-auto">
          <h1 className="text-white text-6xl font-bold mt-2">Contact</h1>
          <p className="text-white mt-2">Home . Contact</p>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 py-10 lg:py-32 lg:pl-36">
        <div className="flex flex-col items-start px-10">
          <div>
            <p className="text-4xl font-bold">Get Intouch</p>
            <p className="text-base text-gray-400">
              Have a question or just want to say hi? We'd love to hear from
              you.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-9 w-full mt-7">
            <input
              className="bg-gray-200 h-12 rounded-sm px-3 text-sm"
              type="text"
              placeholder="Your Name"
              onChange={(e)=> setName(e.target.value)}
            />
            <input
              className="bg-gray-200 h-12 rounded-sm px-3 text-sm"
              type="text"
              placeholder="Your Email"
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>
          {/* <input
            className="bg-gray-200 w-full h-12 rounded-sm px-3 text-sm mt-5"
            type="text"
            placeholder="Subject"
          /> */}
          <textarea
            className="bg-gray-200 w-full h-40 rounded-sm text-sm mt-5 p-3"
            placeholder="Enter Your Message"
            onChange={(e)=> setMessage(e.target.value)}
          ></textarea>
          <div className="flex items-center mt-5">
            <input type="checkbox" />
            <p className="text-sm ml-4 font-semibold">
              I agree to the Terms & Conditions
            </p>
          </div>
          <button onClick={()=> sendMail()} className="bg-blue-600 text-sm text-white py-3 px-6 rounded-[3px] mt-5 hover:shadow-xl duration-300">
            Send your message
          </button>
        </div>
        <div className="flex justify-center items-start relative">
          <img
            className="absolute -z-50 top-8 right-32"
            src="contact-shape-2.png"
          />
          <img
            className="absolute left-32 bottom-3 -z-50"
            src="contact-shape-1.png"
          />
          <img
            className="absolute right-0 bottom-44"
            src="contact-shape-3.png"
          />
          <div className="w-2/3 mt-10 lg:mt-0 lg:w-1/2 pl-7 pr-8 py-20 bg-white shadow-md">
            <div className="flex items-center space-x-2">
              <CiLocationOn size={22} color="blue" />
              <p className="text-lg font-semibold">New York Office</p>
            </div>
            <p className="ml-8 text-sm text-gray-500">
              Maypole Crescent 70-80 Upper St Norwich NR2 1LT
            </p>

            <div className="flex items-center space-x-2 mt-9">
              <CiMail size={22} color="blue" />
              <p className="text-lg font-semibold">Email us directly</p>
            </div>
            <p className="ml-8 text-sm text-gray-500">support@educal.com</p>
            <p className="ml-8 text-sm text-gray-500">info@educal.com</p>

            <div className="flex items-center space-x-2 mt-9">
              <CiPhone size={22} color="blue" />
              <p className="text-lg font-semibold">Phone</p>
            </div>
            <p className="ml-8 text-sm text-gray-500">+(426) 742 26 44</p>
            <p className="ml-8 text-sm text-gray-500">+(224) 762 442 32</p>

            <div className="flex items-center space-x-2 mt-9">
              <CiShare2 size={22} color="blue" />
              <p className="text-lg font-semibold">Follow Us</p>
            </div>
            <div className="flex space-x-3 pl-7 mt-3">
              <div className="w-11 h-11 rounded-sm bg-gray-100 hover:bg-[#285da1] duration-300 cursor-pointer flex justify-center items-center group">
                <div className="block group-hover:hidden">
                  <FaFacebookF size={20} color="darkblue" />
                </div>
                <div className="hidden group-hover:block">
                  <FaFacebookF size={20} color="white" />
                </div>
              </div>
              <div className="w-11 h-11 rounded-sm bg-blue-50 hover:bg-[#03a9f4] duration-300 cursor-pointer flex justify-center items-center group">
                <div className="block group-hover:hidden">
                  <FaTwitter size={20} color="lightblue" />
                </div>
                <div className="hidden group-hover:block">
                  <FaTwitter size={20} color="white" />
                </div>
              </div>
              <div className="w-11 h-11 rounded-sm bg-red-100 hover:bg-[#d8163f] duration-300 cursor-pointer flex justify-center items-center group">
                <div className="block group-hover:hidden">
                  <FaPinterestP size={20} color="red" />
                </div>
                <div className="hidden group-hover:block">
                  <FaPinterestP size={20} color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
