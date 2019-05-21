<template>
<section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
     <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-input v-model="dataForm.uid" placeholder="用户id" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    </el-col>
    <!--列表-->
    <el-table :height="totalCount==0 ? 0 : tableHeight "  :data="dataList" v-loading="dataListLoading"  style="width:100%">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="uid" label="用户编号" width="200" >
        </el-table-column>
        <el-table-column prop="fileName" label="推荐节目"  style="width:50%">
        </el-table-column>
        <el-table-column prop="weight" label="权重"  width="200">
        </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <!-- 分页插件 -->
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    </el-col>
</section>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            dataForm:{
                uid:""
            },
            dataList: [],
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            dataListLoading : false,
            tableHeight: window.innerWidth-986,
        }
    },
    activated () {
        this.getDataList()
    },
    methods: {
        search(){
            this.pageIndex = 1;
            getDataList();
        },
        getDataList(){
            this.dataListLoading = true,
            axios.get("/recommendList/search", {
              params:{
                uid: this.dataForm.uid,
                index: this.pageIndex,
                size: this.pageSize
              }
            }).then(({data})=>{
                if(data.code == '0'){
                    this.dataList = data.list
                    this.totalCount = data.totalCount
                }else {
                    this.dataList = []
                    this.totalCount = 0
                }
            }).catch(()=>{
                this.$message({
                  message: message,
                  type: 'error'
                });
            })
            this.dataListLoading = false
        },
        // 每页数
        sizeChangeHandle (val) {
            this.pageSize = val
            this.pageIndex = 1
            this.getDataList()
        },
        // 当前页
        currentChangeHandle (val) {
            this.pageIndex = val
            this.getDataList()
        },
    }
}
</script>

