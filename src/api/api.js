import axios from 'axios';

let base = '';
var qs = require('qs');
export const requestLogin = params => { 
    var url = base + '/login';
    return axios.get(url, {
        params:{
            params
        }
    }
    )
    .then((response) =>{          //这里使用了ES6的语法
        console.log(response)       //请求成功返回的数据
    }).catch((error) =>{
        alert(error)
        console.log(error)       //请求失败返回的数据
    }); 
};

// export const requestLogin = params => { 
//     return axios.post(`${base}/login`,params).then(res=>res.data); 
// };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };