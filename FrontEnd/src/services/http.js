/* eslint-disable no-undef */
import axios from 'axios';
import { getTokenValue } from '../utils/common';
class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1/`,
      timeout: 10000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getTokenValue()}`,
      },
    });
  }
}

const http = new Http().instance;
export default http;
