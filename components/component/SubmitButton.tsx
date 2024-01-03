import React, { useState } from "react";

interface SubmitButtonProps {
  onClick: () => void;
}

const SubmitButton = ({ onClick }: SubmitButtonProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (!isActive) {
      setIsActive(true);
      onClick();

      setTimeout(() => {
        setIsActive(false);
      }, 3000); // The total animation time until the button resets
    }
  };

  return (
    <div className="flex justify-center items-center h-[100px] bg-gray-100">
      <button
        className={`relative overflow-hidden rounded-full text-white text-md font-semibold shadow-md cursor-pointer transition-all duration-2000 ${
          isActive ? "bg-pink-500" : "bg-blue-500"
        }`}
        onClick={handleClick}
        style={{ width: "160px", height: "50px" }}
      >
        <p
          className={`absolute left-8 right-8 top-1/2 transform -translate-y-1/2 transition-opacity duration-1000 ${
            isActive ? "opacity-0" : "opacity-100"
          }`}
        >
          {isActive ? "Thanks" : "Submit"}
        </p>
        <div
          className={`absolute inset-0 m-auto transition-opacity duration-1000 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
          style={{ width: "50px", height: "50px", transitionDelay: "1000ms" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            className="w-full h-full"
          >
            <path
              fill="transparent"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
              stroke="white"
              strokeWidth="3"
              strokeDasharray="34"
              strokeDashoffset={isActive ? "0" : "34"}
              strokeLinecap="round"
              className={`transition-all duration-500 ${
                isActive ? "delay-1000" : "delay-0"
              }`} // Delay adjusted for the tick
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default SubmitButton;
