'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotFound = () => {
  const router = useRouter()
  return (
    <div className='flex flex-col items-center justify-center w-full bg-black h-screen'> 
      <img src='error.png' />
      <p className='text-white text-6xl font-bold mt-20'>Page not found: /error</p>
      <button onClick={()=> router.push('/')} className='text-sm text-white mt-10 px-7 py-3 rounded-sm bg-blue-600'>Back to home</button>
    </div>
  )
}

export default NotFound