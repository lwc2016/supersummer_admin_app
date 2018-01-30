import axios from "axios";

/*----------请求拦截器----------*/
axios.interceptors.request.use(function(config){
	config.data.api = config.url;
	config.url = "/do";
	return config;
}, function(error){
	return Promise.reject(error);
});

/*----------响应拦截器---------*/
axios.interceptors.response.use(function(response){
	return response.data;
}, function(error){
	return Promise.reject(error);
});

/*----------用户登录接口--------*/
export const user_login = (data={})=>{
	return axios.post("/user/login", data);
};

/*----------获取分类-----------*/
export const category_list = (data={})=>{
	return axios.post("/category/list", data);
};