<template>
  <div class="bottom">
    <div class="cont bottom-m">
      <div class="bottom-c">
        <!-- <p>版权所有： <img src="../../assets/img/logo.png" alt=""></p> -->
        <p>helpful links</p>
        <div class="divider"></div>
        <div class="bottom-s">
          <div>
            <h2>技术支持：</h2>
            <p><a href="http://www.yysmart.net" target="_blank"><img src="../../assets/img/yysmart_logo.png" alt=""></a></p>
          </div>
          <div>
            <h2>技术支持电话：</h2>
            <p>025-52311600</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.bottom {
  height: 300px;
  background: url(~@/assets/img/footer-bg.png) top center;
  .bottom-m {
    display: flex;
    justify-content: space-between;
    padding-top: 65px;
    color: #fafafa;
    .bottom-c {
      > p {
        font-size: 14px;
        text-transform: uppercase;
        color: #fff;
      }
      p {
        font-family: Source Han Sans CN;
      }
      .divider {
        width: 146px;
        height: 1px;
        background: #E8F6FD;
        margin: 15px 0 30px;
      }
      .bottom-s {
        display: flex;
        >div {
          &:first-child {
            margin-right: 370px;
          }
          h2 {
            font-size: 24px;
            margin-bottom: 25px;
          }
          p {
            font-size: 20px;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>