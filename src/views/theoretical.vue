<template>
  <div class="safeAccess">
    <div class="cont">
      <div class="contit">
        <h3>理论考核</h3>
      </div>
      <p v-if="list.length == 0" class="nodata">暂无发布理论试卷</p>
      <div class="list" v-else>
        <ul>
          <li v-for="(item,index) in list"
              :key="index">
          <p><router-link :to="{path:'/examine',query:{p_id: item.id }}">{{item.name}}</router-link></p>
          <p class="time">{{dateFmt(item.time)}}</p>
          </li>
        </ul>
        <el-pagination class="pagination"
                       hide-on-single-page
                       :current-page.sync="params.page"
                       :page-size="params.pageSize"
                       @current-change='handlePageChange'
                       layout="prev,pager,next,jumper"
                       :page-count="total">
                       </el-pagination>
      </div>
    </div>
    <div class="content cont">
      <div class="contit">
        <h3>考核成果</h3>
      </div>
      
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {paperList} from '@/api/paper'
import Reply from '@/components/StudyReply'
import {dateFmt} from '@/utils/time'
export default {
  data(){
    return{
      params:{
        page:1,
        pageSize:10,
        ifOver:1,
        ifStart:1
      },
      list:[],
      total:0
    }
  },components:{
    Reply
  },
  computed:{
    ...mapGetters([
      'userId'
    ])
  },
  created(){
    this.getPaperList()
  },
  methods:{
    getPaperList(){
      paperList(this.params).then(data => {
        this.list = data.list
        this.total = data.total
      })
    },
    handlePageChange(page){
      this.params.page = page
      this.getPaperList()
    },
    dateFmt(time){
      return dateFmt(time,'YYYY-MM-DD HH:mm')
    }
  }
};
</script>
<style lang="scss">
.safeAccess {
  margin-top: 60px;
  .nodata {
    text-align: center;
    color: #969799;
    font-size: 36px;
  }
  .list {
    padding: 10px 60px;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 100px;
    ul {
      li {
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        color: #323233;
        p {
          &:hover {
            color: #6f88dd;
          }
        }
        .time {
          font-size: 20px;
          color: #969799;
        }
      }
    }
  }
  .content {
    text-align: center;
    padding: 50px;
    margin-top: 50px;
    background: #fff;
  }
}
  </style>