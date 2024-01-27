import { api } from '../../boot/axios.js';

const getFileImage = async (pathFile, filename) => {
  const data = {
   "pathFile": pathFile,
   "filename": filename
   }  
  try {
    const response = await api.post('main/getFileFromStorage',data);
    return response;
  } catch (error) {
    throw error;
  }
}

export default {
    getFileImage
  }
  