import React, { useEffect, useState } from 'react';
import heart from '../assets/icons/ActivityFeed.svg';
import heartFull from '../assets/icons/ActivityFeed-Fiil.svg';
import { likePost } from '../helpers/user.helpers';

const Post = ({
  username,
  image_url,
  id,
  post_id,
  post_image_url,
  text,
  token,
  isLiked,
  type,
  count,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setLikeCount(count);
    setLiked(isLiked);
  }, []);

  return (
    <div className="post-container w-[350px] flex flex-col gap-2">
      <div className="user-info flex items-center gap-3">
        <img className="w-[50px] rounded-full" src={image_url} alt="" />
        <span className="font-semibold">{username}</span>
      </div>
      <div className="post-content">
        <img className="w-full aspect-square rounded-lg" src={post_image_url} />
        <div className="icons flex gap-4 mt-2">
          <img
            src={liked ? heartFull : heart}
            alt=""
            onClick={() => {
              {
                setLiked((prev) => !prev);

                liked
                  ? setLikeCount((prev) => prev - 1)
                  : setLikeCount((prev) => prev + 1);
                likePost({ post_id }, token);
              }
            }}
          />
          <span>{likeCount ? likeCount : ''}</span>
        </div>
        <div className="text-container mt-2">{text}</div>
      </div>
    </div>
  );
};
export default Post;
