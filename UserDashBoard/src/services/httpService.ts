import axios from 'axios';

const API_BASE_URL = 'https://reqres.in/api';

const httpService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signIn = async (email: string, password: string) => {
  try {
    const response = await httpService.post('/login', { email, password });
    console.log("httpservice",response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
      throw new Error('Invalid email or password');
    }
    throw error;
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const response = await httpService.post('/register', { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
      throw new Error('Email already in use');
    }
    throw error;
  }
};

export const fetchUserData = async (token: string) => {
  const response = await httpService.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
