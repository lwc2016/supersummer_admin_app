<template>
    <div>
        <el-form v-bind:model="form" v-bind:rules="rules" status-icon ref="form" label-width="180px">
            <el-form-item label="题目编号：" prop="no">
                <el-row>
                    <el-col v-bind:span="21">
                        <el-input type="text" v-model="form.no"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="题目内容：" prop="content">
                <el-row>
                    <el-col v-bind:span="21">
                        <el-input v-bind:rows="6" type="textarea" v-model="form.content"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="所属科目：">
                <el-radio-group v-model="subject">
                    <el-radio label="kuaiji">会计</el-radio>
                    <el-radio label="shuifa">税法</el-radio>
                    <el-radio label="shenji">审计</el-radio>
                    <el-radio label="caiwu">财务管理</el-radio>
                    <el-radio label="jingji">经济法</el-radio>
                    <el-radio label="fengkong">风险控制</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="知识分类：" prop="category_id">
                <el-select filterable placeholder="请选择" v-model="form.category_id">
                    <el-option v-for="item in categories" v-bind:key="item.id" v-bind:label="item.name" v-bind:value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选项列表：" size="mini">
                <el-row>
                    <el-col v-bind:span="21">
                        <el-table v-bind:data="form.options" size="mini" border>
                            <el-table-column width="80px" prop="label" label="选项"></el-table-column>
                            <el-table-column prop="content" label="选项内容"></el-table-column>
                            <el-table-column width="160px" label="操作">
                                <template slot-scope="scope">
                                    <el-button v-on:click="handleEditOption(scope.row)" size="mini" type="primary">编辑</el-button>
                                    <el-button v-if="!id" v-on:click="handleDeleteOption(scope.row)" size="mini" type="danger">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div v-show="(form.options.length < 5) && !id" class="add-option-btn">
                            <el-button type="primary" plain v-on:click="dialog=true">添加选项</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="正确答案：" prop="right_answer">
                <el-checkbox-group v-model="form.right_answer">
                    <el-checkbox v-for="(item,key) in form.options" v-bind:key="key" v-bind:label="item.label">{{item.label}}</el-checkbox>
                </el-checkbox-group>
                <p class="notice" v-show="form.options.length == 0">请先添加题目选项</p>
            </el-form-item>
            <el-form-item label="答案解析：" prop="answer_analyze">
                <el-row>
                    <el-col v-bind:span="21">
                        <el-input type="textarea" v-model="form.answer_analyze" v-bind:rows="6"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button v-on:click="handleSubmit('form')" size="small" type="primary">提交</el-button>
                <el-button size="small" type="danger">清除</el-button>
            </el-form-item>
            <el-dialog title="添加选项" :visible="dialog" width="600px" v-on:close="dialog=false">
                <el-form v-bind:model="optionForm" v-bind:rules="optionRules" ref="optionForm" size="small" label-width="100px">
                    <el-form-item label="选项：" prop="label">
                        <el-radio-group v-model="optionForm.label">
                            <el-radio v-bind:disabled="isLabelAble('A')" label="A">A</el-radio>
                            <el-radio v-bind:disabled="isLabelAble('B')" label="B">B</el-radio>
                            <el-radio v-bind:disabled="isLabelAble('C')"  label="C">C</el-radio>
                            <el-radio v-bind:disabled="isLabelAble('D')"  label="D">D</el-radio>
                            <el-radio v-bind:disabled="isLabelAble('E')"  label="E">E</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="选项内容：" prop="content">
                        <el-input type="textarea" v-model="optionForm.content"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer">
                    <el-button size="small" type="primary" v-on:click="handleSubmitOption('optionForm')">确定</el-button>
                    <el-button size="small" type="danger" v-on:click="dialog=false">取消</el-button>
                </span>
            </el-dialog>
        </el-form>
    </div>
