"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MainMng = () => {
  const [photoBig, setPhotoBig] = useState();
  const [photoSmall, setPhotoSmall] = useState();

  const addBigPhoto = async() => {
    const formData = new FormData();
    formData.append("image", photoBig);

    try {
      const response = await axios.post(
        "https://educal-api.onrender.com/main/big",
        formData
      );
      toast.success('Eklendi', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  const addSmallPhoto = async() => {
    const formData = new FormData();
    formData.append("image", photoSmall);

    try {
      const response = await axios.post(
        "https://educal-api.onrender.com/main/small",
        formData
      );
      toast.success('Eklendi', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="w-full">
      <div className="flex mt-36">
        <img className="w-1/2" src="main-image.png" />
        <div className="flex flex-col items-start justify-start pl-10">
          <p className="text-white">
            Website'deki bu section içerisindeki resimleri değiştirmek için
            kullanabilirsiniz. Lütfen aşağıda belirtilen formatta resim
            yükleyiniz.
          </p>
          <div className="flex w-full justify-center space-x-5 mt-5">
            <div className="w-56 h-72 bg-gray-400 flex flex-col justify-center">
              <input
                onChange={(e) => setPhotoBig(e.target.files[0])}
                className="text-xs"
                type="file"
              />
              <button onClick={()=> addBigPhoto()} className="bg-blue-500 w-28 h-8 rounded-sm mx-auto mt-5 text-white">Ekle</button>
            </div>
            <div className="w-44 h-52 bg-gray-400 flex flex-col justify-center">
            <input
                onChange={(e) => setPhotoSmall(e.target.files[0])}
                className="text-xs"
                type="file"
              />
              <button onClick={()=> addSmallPhoto()} className="bg-blue-500 w-28 h-8 rounded-sm mx-auto mt-5 text-white">Ekle</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMng;
