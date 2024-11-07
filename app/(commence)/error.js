'use client' // Error boundaries must be Client Components
 
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='text-black text-center space-y-5'>
      <h2 className='text-2xl'>Something went wrong!</h2>
      <Link href={'/'}>Return Home</Link>
    </div>
  )
}