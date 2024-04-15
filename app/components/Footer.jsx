import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa6";

const Footer = () => {
  const footerData = {
    company: [
      "About",
      "Courses",
      "Events",
      "Instructor",
      "Career",
      "Become a Teacher",
      "Contact",
    ],
    platform: [
      "Browse Library",
      "Library",
      "Partners",
      "News & Blogs",
      "FAQs",
      "Tutorials",
    ],
  };

  return (
    <div className="w-full pt-20 lg:pt-48 pb-16 lg:pb-24 bg-[#0E1133]">
      <div className="w-full lg:container mx-auto grid grid-cols-1 lg:grid-cols-4 px-3 lg:px-32">
        <div className="pr-0 lg:pr-24">
          <img src="/logo-2.png" />
          <p className="text-gray-400 text-sm mt-5">
            Great lesson ideas and lesson plans for ESL teachers! Educators can
            customize lesson plans to best.
          </p>
          <div className="flex space-x-2 items-center mt-2 lg:mt-0">
            <div className="w-10 h-10 bg-[#285DA1] rounded-md flex justify-center items-center cursor-pointer hover:bg-[#0E1133] hover:border-2 border-[#285DA1] duration-300">
              <FaFacebookF color="white" />
            </div>
            <div className="w-10 h-10 bg-[#03A9F4] rounded-md flex justify-center items-center cursor-pointer hover:bg-[#0E1133] hover:border-2 border-[#03A9F4] duration-300">
              <FaTwitter color="white" />
            </div>
            <div className="w-10 h-10 bg-[#D2173F] rounded-md flex justify-center items-center cursor-pointer hover:bg-[#0E1133] hover:border-2 border-[#D2173F] duration-300">
              <FaPinterestP color="white" />
            </div>
          </div>
        </div>
        <div className="pl-0 lg:pl-10 mt-7 lg:mt-0">
          <p className="text-white font-bold text-lg mb-3">Company</p>
          {footerData.company.map((item, index) => (
            <p key={index} className="text-gray-500 mt-1">{item}</p>
          ))}
        </div>
        <div className="pl-0 lg:pl-2 mt-7 lg:mt-0">
          <p className="text-white font-bold text-lg mb-4">Platform</p>
          {footerData.platform.map((item, index) => (
            <p key={index} className="text-gray-500 mt-1">{item}</p>
          ))}
        </div>
        <div className="mt-7 lg:mt-0">
          <p className="text-white font-bold text-lg">Subscribe</p>
          <div className="flex items-center mt-3">
            <input type="email" placeholder="Your email address" className="text-xs pl-5 w-3/4 lg:w-56 h-16 lg:h-12"/>
            <button className="bg-blue-500 h-16 lg:h-12 w-16 lg:w-12 flex justify-center items-center">
              <FaArrowRightLong color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
