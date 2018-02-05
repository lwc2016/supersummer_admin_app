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
                    <el-button size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { question_list } from "../modules/api.js";
import { formatSubject, questionType, formatDateTime } from "../modules/filter.js";
export default {
    data() {
        return {
            search: {
                pageNo: 1,
                pageSize: 10
            },
            list: [],
            total: 0,
            formatSubject: formatSubject,
            questionType: questionType,
            formatDateTime: formatDateTime
        }
    },
    methods: {
        getList() {
            question_list(this.search).then(data => {
                if (data.code == "0") {
                    this.list = data.result.list;
                    this.total = data.result.page.total;
                };
            });
        }
    },
    mounted() {
        this.getList()
    }
}
</script>
<style>
</style>