<template>
	<div class="container">
		<h4 class="title">星韵管理系统登录</h4>
		<el-form class="form">
			<el-form-item size="small">
				<el-input type="size" placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item size="small">
				<el-input type="password" placeholder="密码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button class="submit" type="primary">登录</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
	export default {
		data(){
			return {}
		}
	}
</script>

<style lang="less">
	.container{
		margin: 0 auto;
		margin-top: 100px;
		width: 340px;
		background-color: #F2F6FC;
		border-radius: 6px;
	}
	.title{
		line-height: 50px;
		padding-left: 20px;
		color: #606266;
	}
	.form{
		padding-left: 20px;
		padding-right: 20px;
		padding-bottom: 5px;
	}
	.submit{
		width: 100%;
	}
</style>