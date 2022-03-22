<template>
  <div class="replybox">
    <div class="title" v-if="!exportShow">
      <p>理论考核<span>考核人数:{{num}}人</span></p>
    </div>
    <div class="time" v-if="exportShow">
      <div style="display：flex;">
        <el-select v-model="listQuery.userId"></el-select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
  
</style>