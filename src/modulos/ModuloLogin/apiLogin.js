import axios from 'axios';
import { api } from '../../boot/axios.js';

const loginAuth = async (data) => {
  try {
    const response = await api.post('usuario/login', data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}


export default {
  loginAuth
}
