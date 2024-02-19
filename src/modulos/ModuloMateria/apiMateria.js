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

const getMaterias = async () => {
  try {
    const response = await api.get('materia/getMaterias');
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getMateriasByProgramaId = async (data) => {
  try {
    const response = await api.post('materia/getMateriasByProgramaId', data);
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const createMaterias = async (data) => {
  try {
    const response = await api.post('materia/crudMateria', data);
    return response.data;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getMateriaById = async (id) => {
  try {
    const response = await api.get(`materia/getMateriaById?materiaId=${id}`);
    return response.data?.data;
  } catch (error) {
      console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getAreasById = async (id) => {
  try {
    const response = await api.get(`materia/getAreasByProgramaId?programaId=${id}`);
    return response.data?.data;
  } catch (error) {
      console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

const getEspecialidadesById = async (id) => {
  try {
    const response = await api.get(`especialidad/getEspecialidadesByProgramaId?programaId=${id}`);
    return response.data?.data;
  } catch (error) {
      console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

export default {
  getModulos, getMaterias, createMaterias, getMateriasByProgramaId, 
  getMateriaById, getAreasById, getEspecialidadesById
}
