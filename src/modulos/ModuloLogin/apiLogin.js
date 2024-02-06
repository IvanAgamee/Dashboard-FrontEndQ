import axios from 'axios';
import { api } from '../../boot/axios.js';

const loginAuth = async (data) => {
  try {
    const response = await api.post('usuario/login', data);
    return response.data;
  } catch (error) {
    console.log(error)
    return error.response.data;
  }
}

const correoCambioContrasena = async (email) => {
  try {
    const data = {
      username : email
    }
    const response = await api.post('usuario/forgottenPasswordMail', data);
    return response.data;
  }
  catch (error) {
    console.log(error)
    return error.response.data;
  }
}


export default {
  loginAuth,
  correoCambioContrasena
}
