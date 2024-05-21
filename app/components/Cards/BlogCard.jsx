import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { CiClock2 } from "react-icons/ci";
import { toast } from "react-toastify";

const BlogCard = ({ item, page }) => {
  const dateString = item.createdAt;
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString();

  const router = useRouter();

  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(
        `https://educal-api.onrender.com/blog/${id}`
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
      }, 400);
    } catch (error) {
      console.log("error", error);
      toast.error(response.data.message, {
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

  return (
    <div className="border overflow-hidden bg-white shadow-md rounded-md pb-7 flex flex-col items-center">
      <img
        className="w-full h-64 hover:scale-110 duration-300 rounded-t-md"
        src={item.photoUrl}
      />
      <div className="w-[85%] mx-auto py-1 mt-5 flex flex-col items-start">
        <p className="text-xs font-semibold bg-[#E7F5FC] text-[#0FA0DD] py-1 px-2 rounded-sm hover:cursor-pointer hover:text-white hover:bg-[#0FA0DD] duration-200">
          {item.tag}
        </p>
        <p
          onClick={() => router.push(`/blogDetail/${item?.slug}`)}
          className="text-xl font-bold mt-2 hover:text-blue-700 cursor-pointer"
        >
          {item.title}
        </p>
        <div className="w-full flex justify-between items-center mt-3">
          <div className="flex items-center space-x-1">
            <img className="w-8 rounded-full" src="educal-pp.png" />
            <p className="text-sm text-gray-500 font-semibold">
              Educal - Admin
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <CiClock2 size={22} />
            <p className="text-xs">{formattedDate}</p>
          </div>
        </div>
      </div>
      {page === "admin" && (
        <button
          onClick={() => deleteBlog(item._id)}
          className="w-64 h-10 rounded-full bg-red-500 text-white mt-5"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default BlogCard;
