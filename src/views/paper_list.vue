<template>
    <div>
        <el-form size="small" v-bind:inline="true">
            <el-form-item>
                <router-link to="/backoffice/paper/add">
                    <el-button size="small" type="primary">新增考试</el-button>
                </router-link>
            </el-form-item>
        </el-form>
        <el-table size="mini" v-bind:data="list" v-loading="loading" element-loading-text="拼命加载中..." class="table" border>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="subject" label="所属科目">
                <template slot-scope="scope">{{formatSubject(scope.row.subject)}}</template>
            </el-table-column>
            <el-table-column prop="question_count" label="题目数量"></el-table-column>
            <el-table-column label="考试人数"></el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">{{formatDateTime(scope.row.created_time, "YYYY-MM-DD h:m:s")}}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <router-link v-bind:to="'/backoffice/paper/edit/' + scope.row.id">
                        <el-button size="mini" type="primary">编辑</el-button>
                    </router-link>
                    <el-button size="mini" type="danger" v-on:click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
          class="page"
          v-on:current-change="handlePageChange"
          :page-size="10"
          :total="total">
        </el-pagination>
    </div>
</template>
<script>
import { formatSubject, formatDateTime } from "../modules/filter.js";
import { paper_list, paper_delete } from "../modules/api.js";
export default {
    data() {
        return {
            search: {
                pageNo: 1,
                pageSize: 10
            },
            list: [],
            total: 0,
            loading: false,
            formatSubject: formatSubject,
            formatDateTime: formatDateTime
        }
    },
    methods: {
        getList() {
            paper_list(this.search).then(data => {
                if (data.code == "0") {
                    this.list = data.result.list;
                    this.total = data.result.page.total;
                }
            });
        },
        handleDelete(id) {
            this.$confirm("此操作将永久删除该试卷，是否继续？", "提示", {
                "confirmButtonText": "确认",
                "cancelButtonText": "取消",
                "type": "warning",
                "center": true
            }).then(() => {
                paper_delete(id).then(data=>{
                    if(data.code == 0){
                        this.$message({type: "success", message: "删除成功!"});
                        this.getList();
                    }else{
                        this.$message({type: "error", message: data.errorMsg});
                    };
                });
            }).catch(() => {
                this.$message({ type: "info", message: "已取消删除!" });
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
<style scoped>
.page{
    margin-top: 5px;
}
</style>