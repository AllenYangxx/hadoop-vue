import axios from 'axios';

let base = '';
var qs = require('qs');
// export const requestLogin = params => { 
//     var url = base + '/api/login';
//     return axios.post(url, qs.stringify(params)).then(res => res.data); 
// };
export const requestLogin = params => { return axios.post(`${base}/login`,params).then(res=>res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };