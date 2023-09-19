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

  export default {
    getModulos
  }