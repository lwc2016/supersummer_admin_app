<template>
	<el-form v-bind:model="form" v-bind:rules="rules" label-width="180px" ref="form">
		<el-row>
			<el-col :span="16">
				<el-form-item label="分类名称:" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-form-item label="所属科目:" prop="subject">
			<el-radio-group v-model="form.subject">
				<el-radio label="kuaiji" name="subject">会计</el-radio>
				<el-radio label="shuifa" name="subject">税法</el-radio>
				<el-radio label="jingji" name="subject">经济</el-radio>
				<el-radio label="caiwu"  name="subject">财务管理</el-radio>
				<el-radio label="shenji" name="subject">审计</el-radio>
				<el-radio label="fengkong"  name="subject">风险控制</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item>
			<el-button size="small" type="primary" v-on:click="handleSubmit('form')">提交</el-button>
			<el-button size="small" type="danger" v-on:click="handleReset">清除</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	import { category_add } from "../modules/api.js";
	import router from "../modules/router.js";
	export default{
		data(){
			return {
				form: {
					name: "",
					subject: ""
				},
				rules:{
					name:[{required: true, message: "请添加分类名称！"}],
					subject: [{required: true, message: "请选择所属分类！"}]
				}
			}
		},
		methods: {
			handleSubmit(formName){
				this.$refs[formName].validate(valid=>{
					if(valid) this.addCategory();
				});
			},
			handleReset(){
				this.form = {
					name: "",
					subject: ""
				};
			},
			addCategory(){
				category_add(this.form).then(data=>{
					if(data.code == "0"){
						this.$message({type: "success", message: "分类添加成功！"});
						router.push({path: `/backoffice/category/${this.form.subject}`});
					}else{
						this.$message({type: "error", message: data.errorMsg});
					}
				});
			}
		}
	}
</script>

<style>
	
</style>