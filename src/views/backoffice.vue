<template>
	<el-container class="container">
		<el-aside class="aside" width="201px">
			<el-menu
			background-color="#545c64"
			text-color="#ffffff"
			active-text-color="#ffd04b"
			class="aside-nav"
			>
				<el-menu-item index="1">
					<i class="el-icon-menu"></i>
					<span slot="title">首页</span>
				</el-menu-item>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>导航一</span>
					</template>
					<el-menu-item index="2-1">选项1</el-menu-item>
					<el-menu-item index="2-2">选项2</el-menu-item>
					<el-menu-item index="2-3">选项3</el-menu-item>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>导航二</span>
					</template>
					<el-menu-item index="3-1">选项1</el-menu-item>
					<el-menu-item index="3-2">选项2</el-menu-item>
					<el-menu-item index="3-3">选项3</el-menu-item>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>导航三</span>
					</template>
					<el-menu-item index="4-1">选项1</el-menu-item>
					<el-menu-item index="4-2">选项2</el-menu-item>
					<el-menu-item index="4-3">选项3</el-menu-item>
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
			<el-main>
				
			</el-main>
		</el-container>
	</el-container>
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
	width: 100%;
	height: 100%;
}
.aside{
	height: 100%;
}
.aside-nav{
	width: 100%;
	height: 100%;
}
.header{
	background-color: #EBEEF5;
	height: 50px!important;
	text-align: right;
	line-height: 50px;
}
</style>