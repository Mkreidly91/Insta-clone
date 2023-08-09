import React, { useState } from 'react';
import ContactInput from '../components/CustomInput/ContactInput';
import instaLogo from '../assets/images/Instagram_logo.svg';
import { signUp } from '../helpers/auth.helpers';
import { useNavigate, Link } from 'react-router-dom';

const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
};

const SignUp = () => {
  const [inputState, setInputState] = useState(initialState);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  console.log(errors);

  function onChange(e) {
    const { value, name } = e.target;
    setInputState((prev) => ({ ...prev, [name]: value }));
  }

  async function handlesignUp() {
    const { res, message, errorMessages } = await signUp(inputState);
    console.log(errorMessages);
    if (errorMessages) {
      setErrors(errorMessages[0]);
      return;
    } else if (message) {
      setErrors(message);
      return;
    }
    navigate('/');
  }

  const { name, username, email, password } = inputState;
  return (
    <div className="page-wrapper h-full flex flex-col justify-center items-center">
      <div className="signUp-container flex flex-col items-center gap-5 insta-border  h-fit p-10">
        <div className="logo-container flex place-content-center">
          <img className="w-[175px]" src={instaLogo} alt="" />
        </div>
        <div className="form-container flex flex-col gap-5">
          <ContactInput
            label="Full Name"
            name="name"
            type="text"
            onChange={onChange}
            value={name}
            className={'w-[300px]'}
          />
          <ContactInput
            label="Username"
            name="username"
            type="text"
            onChange={onChange}
            value={username}
            className={'w-[300px]'}
          />
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
          onClick={() => handlesignUp()}
          className="sign-in bg-insta-blue mt-5 p-2 rounded text-center text-white w-full"
        >
          Sign Up
        </div>
        <div className="error font-normal text-red-700 text-sm">{errors}</div>
      </div>
      <div className="sign-up mt-10 insta-border p-10 w-[382px] text-center">
        Already have an account?
        <Link to="/">
          <span className="color-insta-blue cursor-pointer">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
