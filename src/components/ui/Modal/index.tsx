import React, { Dispatch, useEffect, useRef } from "react";

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: any;
}) => {
  const ref: any = useRef();
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="top-0 fixed w-[100vw] h-[100vh] z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-14 w-[50vw] max-h-[80vh]" ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
