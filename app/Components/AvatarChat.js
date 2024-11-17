'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';

export default function Component() {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="fixed cursor-pointer top-96 right-5 z-[100000000000]">
      <div className={`  transition-all duration-300 ease-in-out ${isMinimized ? 'w-14' : 'max-w-sm'}`}>
        <div className="flex items-center justify-between p-4">
          {!isMinimized && (
            <span className="text-gray-900 bg-white p-1 rounded-xl font-medium mr-4">
                স্যার, কিভাবে সহযোগিতা করতে পারি?
            </span>
          )}
          
          <div className="relative flex-shrink-0">
            {/* Avatar Image */}
            <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white">
               <Link target='_blank' href={'tel:01639-147270'}>
               <Image
                src="https://i.ibb.co.com/G0hCYcP/Whats-App-Image-2024-11-17-at-16-43-48-d3e0b3fd.jpg"
                alt="Profile"
                height={100}
                width={100}
              />
               </Link> 
             
            </div>
            
            {/* Active Status Indicator */}
            <div className="absolute -right-0.5 -top-0.5">
              <div className="relative h-3 w-3">
                {/* Core dot */}
                <div className="absolute h-3 w-3 rounded-full bg-emerald-500" />
                
                {/* Spreading effect layers */}
                <div className="absolute h-3 w-3 animate-[ping_2s_ease-in-out_infinite] rounded-full bg-emerald-500 opacity-75" />
                <div className="absolute h-3 w-3 animate-[ping_2.5s_ease-in-out_infinite] rounded-full bg-emerald-500 opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Minimize/Expand Button */}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          aria-label={isMinimized ? "Expand question" : "Minimize question"}
        >
          
            <Minus className="h-4 w-4 text-gray-600" />
          
        </button>
      </div>
    </div>
  )
}