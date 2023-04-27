import axios from 'axios';

import { getUserTokenId } from '../firebase';

export const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  timeout: 2000,
  withCredentials: true,
});

http.interceptors.request.use(async config => {
  const idToken = await getUserTokenId();

  if (idToken) {
    config.headers.Authorization = `Bearer ${idToken}`;
  }
  return config;
});
