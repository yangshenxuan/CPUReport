<template>
  <div class="remark">
    <p>评语设置：</p>
    <el-table
      :data="list"
      v-loading="loading"
      border
      :cell-style="cellStyle"
      :header-cell-style="headerCellStyle"
      style="width: 100%"
    >
      <el-table-column
        prop="content"
        width="100"
        align="center"
        label="评分"
      ></el-table-column>
      <el-table-column label="评语" align="center">
        <template slot-scope="{ row, $index }">
          <div class="input" v-if="currentIndex == $index">
            <el-input
              class="text"
              v-model="row.result"
              @keyup.enter.native="handleConfire(row)"
              placeholder="请输入内容"
            ></el-input>
            <el-button
              type="success"
              icon="el-icon-check"
              @click="handleConfirm(row)"
              >确定</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-close"
              @click="handleClose(row)"
            ></el-button>
          </div>

          <p class="text" v-else @click="handleEdit(row, $index)">
            {{ row.result }}
          </p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { findRemark, updateRemark } from "@/api/remark";
export default {
  data() {
    return {
      cellStyle: {
        height: "55px ",
      },
      headerCellStyle: {
        height: "55px",
        color: "#333",
        background: "rgba(46,92,138,0.11)",
        borderColor: "#ddd",
      },
      list: [],
      loading: false,
      currentIndex: null,
      currentName: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      findRemark().then((data) => {
        this.list = data.list.slice(0, 4);
      });
    },
    //编辑
    handleEdit(row, index) {
      this.currentIndex = index;
      this.currentName = row.result;
    },
    //确定
    handleConfirm(row){
      let params = {
        result:row.result,
        id:row.id
      }
      updateRemark(params).then(()=>{
        this.currentIndex = null
      })
    },
    handleClose (row) {
      row.result = this.currentName
      this.currentIndex = null
    },
  },
};
</script>
<style lang="scss">
.remark {
  width: 45%;
  > p {
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .input {
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
  .text {
    cursor: pointer;
  }
}
</style>
