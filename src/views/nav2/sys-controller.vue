<template>
<section>
    <div style="position:relative;left:20px;top:30px">
    <el-form :inline="true" v-loading="actionLoading">
      <el-form-item>
        <el-button type="primary"  @click="autoRun()">自动运行</el-button>
      </el-form-item>
      <el-form-item>
        <el-dropdown @command="handleCommand">
            <el-button type="primary" >手动运行<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">清洗数据</el-dropdown-item>
                <el-dropdown-item command="b">写入csv</el-dropdown-item>
                <el-dropdown-item command="c">运行系统</el-dropdown-item>
                <el-dropdown-item command="d">储存结果集</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>
    </div>
    <div v-if="visible" style="position:relative;left:20px;top:80px">
        <el-steps  :active="active" finish-status="success">
            <el-step title="清洗数据"></el-step>
            <el-step title="写入csv"></el-step>
            <el-step title="运行系统"></el-step>
            <el-step title="储存结果集"></el-step>
        </el-steps>
    </div>
</section>
</template>
<script>
import axios from 'axios';
export default {
data() {
    return {
        actionLoading: false,
        active: 0,
        visible: false,
    }
},
methods: {
    next() {
        if (this.active++ > 4) this.active = 0;
    },
    handleCommand(command) {
        
        var url = "/recommendList"  
        var msg = "重新"   
        switch(command){
            case 'a': url=url+"/dataclean";msg=msg+"清洗数据"; break;
            case 'b': url=url+"/file";msg=msg+"写入csv"; break;
            case 'c': url=url+"/startRecommendStart";msg=msg+"运行系统"; break;
            case 'd': url=url+"/saveInMongo";msg=msg+"储存结果集";break;
            default : break;
        }
        
        this.$confirm('此操作将'+msg+', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
            this.actionLoading = true;
            axios.post(url).then(({data})=>{
                if(data.code == 1){
                    this.$message({
                        type: 'success',
                        message: msg+'成功!'
                    }); 
                }else{
                    this.$message({
                        type: 'error',
                        message: msg+'失败!'
                    }); 
                }
            }).then(()=>{
                this.actionLoading = false; 
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
        });
    },
    autoRun(){
    this.$confirm('此操作将运行推荐程序, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        this.actionLoading = true;
        this.visible = true;
        this.active= 0;
        var url = "/recommendList";
        axios.post(url+"/dataclean").then(({data})=>{
            if(data.code==1){
                this.next();
            }else{
                return;
            }
        }).then(()=>{
            axios.post(url+"/file").then(({data})=>{
                if(data.code==1){
                    this.next();
                }else{
                    return;
                }
            }).then(()=>{
                axios.post(url+"/startRecommendStart").then(({data})=>{
                    if(data.code==1){
                        this.next();
                    }else{
                        return;
                    }
                }).then(()=>{
                    axios.post(url+"/saveInMongo").then(({data})=>{
                        if(data.code==1){
                            this.next();
                        }else{
                            return;
                        }
                    }).then(()=>{
                        this.actionLoading = false;
                        this.visible = false;
                        this.$message({
                            type: 'success',
                            message: '推荐系统运行成功'
                        }); 
                    })
                })
            })
        })
    }).catch(() => {
        this.$message({
            type: 'info',
            message: '已取消删除'
        });          
    });
    }
}
}
</script>
<style>
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
