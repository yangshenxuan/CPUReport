<template>
  <div class="replybox">
    <div class="title" v-if="!exportShow">
      <p>
        理论考核<span>考核人数:{{ num }}人</span>
      </p>
    </div>
    <div class="time" v-if="exportShow">
      <div style="display：flex;">
        <el-select
          v-model="listQuery.userId"
          filterable
          :filter-method="handleFilter"
        >
          <el-option label="全部" :value="-1"></el-option>
          <div v-infinite-scroll="load" style="overflow-y: auto">
            <el-option
              v-for="item in userList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option></div
        ></el-select>
        <el-select
          v-model="listQuery.tpId"
          style="margin-left: 20px"
          filterable
          :filter-method="handlePaperFilter"
        >
          <el-option label="全部" :value="-1"></el-option>
          <div v-infinite-scroll="loadPaper" style="overflow-y: auto">
            <el-option
              v-for="item in paperList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option></div
        ></el-select>
        <el-button
          type="primary"
          style="margin-left: 20px"
          @click="getReplyList()"
          >查询</el-button
        >
      </div>
      <el-button @click="handleExport">成绩导出</el-button>
    </div>
    <el-table
      :data="replyList"
      v-loading="loading"
      border
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="headerCellStyle"
    >
      <el-table-column type="index" label="序号" align="center" width="80">
      </el-table-column>
      <el-table-column prop="school" align="center" label="学校">
      </el-table-column>
      <el-table-column prop="college" align="center" label="学院">
      </el-table-column>
      <el-table-column prop="major" align="center" label="专业">
      </el-table-column>
      <el-table-column prop="classes" align="center" label="班级">
      </el-table-column>
      <el-table-column prop="userName" align="center" label="姓名">
      </el-table-column>
      <el-table-column prop="tpName" align="center" label="试卷名">
      </el-table-column>
      <el-table-column align="center" width="180" label="答题时间">
        <template slot-scope="scope">
          {{ dateFmt(scope.row.time) }}
        </template>
      </el-table-column>
      <el-table-column prop="score" align="center" label="分数">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail(scope.row)">{{
            scope.row.score
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination class="pagination"
                   hide-on-single-page
                   :current-page.sync="listQuery.page"
                   :page-size="listQuery.pageSize"
                   @current-change='change'
                   layout="prev,pager,next,jumper"
                   :page-count="total"></el-pagination>
    <el-dialog title="答题记录"
               :append-to-body='true'
               width="670px"
               :close-on-click-modal='false'
               :close-on-press-escape='false'
               :visible.sync='dialogVisible'></el-dialog>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss"></style>
