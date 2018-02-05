<template>
    <div>
        <el-table v-bind:data="list" size="mini">
            <el-table-column prop="id" label="题目编号"></el-table-column>
            <el-table-column prop="subject" label="科目">
            	<template slot-scope="scope">{{formatSubject(scope.row.subject)}}</template>
            </el-table-column>
            <el-table-column prop="category_name" label="分类名称"></el-table-column>
            <el-table-column prop="type" label="类型">
            	<template slot-scope="scope">{{questionType(scope.row.type)}}</template>
            </el-table-column>
            <el-table-column prop="created_time" label="创建时间">
            	<template slot-scope="scope">{{formatDateTime(scope.row.created_time, "YYYY-MM-DD h:m:s")}}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary">编辑</el-button>
                    <el-button v-on:click="handleDelete(scope.row.id)" size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
        v-on:current-change="handlePageChange"
        v-bind:page-size="10"
        v-bind:total="total"
        class="page"
        >
        </el-pagination>
    </div>
</template>
<script>
import { question_list, question_delete } from "../modules/api.js";
import { formatSubject, questionType, formatDateTime } from "../modules/filter.js";
export default {
    data() {
        return {
            search: {
                pageNo: 1,
                pageSize: 10,
                subject: this.subject
            },
            list: [],
            total: 0,
            formatSubject: formatSubject,
            questionType: questionType,
            formatDateTime: formatDateTime
        }
    },
    props: ["subject"],
    methods: {
        getList() {
            question_list(this.search).then(data => {
                if (data.code == "0") {
                    this.list = data.result.list;
                    this.total = data.result.page.total;
                };
            });
        },
        handleDelete(id){
            this.$confirm("此操作将永久删除此题目，是否继续？", "提示", {
                "confirmButtonText": "确定",
                "cancelButtonText": "取消",
                "type": "warning"
            }).then(()=>{
                this.questionDelete(id);
            }).catch(()=>{
                this.$message({type:"info", message: "已取消删除"});
            });
        },
        questionDelete(id){
            question_delete(id).then(data=>{
                if(data.code == "0"){
                    this.$message({type: "success", message: "删除成功！"});
                    this.getList();
                }else{
                    this.$message({type: "error", message: data.errorMsg});
                };
            });
        },
        handlePageChange(pageNo){
            this.search.pageNo = pageNo;
            this.getList();
        }
    },
    mounted() {
        this.getList()
    }
}
</script>
<style>
.page{
    margin-top: 5px;
}
</style>