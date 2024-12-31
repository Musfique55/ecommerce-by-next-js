import { Building2, MapPin, Phone, Clock } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-sm space-y-4 mt-32">
      {/* Store Name */}
      <div className="flex items-center gap-2">
        <Building2 className="text-[#0977AB]" size={20} />
        <h2 className="text-lg font-medium">Jamuna Future Park</h2>
      </div>

      {/* Address */}
      <div className="flex items-start gap-2">
        <MapPin className="text-[#0977AB] flex-shrink-0 mt-1" size={20} />
        <p className="text-gray-600"> Shop-016C, Level-4, Block- A 
        JAMUNA FUTURE PARK</p>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-2">
        <Phone className="text-[#0977AB]" size={20} />
        <p className="text-gray-600">(808) 555-0111</p>
      </div>

      {/* Hours */}
      <div className="flex items-center gap-2">
        <Clock className="text-[#0977AB]" size={20} />
        <p className="text-gray-600">11AM - 8PM (Thu - Tue)</p>
      </div>

      {/* Closed Notice */}
      <div className="pt-2 border-t border-gray-300">
        <p className="text-gray-600">
          <span className="font-medium">Wednesday</span>
          <span className="ml-2">Closed</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Link className='flex-1' target='_' href={'https://www.google.com/maps/search/?api=1&query=Jamuna+Future+Park+Level+4,+Block+C+Shop+19C+KA+244,+Kuril+Progoti+Soroni+1229'}>
        <button className=" bg-[#0977AB] text-white py-2 px-4 rounded  transition-colors">
          Show Map
        </button>
        </Link>
        
        <button className=" bg-[#0977AB] text-white py-2 px-4 rounded  transition-colors">
          Show Details
        </button>
      </div>
    </div>
  )
}

