import axios from 'axios';
import { api } from '../../boot/axios.js';

const getModulos = async () => {
  try {
    const response = await api.get('modulo/getModulos');
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getComunidades = async () => {
  try {
    const response = await api.get('comunidad/getComunidades');
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getComunidadById = async (comunidadId) => {
  try {
    const response = await api.get('comunidad/getComunidadById', {
      params: {
        comunidadId: comunidadId
      }
    });
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getComunidadByCarreraId = async (carreraId) => {
  try {
    const response = await api.get('comunidad/getComunidadByCarreraId', {
      params: {
        carreraId: carreraId
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
};



const createComunidades = async (data) => {
  try {
    const response = await api.post('comunidad/crudComunidad', data);
    console.log(response)
    return response.data;
  } catch (error) {
    console.log('error');
    throw error;
  }
}

export default {
  getModulos, getComunidades, createComunidades, getComunidadByCarreraId, getComunidadById
}
