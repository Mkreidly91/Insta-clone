import React from 'react';

const SideBarButton = ({ img, text, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`button-container flex gap-4 items-center cursor-pointer p-3 ${className}`}
    >
      <img src={img} className="w-[20px] h-[20px] " />
      <span className="  font-medium "> {text}</span>
    </div>
  );
};

export default SideBarButton;
