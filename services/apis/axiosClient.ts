import axios from 'axios';
import { config } from '../config';

export const axiosClient = axios.create({
  baseURL: config.EXPO_PUBLIC_API_BASE_URL,
  timeout: config.EXPO_PUBLIC_API_TIMEOUT,
});

