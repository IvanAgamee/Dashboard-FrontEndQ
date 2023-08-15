import { api } from '../../boot/axios.js';

const getTotalUsers = async () => {
  try {
    const response = await api.get('grafica/getTotalUsuarios');
    return response.data.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getTotalDocentes = async () => {
    try {
      const response = await api.get('grafica/getTotalDocentes');
      return response.data.data;
    } catch (error) {
      console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const getTotalDocentesById = async (id) => {
    try {
      const response = await api.get(`grafica/getTotalDocentesByCarreraID?carreraId=${id}`);
      return response.data.data;
    } catch (error) {
      console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const getTotalMaterias = async () => {
    try {
      const response = await api.get('grafica/getTotalMaterias');
      return response.data.data;
    } catch (error) {
      console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const getTotalMateriasById = async (id) => {
    try {
      const response = await api.get(`grafica/getTotalMateriasByCarreraId?carreraId=${id}`);
      return response.data.data;
    } catch (error) {
      console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const getTotalCarreras = async () => {
    try {
      const response = await api.get('grafica/getTotalCarreras');
      return response.data.data;
    } catch (error) {
      console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const getTotalComunidades = async () => {
    try {
      const response = await api.get('grafica/getTotalComunidades');
      return response.data.data;
    } catch (error) {
      console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }


export default {
    getTotalUsers,
    getTotalComunidades,
    getTotalCarreras,
    getTotalMateriasById,
    getTotalMaterias,
    getTotalDocentesById,
    getTotalDocentes
}
