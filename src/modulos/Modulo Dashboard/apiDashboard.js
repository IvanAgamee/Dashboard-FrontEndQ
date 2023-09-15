import { api } from '../../boot/axios.js';

const getTotalUsers = async () => {
  try {
    const response = await api.get('main/getTotalUsuarios');
    return response.data.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getTotalDocentes = async () => {
    try {
      const response = await api.get('main/getTotalDocentes');
      return response.data.data;
    } catch (error) {
      console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const getTotalDocentesById = async (id) => {
    try {
      const response = await api.get(`main/getTotalDocentesByProgramaID?programaId=${id}`);
      return response.data.data;
    } catch (error) {
      console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const getTotalMaterias = async () => {
    try {
      const response = await api.get('main/getTotalMaterias');
      return response.data.data;
    } catch (error) {
      console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const getTotalMateriasById = async (id) => {
    try {
      const response = await api.get(`main/getTotalMateriasByProgramaId?programaId=${id}`);
      return response.data.data;
    } catch (error) {
      console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const getTotalProgramas = async () => {
    try {
      const response = await api.get('main/getTotalProgramas');
      return response.data.data;
    } catch (error) {
      console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const getTotalComunidades = async () => {
    try {
      const response = await api.get('main/getTotalComunidades');
      return response.data.data;
    } catch (error) {
      console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }


export default {
    getTotalUsers,
    getTotalComunidades,
    getTotalProgramas,
    getTotalMateriasById,
    getTotalMaterias,
    getTotalDocentesById,
    getTotalDocentes
}
