import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';

import { getFollowingPosts } from '../helpers/user.helpers';
import Post from '../components/Post';

const DashBoard = () => {
  const [allPosts, setAllPosts] = useState();
  const [token, setToken] = useState();

  // console.og(allPosts);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    getFollowingPosts(token, setAllPosts);
  }, []);

  return (
    <div className="flex h-full">
      <div className="w-[300px] h-[full]"></div>
      <SideBar token={token} />
      {/* <Search token={token} /> */}
      <div className="flex flex-col items-center  grow  p-20 gap-10 ">
        {allPosts &&
          allPosts
            .flat(2)
            .map((e, index) => <Post key={index} {...e} token={token} />)}
      </div>
    </div>
  );
};

export default DashBoard;
