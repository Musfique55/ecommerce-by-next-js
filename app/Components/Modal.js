import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({onClose, content, title }) => {
 
  return (
   <>
      <div className="modal-overlay lg:h-full w-full mx-auto fixed inset-0 bg-black bg-opacity-50 flex justify-center z-[9999] items-center px-4 ">
        <dialog
          open
          className="w-full max-w-[350px] lg:max-w-[400px] overflow-y-auto max-h-[85vh] p-5 rounded-2xl flex flex-col bg-white text-black sm:w-[80%] md:w-[450px] focus:border-none focus:outline-none"
        >
          {/* Title Section */}
          <div className="mb-5 w-full">
            <div className="flex justify-between items-center w-full">
              <h3 className="font-semibold text-xl"> {title} </h3>
              <div className="bg-[#dc2626] py-[2px] px-2 rounded-sm">
                <IoClose className="cursor-pointer text-white" onClick={onClose} />
              </div>
            </div>
            <hr className="mt-2" />
          </div>

          {/* Content */}
          <div>{content}</div>
        </dialog>
      </div>

    </>
  );
};

export default Modal;
