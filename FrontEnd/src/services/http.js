import axios from 'axios';
import { getCookieValue } from '../utils/constant.js';

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:5000/api/v1/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookieValue('jwt')}`,
      },
    });
  }
}

const http = new Http().instance;
export default http;
