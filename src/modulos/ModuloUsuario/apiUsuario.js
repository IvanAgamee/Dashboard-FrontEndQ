import { api } from '../../boot/axios.js'

const getModulos = async () => {
    try {
      const response = await api.get('modulo/getModulos');
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const getUsuarios = async () => {
    try {
      const response = await api.get('usuario/getUsers');
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const getUsuariosById = async () => {
    try {
      const response = await api.get('usuario/getUserById');
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const createUsuarios = async (data) => {
    try {
      const response = await api.post('usuario/crudUser', data);
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const getDptos = async () => {
    try {
      const response = await api.get('departamento/getDepartamentos');
      return response.data.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }


  const getRoles = async () => {
    try {
      const response = await api.get('usuario/getRoles');
      return response.data.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  const changePassword = async (data) => {
    try {
      const response = await api.post('usuario/changePassword', data);
      return response.data;
    } catch (error) {
        console.log('Se produjo un error al obtener los datos');
      throw error;
    }
  }

  export default {
    getModulos, getUsuarios, createUsuarios, getDptos, getRoles,
    changePassword
  }