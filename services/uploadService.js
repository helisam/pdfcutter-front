import { axiosUpload } from '@/services/config.js';

//'content-type': 'multipart/form-data'
let config = { headers: { responseType: 'arraybuffer', 'Content-Type': 'multipart/formData' } };

let configForZip = {
  responseType: 'arraybuffer',
  contentType: 'application/force-download',
  'Content-Disposition': 'attachment',
};

axiosUpload.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response.status === 401) {
      localStorage.removeItem('access_Token');
      localStorage.removeItem('refresh_Token');
      localStorage.setItem('Error', 'Token vencido, por favor fazer login novamente.');
      router.push('/login');
    }
    return Promise.reject(error);
  },
);


export default {
  Upload: {
    getAll: () => {
      return axiosUpload.get('file-process');
    },
    upload: (formData) => {
      return axiosUpload.post('/upload', formData, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      )
      // .then(response => {
      //     console.log(response)
      //     return response;
      // }
      // );
    },
    Download: {
      getZip: (nrinscrideempregador) => {
        return axiosUpload.get('/evtremuns/download-zip/' + nrinscrideempregador, configForZip);
      },
    },
  }
}