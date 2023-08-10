import React, { useEffect, useState } from 'react';
import { followUser } from '../helpers/user.helpers';

const UserButton = ({ id, username, name, image_url, isFollowing, token }) => {
  useEffect(() => {
    setFollow(isFollowing);
  }, []);
  const [follow, setFollow] = useState();

  return (
    <div className="button-container flex gap-4 items-center cursor-pointer p-3">
      <img src={image_url} className="w-[50px] h-[50px] rounded-full " />
      <div className="flex flex-col gap-2">
        <span className="font-semibold"> {username}</span>
        <span className="font-medium"> {name}</span>
      </div>
      <div
        onClick={() => {
          followUser(token, id);
          setFollow((prev) => !prev);
        }}
        className="button w-fit p-2 bg-blue cursor-pointer"
      >
        {follow ? 'Unfollow' : 'follow'}
      </div>
    </div>
  );
};

export default UserButton;
