import axios from 'axios';
import { api } from '../../boot/axios.js';

const getModulos = async () => {
  try {
    const response = await api.get('modulo/getModulos');
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getComunidades = async () => {
  try {
    const response = await api.get('comunidad/getComunidades');
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getComunidadById = async (comunidadId) => {
  try {
    const response = await api.get('comunidad/getComunidadById', {
      params: {
        comunidadId: comunidadId
      }
    });
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getComunidadByProgramaId = async (programaId) => {
  try {
    const response = await api.get('comunidad/getComunidadByProgramaId', {
      params: {
        programaId: programaId
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
};



const createComunidades = async (data) => {
  try {
    const response = await api.post('comunidad/crudComunidad', data);
    console.log(response)
    return response.data;
  } catch (error) {
    console.log('error');
    throw error;
  }
}

const uploadFiles  = async (files, comunidadNombre, programaId) => {
  
  const formData = new FormData();
  formData.append('comunidadNombre', comunidadNombre);

  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }
  
  try {
    const response = await api.post(`comunidad/uploadFiles?programaId=${programaId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.log('Se produjo un error al subir la imagen');
    throw error;
  }
}


export default {
  getModulos, getComunidades, createComunidades, getComunidadByProgramaId, getComunidadById, uploadFiles
}
