import axios from 'axios';

const baseUrl = 'https//todo-list.alphacamp.io/api';

const axiosInstance = axios.create({ baseURL: baseUrl });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);

export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/Todos`);
    return res.data.data;
  } catch (err) {
    console.error('[Get Todos Failed]: ', err);
  }
};
export const createTodo = async (payload) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/Todos`, { ...payload });
    return res.data;
  } catch (err) {
    console.error('[Create Todo Failed]: ', err);
  }
};
export const patchTodo = async (payload) => {
  const { id, title, isDone } = payload;
  try {
    const res = await axiosInstance.patch(`${baseUrl}/Todos/${id}`, {
      title,
      isDone,
    });
    return res.data;
  } catch (err) {
    console.error('[Update Todo Failed: ]', err);
  }
};
export const deleteTodo = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/Todos/${id}`);
    return res.data;
  } catch (err) {
    console.error('[Delete Todo Failed]: ', err);
  }
};