</template>
<script>
import { category_all, question_add, question_detail, question_edit} from "../modules/api.js";
import router from "../modules/router.js";
export default {
    data() {
        return {
            form: {
                no: "",
                content: "",
                category_id: "",
                right_answer: [],
                options: [],
                answer_analyze: ""
            },
            rules: {
                no:[{required: true, message: "请填写题目编号"}],
                content: [{ required: true, message: "请填写题目内容！" }],
                category_id: [{ required: true, message: "请选择知识分类！" }],
                right_answer: [{ required: true, message: "请选择正确答案！" }]
            },
            optionForm: {
                label: "",
                content: ""
            },
            optionRules: {
                label: [{ required: true, message: "请选择选项！" }],
                content: [{ required: true, message: "请填写选项内容！" }]
            },
            subject: "",
            categories: [],
            dialog: false
        }
    },
    props: ["id"],
    methods: {
        handleSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if(valid){
                    let form = {};
                    form.no = this.form.no;
                    form.content = this.form.content;
                    form.category_id = this.form.category_id;
                    form.right_answer = this.form.right_answer.join(",");
                    form.options = JSON.stringify(this.form.options);
                    form.answer_analyze = this.form.answer_analyze;
                    this.id ? this.eidtQuestion(form) : this.addQuestion(form);
                };
            });
        },
        handleSubmitOption(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    /*-------判断是否在options中--------*/
                    let i = null;
                    let isExist = this.form.options.some((item, index) => {
                        if(this.optionForm.label == item.label) i = index;
                        return this.optionForm.label == item.label;
                    });
                    if (isExist) {
                        this.form.options[i].content = this.optionForm.content;
                    } else {
                        let option = { label: this.optionForm.label, content: this.optionForm.content };
                        this.form.options.push(option);
                    };
                    
                    this.form.options = this.form.options.sort((first, second)=>{
                        console.log("----first-----");
                        console.log(first);
                        console.log("----second-----");
                        console.log(second);
                        return first.label > second.label;
                    });

                    this.optionForm.label = "";
                    this.optionForm.content = "";
                    this.dialog = false;
                }
            });
        },
        /*--------答案选项排序--------*/

        getDetail(){
            question_detail(this.id).then(data=>{
                console.log(data);
                if(data.code == "0"){
                    this.form.content = data.result.content;
                    this.subject = data.result.subject;
                    this.form.category_id = data.result.category_id;
                    this.form.options = data.result.options;
                    this.form.right_answer = data.result.right_answer.split(",");
                    this.form.answer_analyze = data.result.answer_analyze;
                }
            });
        },
        getCategory() {
            category_all(this.subject).then(data => {
                console.log(data);
                if (data.code == "0") {
                    this.categories = data.result || [];
                }
            });
        },
        isLabelAble: function(label) {
            let options = this.form.options;
            let isExist = options.some(item => {
                return item.label == label;
            });
            return isExist;
        },
        handleDeleteOption(option) {
            let options = this.form.options;
            let i = null;
            options.map((item, index) => {
                if (item.label == option.label) {
                    i = index;
                };
            });
            this.form.options.splice(i, 1);
        },
        handleEditOption(option) {
            this.optionForm.label = option.label;
            this.optionForm.content = option.content;
            this.dialog = true;
        },
        addQuestion(form){
            question_add(form).then(data=>{
                if(data.code == "0"){
                    this.$message({type: "success", message: "问题添加成功！"});
                    router.push({path: `/backoffice/question/${this.subject}`});
                }else{
                    this.$message({type: "error", message: data.errorMsg});
                }
            });
        },
        eidtQuestion(form){
            let formData = Object.assign(form, {id: this.id});
            question_edit(formData).then(data=>{
                if(data.code == "0"){
                    this.$message({type: "success", message: "问题修改成功！"});
                    router.push({path: `/backoffice/question/${this.subject}`});
                }else{
                    this.$message({type: "error", message: data.errorMsg});
                }
            });
        }
    },
    watch: {
        subject: function(val) {
            console.log(val);
            this.getCategory();
        }
    },
    mounted(){
        /*---------获取详情-------*/
        this.id && this.getDetail();
    }
}
</script>
<style>
.add-option-btn {
    margin-top: 5px;
}
.notice{
    color: #909399;
}
</style>