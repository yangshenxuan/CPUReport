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
        <el-button type="primary"
                   style="margin-left:20px"
                   @click="getReplyList()">查询</el-button>
      </div>
      <el-button @click="handleExport">成绩导出</el-button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss"></style>
