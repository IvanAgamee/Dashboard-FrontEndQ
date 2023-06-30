import axios from 'axios';
import { api } from '../../boot/axios.js';

const loginAuth = async (data) => {
    try {
      const response = await api.post('usuario/login', data);
      return response.data;
    } catch (error) {
       throw error;
    }
  }


  export default {
    loginAuth
  }
