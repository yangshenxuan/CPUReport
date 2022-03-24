<template>
  <div class="simulationScore">
    <div class="nav">
      <span :class="isExam == 0 ? 'on' : ''" @click.prevent='isExam = 0'>练习模式</span>
      <span :class="isExam == 1 ? 'on' : ''" @click.prevent='isExam = 1'>考核模式</span>
    </div>
    <el-divider></el-divider>
    <Record :export='true' :isExam='isExam' />
  </div>
</template>
<script>
import Record from '@/components/Record'
export default {
  data(){
    return{
      isExam:0
    }
  },
  components:{
    Record
  }
}
</script>
<style lang="scss" scoped>
  .simulationScore {
  width: 100%;
  .nav {
    padding-left: 12px;
    span {
      display: inline-block;
      margin-right: 60px;
      cursor: pointer;
      &.on {
        position: relative;
        color: #103871;
        &::before {
          content: "";
          display: block;
          position: absolute;
          left: -12px;
          bottom: 0;
          width: 10px;
          height: 22px;
          background-color: #103871;
        }
      }
    }
  }
}
</style>