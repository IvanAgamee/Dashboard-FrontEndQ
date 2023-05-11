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

  const getDocentes = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/docente/getDocentes');
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const createDocente = async (data) => {
    try {
      const response = await axios.post('http://localhost:9000/api/docente/crudDocente', data);
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al crear el docente');
      throw error;
    }
  }

  export default {
    getModulos, getDocentes, createDocente
  }