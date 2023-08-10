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

    if (status === 200) {
      setPosts(data.res);
    }
  } catch (error) {
    console.log(error);
  }
}

async function likePost({ post_id }, token) {
  try {
    const response = await axios.post(
      `${base_url}user/likePost`,
      { post_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function search(token, search) {
  try {
    const response = await axios.get(`${base_url}user/search/${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function followUser(token, userId) {
  try {
    const response = await axios.post(
      `${base_url}user/followUser`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getUserPosts(token, setUserPosts) {
  try {
    const response = await axios.get(`${base_url}user/getPosts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { status, data } = response;
    console.log(data);
    if (status === 200) {
      setUserPosts(data.posts);
    }
  } catch (error) {
    console.log(error);
  }
}

async function addPost(token, { text, img }) {
  try {
    const response = await axios.post(
      `${base_url}user/addPost`,
      { text, img },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export {
  getFollowingPosts,
  likePost,
  search,
  followUser,
  addPost,
  getUserPosts,
};
