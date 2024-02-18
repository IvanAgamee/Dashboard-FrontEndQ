import { api } from '../../boot/axios.js';

const getSeccionByProgramaId = async (data) => {
  try {
    const response = await api.get(`seccion/getSeccionByProgramaId?programaId=${data}`);
    return response.data;
  }
  catch (error) {
    throw error;
  }
}

const getSeccionById = async (data) => {
  try{
    const response = await api.get(`seccion/getSeccionById?seccionId=${data}`)
    return response.data;
  }
  catch (e){
    throw e;
  }
}
const createSeccion = async (data) => {
  try {
    const response = await api.post('seccion/crudSeccion', data);
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const createObjetosMasvos = async (data) => {

  try {
    const response = await api.post('seccion/crudObjetoMasivo',data);
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const borrarObjetos = async (data) => {
  try {
    const response = await api.delete('seccion/borrarObjetos', {
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

export default {
  getSeccionByProgramaId, createSeccion, getSeccionById, createObjetosMasvos, borrarObjetos
}
