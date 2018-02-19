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
/*----------获取全部分类----------*/
export const category_all = (subject="")=>{
	return axios.post("/category/all", {subject});
};



/*---------获取分类详情--------*/
export const category_detail = (id="")=>{
	return axios.post("/category/detail", {id})
};
/*---------编辑分类----------*/
export const category_edit = (data={})=>{
	return axios.post("/category/edit", data);
};


/*----------获取试卷列表---------*/
export const paper_list = (data={})=>{
	return axios.post("/paper/list", data);
};
/*---------删除试卷接口-------------*/
export const paper_delete = (id="")=>{
	return axios.post("/paper/delete", {id});
};
/*---------添加试卷接口-------------*/
export const paper_add = (data={})=>{
	return axios.post("/paper/add", data);
};
/*---------编辑试卷接口-----------*/
export const paper_edit = (data={})=>{
	return axios.post("/paper/edit", data);
};
/*---------获取试卷详情----------------*/
export const paper_detail = (id={})=>{
	return axios.post("/paper/detail", {id});
};



/*---------获取题目列表--------------*/
export const question_list = (data={})=>{
	return axios.post('/question/list', data);
};
/*---------删除题目------------------*/
export const question_delete = (id="")=>{
	return axios.post("/question/delete", {id});
};
/*---------添加题目----------------*/
export const question_add = (data={})=>{
	return axios.post("/question/add", data);
};
/*---------获取题目详情--------------*/
export const question_detail = (id="")=>{
	return axios.post("/question/detail", {id});
};
/*---------编辑题目----------------*/
export const question_edit = (data={})=>{
	return axios.post("/question/edit", data);
};

/*---------获取章节列表------------*/
export const chapter_list = (data={})=>{
	return axios.post("/chapter/list", data)
};

