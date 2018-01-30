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

/*----------删除分类接口--------*/
export const category_delete = (id="")=>{
	return axios.post("/category/delete", {id});
};

/*---------添加分类----------*/
export const category_add = (data={})=>{
	return axios.post("/category/add", data);
};

/*---------获取分类详情--------*/
export const category_detail = (id="")=>{
	return axios.post("/category/detail", {id})
};

/*---------编辑分类----------*/
export const category_edit = (data={})=>{
	return axios.post("/category/edit", data);
};

/*----------获取考试列表---------*/
export const exam_list = (data={})=>{
	return axios.post("/exam/list", data);
};