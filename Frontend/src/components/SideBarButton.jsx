import React from 'react';

const SideBarButton = ({ img, text, onClick }) => {
  return (
    <div className="button-container flex gap-4 items-center cursor-pointer p-3">
      <img src={img} className="w-[20px] h-[20px] " />
      <span className="  font-medium "> {text}</span>
    </div>
  );
};

export default SideBarButton;
