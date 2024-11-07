'use client' // Error boundaries must be Client Components
 
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='text-black text-center'>
      <h2 className='text-2xl mb-5'>Something went wrong!</h2>
      <Link href={'/'} className='bg-black text-white px-5 py-2 rounded-full'>Return Home</Link>
    </div>
  )
}