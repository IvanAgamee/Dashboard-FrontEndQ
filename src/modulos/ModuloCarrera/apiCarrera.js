import axios from 'axios';

const getModulos = async () => {
  try {
    const response = await axios.get('http://localhost:9000/api/modulo/getModulos');
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getCarreras = async () => {
  try {
    const response = await axios.get('http://localhost:9000/api/carrera/getCarreras');
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getCarrerasByDepartment = async (data) => {
  try {
    const response = await axios.post('http://localhost:9000/api/carrera/getCarrerasByDepartment', data);
    return response.data;
  }
  catch (error) {
    throw error;
  }
}

const createCarreras = async (data) => {
  try {
    const response = await axios.post('http://localhost:9000/api/carrera/crudCarrera', data);
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

export default {
  getModulos, getCarreras, getCarrerasByDepartment, createCarreras
}
