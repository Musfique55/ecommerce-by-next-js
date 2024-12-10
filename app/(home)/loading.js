'use client'
import { PropagateLoader } from "react-spinners";
export default function Loading() {

  return <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
    <PropagateLoader />
</div>
}

