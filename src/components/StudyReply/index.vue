<template>
  <div class="replybox">
    <div class="title">
      <p>
        理论学习<span>预习人数：{{ num }}人</span>
      </p>
    </div>
    <el-table
      :data="replyList"
      v-loading="loading"
      border
      style="width: 100%"
      :cell-style="cellStyle"
      :header-cell-style="headerCellStyle"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="school"
        align="center"
        label="学校"
      ></el-table-column>
      <el-table-column
        prop="college"
        align="center"
        label="学院"
      ></el-table-column>
      <el-table-column 
      prop="major"
      align="center"
      label="专业">
      </el-table-column>
      <el-table-column
      prop="name"
      align="center"
      label="姓名">
      </el-table-column>
      <el-table-column align="center"
      prop="fileName"
      label="资料名称">
      </el-table-column>
      <el-table-column align="center"
      width="200"
      label="学习时间">
      <template slot-scope="scope">
          {{dateFmt(scope.row.time)}}
      </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination class="pagination"
                   hide-on-single-page
                   :current-page.sync="listQuery.page"
                   :page-size="listQuery.pageSize"
                   @current-change="change"
                   layout="prev,pager,next,jumper"
                   :page-count="total"></el-pagination>
  </div>
</template>

<script>
import {findReply,replyNum} from '@/api/reply'
import {dateFmt} from '@/utils/time'
import {mapGetters} from 'vuex'
export default {
  props:['isUserId','action'],
  data(){
    return{
      cellStyle:{
        height:'55px'
      },
      headerCellStyle:{
        height:'55px',
        color:'#333',
        background:'rgba(46,92,138,0.11)',
        boderColor:'#ddd'
      },
      loading:false,
      total:0,
      listQuery:{
        userId:null,
        fileName: '',
        page:1,
        pageSize:10,
      },
      replyList: null,
      num:10
    }
  },
  created(){
    this.replylist()
    this.getNum()
  },
  watch:{
    action:{
      handler(nv,ov){
        if(nv){
          this.replylist()
          this.getNum()
          this.$emit('back',false)
        }
      }
    }
  },
  computed:{
    ...mapGetters([
      'userType'
    ])
  },
  methods:{
    replylist(){
      this.loading = true
      if(this.userType == 3){
        this.listQuery.userId = this.isUserId
      }else{
        this.listQuery.userId = undefined
      }
      findReply(this.listQuery).then((data)=>{
        this.total = data.total
        this.replyList = data.list
        this.loading = false
      })
    },
    change(page){
      this.listQuery.page = page
      this.replylist()
    },
    dateFmt(time){
      return dateFmt(time,'YYYY-MM-DD HH:mm')
    },
    getNum(){
      replyNum().then(data => {
        this.num = data.total
      })
    }
  }
};
</script>
<style lang="scss">
.title {
  text-align: left;
  border-left: 8px solid black;
  padding-left: 5px;
  margin-bottom: 25px;
  > p{
    font-size: 22px;
    font-weight: bold;
    color: #333;
    font-family: Source Han Sans CN;
    >span {
      margin-left: 26px;
      font-size: 18px;
      font-weight: 500;
    }
  }
}</style>
