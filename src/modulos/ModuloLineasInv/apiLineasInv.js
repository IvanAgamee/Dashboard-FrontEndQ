import { api } from '../../boot/axios.js'

const getLineasDeInv = async (id) => {
    try {
      const response = await api.get(`lineaInvestigacion/getLineasInvByProgramaId?programaId=${id}`);
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const crudLineaInv = async (data) => {
    try {
      const response = await api.post('lineaInvestigacion/crudLineaInv', data);
      return response.data;
    } catch (error) {
        console.log(error)
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  export default {
    getLineasDeInv, crudLineaInv
  }