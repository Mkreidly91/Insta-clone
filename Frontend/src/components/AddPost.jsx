import React, { useState, useRef } from 'react';
import { addPost } from '../helpers/user.helpers';

const initialState = {
  text: '',
  img: '',
};

const AddPost = ({ setPostPage, token }) => {
  const [state, setState] = useState(initialState);
  const fileInput = useRef();
  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  function onTextChange(e) {
    const { value } = e.target;
    setState((prev) => ({ ...prev, text: value }));
  }

  async function onImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await toBase64(file);
    setState((prev) => ({ ...prev, img: base64 }));
  }
  const { text, img } = state;
  return (
    <div className="image-select-preview flex flex-col justify-center items-center gap-10 min-w-[500px] fixed top-1/2 and left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-insta p-10  rounded-2xl">
      {img ? (
        <img
          src={img}
          alt=""
          className="rounded aspect-square w-[300px] h-[300px]  self-center"
        />
      ) : (
        <div className="selectImage flex items-center justify-center rounded-md bg-black  w-[300px] h-[300px]">
          <span className="text-white">Please select an image</span>
        </div>
      )}

      <input
        ref={fileInput}
        className=" cursor-pointer file-input file-input-bordered file-input-primary w-full max-w-xs  bg-transparent "
        type="file"
        accept="image/*"
        onChange={onImageChange}
      />

      <textarea
        className="rounded-md w-full bg-slate-200 p-3"
        name="text"
        id=""
        cols="30"
        rows="10"
        onChange={onTextChange}
      ></textarea>

      <div className="buttons flex gap-5">
        <span
          onClick={() => {
            addPost(token, { ...state });
          }}
        >
          Create
        </span>
        <span
          onClick={() => {
            setPostPage((prev) => !prev);
          }}
        >
          Cancel
        </span>
      </div>
    </div>
  );
};

export default AddPost;
