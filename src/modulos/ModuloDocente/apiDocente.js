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

  const getDocentes = async () => {
    try {
      const response = await api.get('docente/getDocentes');
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const getDocenteById = async (data) => {
    try {
      const response = await api.post('docente/getDocenteById',data);
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

const getDocentesByCarreraId = async (data) => {
  try {
    const response = await api.post('docente/getDocentesByCarreraId', data);
    return response.data;
  } catch (error) {
    console.log(error)
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const createDocente = async (data) => {
  try {
    const response = await api.post('docente/crudDocente', data);
    console.log(response)
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al crear el docente');
    throw error;
  }
}

export default {
  getModulos, getDocentes, createDocente, getDocentesByCarreraId, getDocenteById
}
