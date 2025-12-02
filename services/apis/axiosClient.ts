import axios from 'axios';
import { config } from '../config';

export const axiosClient = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
});

