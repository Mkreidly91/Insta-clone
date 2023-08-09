import React, { useState } from 'react';
import logo from '../assets/images/Instagram_logo.svg';
import home from '../assets/icons/Home-fill.svg';
import search from '../assets/icons/Search.svg';
import explore from '../assets/icons/FindPeople-Fiil.svg';
import reels from '../assets/icons/Reels.svg';
import messages from '../assets/icons/SharePosts.svg';
import notifications from '../assets/icons/ActivityFeed.svg';
import post from '../assets/icons/NewPosts.svg';

import SideBarButton from './SideBarButton';

const SideBar = ({ className }) => {
  return (
    <div
      className={`sideBar-container w-[300px] fixed  bg-white  pl-5 pt-10 insta-border border-b-0 h-full flex flex-col  ${className}`}
    >
      <div className="sideBar-content flex flex-col gap-10 ">
        <div className="logo-container ">
          <img className="w-[125px]  " src={logo} alt="" />
        </div>
        <div className="controls flex flex-col  gap-4">
          <SideBarButton img={home} text="Home" />
          <SideBarButton img={search} text="Search" />
          <SideBarButton img={explore} text="Explore" />
          <SideBarButton img={reels} text="Reels" />
          <SideBarButton img={messages} text="Messages" />
          <SideBarButton img={notifications} text="Notifications" />
          <SideBarButton img={post} text="Create" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
