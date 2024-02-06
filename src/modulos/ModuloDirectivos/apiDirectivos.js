import { data } from 'autoprefixer';
import { api } from '../../boot/axios.js';

const getDirectivos = async (id) => {
    try {
        const response = await api.get(`administrativo/getAdministrativosByProgramaId?programaId=${id}`);
        return response.data;
    } catch (error) {
        console.log("Se produjo un error al obtener los datos");
        throw error;
    }
    };

const getDirectivo = async (_programaId, _puestoId) => {
    try {
        const data = {
            programaId: _programaId,
            puestoId: _puestoId,
        };
        const response = await api.post(`administrativo/getAdministrativo`,data);
        return response.data;
    } catch (error) {
        console.log("Se produjo un error al obtener los datos");
        throw error;
    }
    }

const crudDirectivo = async (data) => {
    try {
        const response = await api.post("administrativo/crudAdministrativo", data);
        return response.data;
    } catch (error) {
        console.log("Se produjo un error al obtener los datos");
        throw error;
    }
    };

export default {
    getDirectivos,
    getDirectivo,
    crudDirectivo,
    };