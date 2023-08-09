import React, { useState } from 'react';
import ContactInput from '../components/CustomInput/ContactInput';
import instaLogo from '../assets/images/Instagram_logo.svg';

const initialState = {
  email: '',
  password: '',
};
const SignIn = () => {
  const [inputState, setInputState] = useState({
    ema,
  });
  return (
    <div className="page-wrapper h-full flex flex-col justify-center items-center">
      <div className="signIn-container flex flex-col items-center gap-5 insta-border  h-fit p-10">
        <div className="logo-container flex place-content-center">
          <img className="w-[175px]" src={instaLogo} alt="" />
        </div>
        <div className="form-container flex flex-col gap-5">
          <ContactInput
            name="email"
            label="Email"
            type="text"
            className={'w-[300px]'}
          />
          <ContactInput
            name="password"
            label="password"
            type="password"
            className={'w-[300px]'}
          />
        </div>
        <div className="sign-in bg-insta-blue mt-5 p-2 rounded text-center text-white w-full">
          Sign In
        </div>
      </div>
      <div className="sign-up mt-10 insta-border p-10 w-[382px] text-center">
        Don't have an account? <span className="color-insta-blue">Sign up</span>{' '}
      </div>
    </div>
  );
};

export default SignIn;
