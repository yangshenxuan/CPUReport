<template>
 <div class="grade">
    <p>评分比例：</p>
    <el-table :data="list"
              v-loading="loading"
              border
              :cell-style="cellStyle"
              :header-cell-style="headerCellStyle"
              style="width: 100%">
      <el-table-column type="index"
                      label="序号"
                      align="center"
                      width="80">
        <template slot-scope="{row,$index}">
          <span v-if="!row.id">合计</span>
          <span v-else>{{$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="content"
                      align="center"
                      label="模块名称">
      </el-table-column>
      <el-table-column label="评分比例（%）"
                      prop="ratio"
                      sortable
                      align="center">
        <template slot-scope="{row,$index}">
          <div class="input"
              v-if="currentIndex == $index">
            <el-form :model="form"
                    :rules="rules"
                    ref="form">
              <el-form-item prop="ratio">
                <el-input class="text"
                          v-model="form.ratio"
                          type="number"
                          @keyup.enter.native="handleConfirm(row)"
                          placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-form>

            <el-button type="success"
                      icon="el-icon-check"
                      @click="handleConfirm(row)">确定</el-button>
            <el-button type="danger"
                      icon="el-icon-close"
                      @click="handleClose(row)"></el-button>
          </div>

          <p class="text"
            v-else
            @click="handleEdit(row,$index)">{{+row.result}}</p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { findExperiment, updateExperiment } from '@/api/remark'
export default {
    data () {
    var validateRatio = (rule, value, callback) => {
      if (value === '' || value < 0) {
        callback(new Error('请输入正数'));
      } else if (this.sum > 100) {
        callback(new Error('总和不能大于100'));
      } else {
        callback();
      }
    };
    return {
      cellStyle: {
        height: '55px',
      },
      headerCellStyle: {
        height: '55px',
        color: '#333',
        background: ' rgba(46, 92, 138, 0.11)',
        borderColor: '#ddd'
      },
      list: [],
      loading: false,
      currentIndex: null,
      currentName: '',
      form: {
        ratio: '',
      },
      rules: {
        ratio: [
          { validator: validateRatio }
        ],
      }
    };
  },
  created(){
    this.getData()
  },
  computed:{
    sum(){
      let sum = 0
      this.list.forEach(v => {
        if(v.result != '100'){
          sum += Number(v.result)
        }
      })
      return sum - Number(this.currentName) + Number(this.form.ratio)
    }
  },
  methods: {
    getData(){
      findExperiment().then(data => {
        this.list = data.list.slice(4,data.list.length)
        this.list.push({result:'100'})
      })
    },
    handleEdit(row,index){
      if(!row.id) return
      if(this.currentIndex != null){
        this.list[this.currentIndex].result= this.currentName
      }
      this.currentIndex = index
      this.form.ratio = row.result
      this.currentName = row.result
    },
    //确定
    handleConfirm(row){
      this.$refs.form.validate((valid)=> {
        if(valid){
          let params = {
            result:this.form.ratio,
            id:row.id
          }
          updateExperiment(params).then(()=>{
            this.list[this.currentIndex].result = Number(this.form.ratio)
            this.currentIndex =null
          })
        }else{
          return false
        }
      })
    },
     handleClose (row) {
      row.ratio = this.currentName
      this.currentIndex = null
    }
  },
};
</script>
<style lang="scss" scoped>
.grade {
  width: 45%;
  > p {
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  
  .input {
    display: flex;
    align-items: flex-start;
    .el-form {
      width: 200px;
      margin-right: 10px;
    }
  }
  .text {
    cursor: pointer;
  }
}
</style>
