<template>
	<el-table size="small" v-bind:data="list">
		<el-table-column
		prop="id"
		label="id"
		></el-table-column>
		<el-table-column
		prop="name"
		label="分类名称"
		></el-table-column>
		<el-table-column
		prop="subject"
		label="所属科目"
		></el-table-column>
		<el-table-column
		prop="created_time"
		label="创建时间"
		></el-table-column>
		<el-table-column
		label="操作"
		></el-table-column>
	</el-table>
</template>

<script>
	import { category_list } from "../modules/api.js";
	export default{
		data(){
			return{
				search: {
					pageNo: 1,
					pageSize: 10,
					subject: this.subject
				},
				list: []
			}
		},
		props: ["subject"],
		methods: {
			/*--------获取分类列表--------*/
			getList(){
				category_list(this.search).then(data=>{
					if(data.code == "0"){
						this.list = data.result.list;
					};
				});
			}
		},
		mounted(){
			this.getList();
		},
		watch:{
			$route(to,from){
				console.log(to);
				this.search = {
					pageNo: 1,
					pageSize: 10,
					subject: to.params.subject
				};
				this.getList();
			}
		}
	}
</script>

<style>
	
</style>