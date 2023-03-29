import axios from 'axios';
export const axios_api=  axios.create({baseURL: 'http://localhost:8000/api/'});
axios_api.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';