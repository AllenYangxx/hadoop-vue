<template>
<section>
    <el-col v-if="formVisible" :span="24" class="toolbar" style="padding-bottom: 0px;">
     <el-form :inline="true" :model="dataForm" @keyup.enter.native="search()">
      <el-form-item>
        <el-input v-model="dataForm.uid" placeholder="输入体验用户ID" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="userLogin(dataForm.uid)">体验</el-button>
      </el-form-item>
     </el-form>
    </el-col>
    <div style="position:relative;left:20px;top:60px">
        <el-row>
        <el-card class="box-card" v-if="filmInfoVisible">
            <div slot="header" class="clearfix">
                <span>节目：{{dataList[index].fileName}}</span>
                <el-button @click="next()" style="float: right; padding: 3px 0" type="text">下一个</el-button>
            </div>
            <div class="text item">
                {{'电影简介： ' + '假装有简介' }}
            </div>
            </el-card>
        </el-row>
    </div>
</section>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
        dataForm:{
            uid:'',
        },
        filmInfoVisible: false,
        formVisible: true,
        dataList: [],
        index: 0,
    };
  },
  methods: {
      userLogin(uid){
          var url = "/recommendList/findOneByUid/";
          axios.get(url + this.dataForm.uid).then(({data})=>{
              if(data.code == 1){
                  this.$message({
                        type: 'success',
                        message: '登录成功'
                    });
                    this.formVisible = false;
                    this.filmInfoVisible = true; 
                    this.next();
              }else{
                    this.$message({
                        type: 'error',
                        message: '登录失败'
                    }); 
              }
          }).catch(()=>{
              this.$message({
                    type: 'error',
                    message: '登录失败'
                }); 
          })
      },
      next(){
          var url = "/recommendList/recommendFilmToUser/";
          if(this.dataList.length==0||this.index >= this.dataList.length-1){
             axios.get(url + this.dataForm.uid).then(({data})=>{
                 if(data.code == 1){
                     this.dataList = data.data;
                     this.index = 0;
                     if(this.dataList.length==0){
                         this.$message({
                            type: 'danger',
                            message: '暂无信息'
                        }); 
                     }
                     return;
                 }else{
                     this.$message({
                        type: 'error',
                        message: '获取信息失败'
                    }); 
                    return;
                 }
             })
          }
          this.index = this.index+1;
      }
  }
}
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>