import axios from 'axios';
const base_url = 'http://127.0.0.1:8000/api/';
async function logIn({ email, password }) {
  try {
    const res = await axios.post(`${base_url}login`, {
      email,
      password,
    });
    return { res };
  } catch (error) {
    const {
      response: {
        data: { message, errors },
      },
    } = error;

    if (errors) {
      const errorMessages = Object.keys(errors).map((key) => {
        const firstError = errors[key][0];
        if (firstError) {
          return firstError;
        }
      });
      return { errorMessages };
    }
    return { message };
  }
}
async function signUp() {}
async function signOut() {}
async function refresh() {}

export { logIn, signUp, signOut, refresh };
