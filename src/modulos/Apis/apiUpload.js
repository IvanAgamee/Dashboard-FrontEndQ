import { api } from '../../boot/axios.js';

const getFileImage = async (pathFile, filename) => {
  const data = {
   "pathFile": pathFile,
   "filename": filename
   }  
  try {
    const response = await api.post('main/getFileFromStorage',data);
    console.log(response)
    return response;
  } catch (error) {
    console.log('Se produjo un error al obtener los datos');
    throw error;
  }
}

export default {
    getFileImage
  }
  