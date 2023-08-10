import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import { getFollowingPosts } from '../helpers/user.helpers';
import Post from '../components/Post';
const DashBoard = () => {
  const [allPosts, setAllPosts] = useState();
  console.log(allPosts);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));

    getFollowingPosts(token, setAllPosts);
  }, []);
  return (
    <div className="flex h-full">
      <div className="w-[300px] h-[full]"></div>
      <SideBar />
      <div className="flex flex-col items-center  grow  p-20 gap-10 ">
        {allPosts && allPosts.flat(2).map((e) => <Post {...e} />)}
      </div>
    </div>
  );
};

export default DashBoard;
