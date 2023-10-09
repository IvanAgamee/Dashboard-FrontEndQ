import { api } from '../../boot/axios.js'

const getEspecialidades = async (id) => {
    try {
      const response = await api.get(`especialidad/getEspecialidadesByProgramaId?programaId=${id}`);
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const crudEspecialidad = async (data) => {
    try {
      const response = await api.post('especialidad/crudEspecialidad', data);
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  export default {
    getEspecialidades, crudEspecialidad
  }