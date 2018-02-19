<template>
    <el-form v-bind:model="form" v-bind:rules="rules" label-width="180px" ref="form">
        <el-form-item label="所属科目:" prop="subject">
            <el-radio-group v-model="form.subject">
                <el-radio label="kuaiji" name="subject">会计</el-radio>
                <el-radio label="shuifa" name="subject">税法</el-radio>
                <el-radio label="jingji" name="subject">经济</el-radio>
                <el-radio label="caiwu" name="subject">财务管理</el-radio>
                <el-radio label="shenji" name="subject">审计</el-radio>
                <el-radio label="fengkong" name="subject">风险控制</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="所属章节:" prop="chapter">
            <el-row>
                <el-col :span="16">
                    <el-select value="" prop="chapter" v-model="form.chapter">
                        <el-option v-for="item in current_chapters" v-bind:value="item">{{item}}</el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="分类名称:" prop="name">
            <el-row>
                <el-col :span="16">
                    <el-input v-model="form.name"></el-input>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-button size="small" type="primary" v-on:click="handleSubmit('form')">提交</el-button>
            <el-button size="small" type="danger" v-on:click="handleReset">清除</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { category_add, category_detail, category_edit, chapter_list } from "../modules/api.js";
import router from "../modules/router.js";
export default {
    data() {
        return {
            form: {
                name: "",
                subject: "",
                chapter: ""
            },
            rules: {
                name: [{ required: true, message: "请添加分类名称！" }],
                subject: [{ required: true, message: "请选择所属分类！" }]
            },
            chapters: [],
            current_chapters: []
        }
    },
    props: ["id"],
    methods: {
        handleSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.id) {
                        this.editCategory();
                    } else {
                        this.addCategory();
                    };
                };
            });
        },
        getChapters(){
            chapter_list().then(data=>{
                console.log(data);
                if(data.code == "0"){
                    this.chapters = data.result;
                    this.settting_chapters();
                }
            });
        },
        handleReset() {
            this.form = {
                name: "",
                subject: "",
                chapter: ""
            };
        },
        addCategory() {
            category_add(this.form).then(data => {
                if (data.code == "0") {
                    this.$message({ type: "success", message: "分类添加成功！" });
                    router.push({ path: `/backoffice/category/${this.form.subject}` });
                } else {
                    this.$message({ type: "error", message: data.errorMsg });
                }
            });
        },
        editCategory() {
            let form = Object.assign(this.form, { id: this.id });
            category_edit(form).then(data => {
                if (data.code == "0") {
                    this.$message({ type: "success", message: "分类修改成功！" });
                    router.push({ path: `/backoffice/category/${this.form.subject}` });
                } else {
                    this.$message({ type: "error", message: data.errorMsg });
                };
            });
        },
        getDetail() {
            category_detail(this.id).then(data => {
                console.log(data);
                if (data.code == "0") {
                    this.form.name = data.result.name;
                    this.form.subject = data.result.subject;
                    this.form.chapter = data.result.chapter;
                }
            });
        },
        settting_chapters(){
            this.current_chapters = this.chapters[this.form.subject];
        }
    },
    mounted() {
        /*--------获取详情--------*/
        this.id && this.getDetail();
        /*--------获取章节--------*/
        this.getChapters();
    },
    watch: {
        "form.subject": function(oldValue, newValue){
            console.log(oldValue);
            console.log(newValue);
            if(newValue){
                this.form.chapter = "";
            };
            this.settting_chapters();
        }
    }
}
</script>
<style>
</style>