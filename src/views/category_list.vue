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
		label="所属科目"
		>
			<template slot-scope="scope">{{formatSubject(scope.row.subject)}}</template>
		</el-table-column>
		<el-table-column
		label="创建时间"
		>
			<template slot-scope="scope">{{formatDateTime(scope.row.created_time, "YYYY-MM-DD h:m:s")}}</template>
		</el-table-column>
		<el-table-column
		label="操作"
		>
			<template slot-scope="scope">
				<el-button size="small" type="primary">编辑</el-button>
				<el-button size="small" type="danger" v-on:click="handleDelete(scope.row.id)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	import { formatSubject, formatDateTime } from "../modules/filter.js";
	import { category_list, category_delete } from "../modules/api.js";
	export default{
		data(){
			return{
				search: {
					pageNo: 1,
					pageSize: 10,
					subject: this.subject
				},
				list: [],
				formatSubject: formatSubject,
				formatDateTime: formatDateTime
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
			},
			handleDelete(id){
				this.$alert("此操作将永久删除该分类, 是否继续?","提示", {
					confirmButtonText:"确定",
					cancelButtonText: "取消",
					type:"warning",
					center: true
				}).then(()=>{
					this.deleteCategory(id);
				}).catch(()=>{
					this.$message({type: "info", message: "已取消删除！"});
				});
			},
			deleteCategory(id){
				category_delete(id).then(()=>{
					this.getList();
					this.$message({type: "success", message: "删除成功！"});
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