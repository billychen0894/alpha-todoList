import axios from 'axios';

const baseURL = 'https//todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${baseURL}/login`, {
      username,
      password,
    });
    const { authToken } = data;

    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (err) {
    console.error('[Login Failed]: ', err);
  }
};

export const signup = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(`${baseURL}/signup`, {
      username,
      email,
      password,
    });

    const { authToken } = data;

    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (err) {
    console.error('[Register Failed]: ', err);
  }
};

export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${baseURL}/test-token`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data.success;
  } catch (err) {
    console.error('[Check Permission Failed: ]', err);
  }
};
