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

const getProgramas = async () => {
  try {
    const response = await api.get('programa/getProgramas');
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getProgramasByDepartment = async (data) => {
  try {
    const response = await api.post('programa/getProgramasByDepartment', data);
    return response.data;
  }
  catch (error) {
    throw error;
  }
}

const createProgramas = async (data) => {
  try {
    const response = await api.post('programa/crudPrograma', data);
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

export default {
  getModulos, getProgramas, getProgramasByDepartment, createProgramas
}
