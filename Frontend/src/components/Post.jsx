import React, { useState } from 'react';
import heart from '../assets/icons/ActivityFeed.svg';
import heartFull from '../assets/icons/ActivityFeed-Fiil.svg';

const Post = ({ username, image_url, id, post_id, post_image_url, text }) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className="post-container w-[350px] flex flex-col gap-2">
      <div className="user-info flex items-center gap-3">
        <img className="w-[50px] rounded-full" src={image_url} alt="" />
        <span className="font-semibold">{username}</span>
      </div>
      <div className="post-content">
        <img className="w-full aspect-square rounded-lg" src={post_image_url} />
        <div className="icons">
          <img
            src={liked ? heartFull : heart}
            alt=""
            onClick={() => {
              setLiked((prev) => !prev);
              //Call Like post async
            }}
          />
        </div>
        <div className="text-container">{text}</div>
      </div>
    </div>
  );
};
export default Post;
