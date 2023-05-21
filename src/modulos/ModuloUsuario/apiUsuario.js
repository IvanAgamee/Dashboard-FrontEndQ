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

  const getUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/usuario/getUsers');
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const createUsuarios = async (data) => {
    try {
      const response = await axios.post('http://localhost:9000/api/usuario/crudUser', data);
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  export default {
    getModulos, getUsuarios, createUsuarios
  }