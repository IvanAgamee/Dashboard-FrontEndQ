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

export default {
  getModulos, getMaterias, createMaterias, getMateriasByProgramaId
}
