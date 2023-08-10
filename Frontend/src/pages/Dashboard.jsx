import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import postsIcon from '../assets/icons/Posts.svg';
import { getFollowingPosts, getUserPosts } from '../helpers/user.helpers';
import Post from '../components/Post';
import explore from '../assets/icons/Guides.svg';
const DashBoard = () => {
  const [allPosts, setAllPosts] = useState();
  const [myPosts, setMyPosts] = useState();
  const [token, setToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [page, setPage] = useState({
    feed: true,
    myPosts: false,
  });
  useEffect(() => {
    const { token, image_url, name, username } = JSON.parse(
      localStorage.getItem('user')
    );

    setToken(token);
    setUserInfo({ image_url, name, username });
    getFollowingPosts(token, setAllPosts);
  }, []);

  return (
    <div className="flex h-full">
      <div className="w-[300px] h-[full]"></div>
      <SideBar token={token} />

      <div className="flex flex-col items-center  grow  p-20 gap-10  ">
        <div className="buttons flex gap-10  mb-10 cursor-pointer">
          <img
            src={explore}
            onClick={() => {
              setPage({ feed: true, myPosts: false });
            }}
            alt=""
          />
          <img
            src={postsIcon}
            onClick={() => {
              getUserPosts(token, setMyPosts);
              setPage({ feed: false, myPosts: true });
            }}
            alt=""
          />
        </div>
        {page.feed &&
          allPosts &&
          allPosts
            .flat(2)
            .map((e, index) => <Post key={index} {...e} token={token} />)}
        {page.myPosts &&
          myPosts &&
          myPosts.map((e, index) => {
            const {
              id: post_id,
              user_id: id,
              image_url: post_image_url,
              text,
              count,
            } = e;
            const { image_url, name, username } = userInfo;
            const postData = {
              username,
              image_url,
              id,
              post_id,
              post_image_url,
              text,
              token,
              isLiked: false,
              count,
            };
            return <Post key={index} token={token} {...postData} user />;
          })}
      </div>
    </div>
  );
};

export default DashBoard;
