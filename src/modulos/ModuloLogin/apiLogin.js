import axios from 'axios';

const loginAuth = async (data) => {
    try {
      const response = await axios.post('http://localhost:9000/api/usuario/login', data);
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al crear el docente');
      throw error;
    }
  }

  export default {
    loginAuth
  }