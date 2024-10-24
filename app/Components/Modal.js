import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({onClose, content, title }) => {
 
  return (
   <>
   {
     <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center z-[9999] items-center px-4">
     <dialog
       open
       className="w-full max-w-[450px] p-5 rounded-2xl flex flex-col justify-center bg-white text-black sm:w-[90%] md:w-[450px]"
     >
       <div className="flex justify-between mb-5 items-center">
         <h3 className="font-medium text-lg">{title}</h3>
         <div className="bg-[#dc2626] py-[2px]  rounded-sm">
           <IoClose className="cursor-pointer text-white" onClick={onClose} />
         </div>
       </div>
       <hr />
       <div className="mt-3">{content}</div>
     </dialog>
   </div>
   
   }
    
    </>
  );
};

export default Modal;
