<template >
  <div class="web-wrapper">
    <Top />
    <router-view></router-view>
  <Bottom />
  </div>
</template>
<script>
import Top from './components/Top.vue'
import Bottom from "./components/Bottom.vue"
export default {
components:{
  Top,
  Bottom,
}
}
</script>
<style lang="scss">
  .web-wrapper{
    height: 100%;
  }
</style>