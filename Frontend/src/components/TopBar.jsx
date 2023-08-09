import React from 'react';

const TopBar = ({ following, className }) => {
  const icon = (src, name, onClick) => {
    return (
      <div className="flex flex-col gap-2 w-[100px]  w-fit h-auto ">
        <img
          className="rounded-full  "
          src={'https://picsum.photos/200'}
          alt=""
        />
        <span className="">{'rando'}</span>
      </div>
    );
  };

  let arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(icon());
  }
  return (
    <div className="flex  absolute z-[-1]  right-0 top-32 transform -translate-x-1/2 -translate-y-1/2  h-fit gap-2 text-center  overflow-scroll appearance-none ">
      {arr}
    </div>
  );
};

export default TopBar;
