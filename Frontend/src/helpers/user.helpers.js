import axios from 'axios';

const base_url = 'http://127.0.0.1:8000/api/';

async function getFollowingPosts(token, setPosts) {
  try {
    const response = await axios.get(`${base_url}user/getFollowingPosts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { status, data } = response;
    console.log(response);
    if (status === 200) {
      setPosts(data.res);
    }
  } catch (error) {
    console.log(error);
  }
}

export { getFollowingPosts };
