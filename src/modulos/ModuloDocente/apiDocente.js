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

  export default {
    getModulos, getDocentes
  }