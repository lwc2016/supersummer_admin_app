<template>
    <div class="container">
        <div class="form-area">
            <h4 class="title">星韵管理系统登录</h4>
            <el-form class="form" v-bind:model="form" v-bind:rules="rules" status-icon ref="loginForm">
                <el-form-item size="small" prop="username">
                    <el-input type="size" placeholder="用户名" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item size="small" prop="password">
                    <el-input type="password" placeholder="密码" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button class="submit" type="primary" v-on:click="handleSubmitForm('loginForm')">登录</el-button>
                </el-form-item>
                <div class="error">
                    <p v-if="errorMsg"><i class="el-icon-error"></i><span>{{errorMsg}}</span></p>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
    import { user_login } from "../modules/api.js";
    import router from "../modules/router.js";
    export default {
        data() {
            return {
            	form:{
            		username: "",
            		password: ""
            	},
            	rules:{
    				username:[{
    					required: true, message: "请输入用户名"
    				}],
    				password:[{
    					required: true, message: "请输入密码"
    				}]
            	},
                errorMsg: ""
            }
        },
        methods: {
        	handleSubmitForm(formName){
    			this.$refs[formName].validate((valid)=>{
                    if(valid){
                        user_login(this.form).then(data=>{
                            if(data.code == 0) return router.push({path: "/backoffice"});
                            this.errorMsg = data.errorMsg;
                        });
                    }
    			});
        	}
        }
    }
</script>
<style lang="less" scoped>
.container{
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.form-area {
    margin-top: -100px;
    width: 340px;
    background-color: #F2F6FC;
    border-radius: 6px;
}

.title {
    line-height: 50px;
    padding-left: 20px;
    color: #606266;
}

.form {
    padding-left: 20px;
    padding-right: 20px;
}
.btn{
    margin-bottom: 0px;
}
.submit {
    width: 100%;
}
.error{
    height: 40px;
    line-height: 40px;
    color: #F56C6C;
    font-size: 12px;
}
.error span{
    margin-left: 6px;
}
</style>