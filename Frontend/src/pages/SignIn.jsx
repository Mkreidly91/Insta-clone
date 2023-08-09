import React, { useState } from 'react';
import ContactInput from '../components/CustomInput/ContactInput';
import instaLogo from '../assets/images/Instagram_logo.svg';
import { logIn } from '../helpers/auth.helpers';
import { set } from 'react-hook-form';
const initialState = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [inputState, setInputState] = useState(initialState);
  const [errors, setErrors] = useState('');
  console.log(errors);
  const { email, password } = inputState;

  function onChange(e) {
    const { value, name } = e.target;
    setInputState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSignIn() {
    const { res, message, errorMessages } = await logIn(inputState);
    console.log(errorMessages);
    if (errorMessages) {
      setErrors(errorMessages[0]);
      return;
    } else if (message) {
      setErrors(message);
      return;
    }
    console.log(res);
  }

  console.log(email, password);
  return (
    <div className="page-wrapper h-full flex flex-col justify-center items-center">
      <div className="signIn-container flex flex-col items-center gap-5 insta-border  h-fit p-10">
        <div className="logo-container flex place-content-center">
          <img className="w-[175px]" src={instaLogo} alt="" />
        </div>
        <div className="form-container flex flex-col gap-5">
          <ContactInput
            label="Email"
            name="email"
            type="text"
            onChange={onChange}
            value={email}
            className={'w-[300px]'}
          />
          <ContactInput
            label="password"
            name="password"
            type="password"
            onChange={onChange}
            value={password}
            className={'w-[300px]'}
          />
        </div>
        <div
          onClick={() => handleSignIn()}
          className="sign-in bg-insta-blue mt-5 p-2 rounded text-center text-white w-full"
        >
          Sign In
        </div>
        <div className="error font-normal text-red-700 text-sm">{errors}</div>
      </div>
      <div className="sign-up mt-10 insta-border p-10 w-[382px] text-center">
        Don't have an account? <span className="color-insta-blue">Sign up</span>
      </div>
    </div>
  );
};

export default SignIn;
