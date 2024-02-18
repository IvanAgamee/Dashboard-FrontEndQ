import { api } from '../../boot/axios';

const getIconsByPromgramaId =  async (data) => {
  try{
    const response = await api.post('main/getIconosByProgramaId',data);
    return response.data;
  }catch(error){
    return error;
  }
};

export default {
  getIconsByPromgramaId
}
