import axios from 'axios';

const getModulos = async () => {
  try {
    const response = await api.get('modulo/getModulos');
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getCarreras = async () => {
  try {
    const response = await api.get('carrera/getCarreras');
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getCarrerasByDepartment = async (data) => {
  try {
    const response = await api.post('carrera/getCarrerasByDepartment', data);
    return response.data;
  }
  catch (error) {
    throw error;
  }
}

const createCarreras = async (data) => {
  try {
    const response = await api.post('carrera/crudCarrera', data);
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

export default {
  getModulos, getCarreras, getCarrerasByDepartment, createCarreras
}
