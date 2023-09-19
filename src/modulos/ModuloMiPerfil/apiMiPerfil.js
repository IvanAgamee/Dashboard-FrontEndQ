import axios from 'axios';
import { api } from '../../boot/axios.js';

const getUserInfoById = async (id) => {
  try {
    const response = await api.get(`usuario/getUserById?id=${id}`);
    return response.data?.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const createUsuarios = async (data) => {
  try {
    const response = await api.post('usuario/crudUser', data);
    return response.data;
  } catch (error) {
      console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

export default {
 getUserInfoById,
 createUsuarios
}
