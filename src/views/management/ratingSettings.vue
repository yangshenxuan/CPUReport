<template>
  <div class="ratingSettings">
    <Remark />
    <Grade />
  </div>
</template>
<script>
import Grade from "./components/grade.vue";
import Remark from "./components/remark.vue";
export default {
  components: {
    Remark,
    Grade,
  },
};
</script>
<style lang="scss" scoped>
.ratingSettings{
  display: flex;
  justify-content: space-between;
}
</style>
