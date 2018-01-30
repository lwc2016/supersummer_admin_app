<template>
	<el-container class="container">
		<el-aside class="aside" width="201px">
			<el-menu
			background-color="#545c64"
			text-color="#ffffff"
			active-text-color="#ffd04b"
			class="aside-nav"
			v-bind:router="true"
			>
				<el-menu-item index="1" route="/backoffice">
					<i class="el-icon-menu"></i>
					<span slot="title">首页</span>
				</el-menu-item>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>试题分类管理</span>
					</template>
					<el-menu-item index="2-1" route="/backoffice/category/kuaiji">会计分类</el-menu-item>
					<el-menu-item index="2-2" route="/backoffice/category/shuifa">税法分类</el-menu-item>
					<el-menu-item index="2-3" route="/backoffice/category/caiwu">财务管理分类</el-menu-item>
					<el-menu-item index="2-4" route="/backoffice/category/jingji">经济法分类</el-menu-item>
					<el-menu-item index="2-5" route="/backoffice/category/shenji">审计分类</el-menu-item>
					<el-menu-item index="2-6" route="/backoffice/category/fengkong">风险控制分类</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-aside>
		<el-container>
			<el-header class="header">
				<el-dropdown>
					<i class="el-icon-setting"></i>
					<span>刘文超</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>查看</el-dropdown-item>
						<el-dropdown-item>退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-header>
			<el-main class="content">
				<router-view class="main-content"></router-view>
			</el-main>
			<el-footer class="footer">星韵管理系统 &copy;2018 </el-footer>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		data(){
			return {}
		},
		methods:{
			handleSelected(path){
				console.log(path);
			}
		}
	}
</script>

<style lang="less" scoped>
.container{
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
}
.aside{
	height: 100%;
}
.aside-nav{
	width: 100%;
	height: 100%;
}
.header{
	background-color: #ffffff;
	height: 50px!important;
	text-align: right;
	line-height: 50px;
}
.content{
	width: 100%;
	height: 100%;
	padding: 10px!important;
	padding-bottom: 0!important;
	overflow: scroll;
}
.main-content{
	background-color: #ffffff;
	padding: 10px;
}
.footer{
	width: 100%;
	height: 40px!important;
	background-color: #ffffff;
	text-align: center;
	line-height: 40px;
	font-size: 12px;
	color: #606266;
}
</style>