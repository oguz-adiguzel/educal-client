'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MainSection = () => {

  const [photos, setPhotos] = useState()

  console.log('photos', photos);

  const getPhoto = async() =>{
    try {
      const response = await axios.get(
        "https://educal-api.onrender.com/main"
      );
      setPhotos(response.data.photo);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
  getPhoto()
  }, [])
  

  return (
    <div className='w-full flex flex-col lg:flex-row justify-center py-3 lg:py-48'>
        <div className='w-full lg:w-2/6 py-10 px-2 lg:px-0 mt-10 lg:mt-0 flex flex-col justify-center items-start'>
            <h1 className='text-4xl lg:text-5xl font-extralight'>Access 2700+</h1>
            <h1 className='text-4xl lg:text-6xl font-extrabold'>Online Tutorial From</h1>
            <h1 className='text-4xl lg:text-6xl font-extrabold'>Top Instructor.</h1>
            <p className='text-lg text-gray-400 pr-10 lg:pr-52 mt-2'>Meet university,and cultural institutions, who'll share their experience</p>
            <button className='bg-[#2b4eff] px-6 py-4 text-white text-sm mt-7 rounded-[3px] hover:shadow-xl duration-300'>View All Course</button>
        </div>
        <div className='w-full lg:w-2/6 py-10 px-3 lg:px-0 flex items-start relative'>
            <div className='w-44 h-44 rounded-full bg-purple-200 absolute right-24 -top-3 -z-10'></div>
            <div className='border-2 border-red-500 w-80 h-80 rounded-full absolute right-0 top-64 -z-10'></div>
            <img className='absolute -left-6 bottom-0 element -z-10' src='hero-1-dot.png' />
            {
              photos?.filter((item)=> item.name === 'big').map((item)=>(
                <img className='w-[90%] mx-auto lg:w-2/3 rounded-tl-[50px] rounded-br-[50px]' src={item.photoUrl} />
              ))
            }
            {
              photos?.filter((item)=> item.name === 'small').map((item)=>(
                <img className='w-1/3 hidden lg:block rounded-tr-[50px] rounded-bl-[50px] mt-14 ml-10' src={item.photoUrl} />
              ))
            }
            
            <div className='pl-7 w-72 py-4 shadow-lg rounded-sm bg-white absolute right-12 lg:right-0 bottom-0 lg:bottom-16 animate-bounce'>
              <p className='text-sm text-gray-600'>Tomorrow is our</p>
              <p className='text-base font-bold'>“When I Grow Up” Spirit Day!</p>
            </div>
        </div>
    </div>
  )
}

export default MainSection