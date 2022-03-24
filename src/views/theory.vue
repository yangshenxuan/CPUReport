<template >
<div class="theory">
  <div class="cont theorycont">
    <div class="contit">
      <h3>理论学习</h3>
    </div>
    <div class="list">
      <ul>
        <li v-for="(item,index) in list"
            :key="index">
            <p>
              <a :href="item.href"
                  target="_blank"
                  @click.prevent="add(item)">
                  <i>[{{item.type}}]</i>{{item.name}}</a></p>
                  <p class="time">{{item.time}}</p>
                  </li>
      </ul>
    </div>
  </div>
  <div class="content cont">
    <div class="contit">
      <h3>学习成果</h3>
    </div>
   <StudyReply :isUserId="userId" :action="action" @back="back" />
  </div>
</div>
</template>
<script>
import {theoryList} from '@/utils/theory'
import {mapGetters} from 'vuex'
import {addReply} from "@/api/reply"
import StudyReply from "@/components/StudyReply"
export default {
  data() {
    return {
      list:theoryList,
      action:false
    }
  },
  components:{
    StudyReply
  },
  computed:{
    ...mapGetters([
      'userId'
    ])
  },
  methods:{
    add(item){
      addReply({
        userId:this.userId,
        fileName:item.name,
        fileType:item.type
      }).then(()=>{
        window.open(item.href)
        this.action = true
      })
    },
    back(value) {
      this.action = value
    }
  }
}
</script>
<style lang="scss" scoped>
.theorycont{
  margin-top: 60px;
}
.list{
  padding: 10px 60px;
  background: #fff;
  margin-bottom: 100px;
  overflow: auto;
  height: 600px;
  border-radius: 5px;
 &::-webkit-scrollbar{
    /*滚动条整体部分，其中的属性有width,height,background,border等*/

   width: 4px;
   height: 4px;
 }
   &::-webkit-scrollbar-track {
    /*外层轨道，可以用display:none让其不显示，也可以添加背景图片*/
    background: rgba(1, 3, 1, 0.2);
    border-radius: 2px;
  }
    &::-webkit-scrollbar-thumb {
    /*滚动条里面可以拖动的那部分*/
    background:rgb(0, 75, 160);
    border-radius: 2px;
  }
  ul{
    li{
      height: 60px;
      line-height: 50px;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      color: #323232;
    }
    i{
      margin-right: 10px;
    }
    i,.time{
      color: #969798;
    }
  }
}
  
</style>