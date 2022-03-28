<template>
  <div class="questionBank">
    <div class="nav">
      <router-link
        :to="{ name: 'subject' }"
        :class="$route.name == 'subject' ? 'on ' : ''"
        >题库分类</router-link
      >
      <router-link
        :to="{ name: 'question' }"
        :class="$route.name == 'question' ? 'on ' : ''"
        >题库管理</router-link
      >
      <router-link
        :to="{ name: 'paper' }"
        :class="$route.name == 'paper' ? 'on ' : ''"
        >试卷管理</router-link
      >
    </div>
    <el-divider></el-divider>
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.questionBank{
  width: 100%;
  .nav{
    padding-left: 12px;
    a{
      margin-right: 60px;
      &.on{
        position: relative;
        color: #103871;
        &::after{
          content: '';
          display: block;
          position: absolute;
          left: -12px;
          bottom: 0;
          width: 10px;
          height: 22px;
          background: #103871;
        }
      }
    }
  }
}

</style>
