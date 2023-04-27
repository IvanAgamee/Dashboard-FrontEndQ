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

  const getMaterias = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/materia/getMaterias');
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const createMateria = async (data) => {
    try{
      const response = await axios.post('http://localhost:9000/api/materia/crudMateria', data)
      return response.data;
    }catch (error) {
      console.log('Se produjo un error al crear el docente');
      throw error;
    }
  }

  export default {
    getModulos, getMaterias, createMateria
  }
