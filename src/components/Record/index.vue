<template>
  <div class="recordbox">
    <div class="title" v-if="!exportShow">
      <p>
        {{ TITLE }}<span>实训人数：{{ num }}人</span>
      </p>
    </div>
    <div class="time" v-if="exportShow">
      <div>
        <el-select
          v-model="listQuery.userId"
          filterable
          :filter-method="handleFilter"
        >
          <el-option label="全部" :value="-1"></el-option>
          <div v-infinite-scroll="load" style="overflow-y: auto">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option></div
        ></el-select>
        <el-button
          type="primary"
          style="margin-left: 20px"
          @click="getRecordList()"
        >
          查询
        </el-button>
      </div>
      <el-button @click="handleExport">成绩导出</el-button>
    </div>
    <el-table
      :data="recordlist"
      v-loading="loading"
      border
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="headerCellStyle"
    >
      <el-table-column type="index" label="序号" align="center" width="80">
      </el-table-column>
      <el-table-column prop="username" align="center" label="操作人">
      </el-table-column>
      <el-table-column align="center" width="160" label="开始时间">
        <template slot-scope="scope">
          {{ dataFmt(scope.row.startTime) }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="160" label="结束时间">
        <template slot-scope="scope">
          {{ dateFmt(scope.row.stopTime) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        align="center"
        label="实训得分"
      ></el-table-column>
      <el-table-column label="实验报告" align="center" width="150">
        <template slot-scope="scope">
          <TopBtn :rId="scope.row.id" v-if="!exportShow" />
          <div v-else>
            <el-button type="text" @click="handleReport(scope.row.reposrtId)"
              >查看</el-button
            >
            <el-button type="text" @click="mark(scope.row)">打分</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="reportScore"
        align="center"
        label="报告得分"
      ></el-table-column>
      <el-table-column prop="score" label="总得分">
        <template>
          <span>{{ scope.row.totalScore }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      hide-on-single-page
      :current-page.sync="listQuery.page"
      :page-size="listQuery.pageSize"
      @current-change="change"
      layout="prev,pager,next,jumper"
      :page-count="total"
    ></el-pagination>

    <el-dialog
      :visible.sync="dialogVisible"
      width="600px"
      custom-class="dialog-reset"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <h2>报告评分</h2>
      <el-form :model="ruleForm" ref="ruleForm" label-width="130px">
        <el-form-item label="学校：">
          {{ userDetail.school }}
        </el-form-item>
        <el-form-item label="院系：">
          {{ userDetail.college }}
        </el-form-item>
        <el-form-item label="专业：">
          {{ userDetail.major }}
        </el-form-item>
        <el-form-item label="班级">
          {{ userDetail.classes }}
        </el-form-item>
        <el-form-item label="姓名：">
          {{ userDetail.name }}
        </el-form-item>
        <el-form-item label="得分：">
          <el-input v-model="ruleForm.score"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="dialogVisible = false"
          >取消</el-button
        >
        <el-button @click="submit()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TopBtn from "../TopBtn/index.vue";
export default {
  components: { TopBtn },
};
</script>
<style lang=""></style>
