<template>
  <div class="comment">
    <div class="contit">
      <h3>评论</h3>
    </div>
    <el-input v-model="text"
              class="commentinput"
              placeholder="请输入评论"
              @keyup.enter.native="commentSubmit()"></el-input>
    <el-button type="primary" @click="commentSubmit()">评论</el-button>
    <div class="comment-m" v-loading="loading">
      <p>全部评论</p>
      <div class="commentul">
        <div class="commentli"
            v-for="(item, index) in list"
            :key="index"
           >
          <div class="commentcont">
            <!-- 头像 -->
            <el-avatar icon="el-icon-user-solid"
                      :size="70"></el-avatar>
            <div class="comentcont-m">
              <div class="commentcont-b">
                <i class="el-icon-chat-dot-round icon"
                  @click="handleAnswer(index)"></i>
                <!-- <svg-icon class="icon"
                          icon-class="dianzan" /> -->
                <i class="el-icon-delete icon"
                  v-if="userType == 2"
                  @click="handleDel(1,item.comId)"
                  style="border:1px solid red"></i>
              </div>
              <div class="commentcont-t">
                <div class="comment-t">
                  <div>{{item.userName}}
                    <div class="formatTime">{{dateFmt(item.time)}}</div>
                  </div>
                </div>
                <div class="comment-b">{{item.content}}</div>
              </div>
              
              <!-- 回复评论 -->
              <div class="commentinputbox"
                  v-show="commentInputShow && addIndex === index">
                <i class="el-icon-close"
                  @click="commentInputShow = false"></i>
                <el-input v-model="answerText"
                          placeholder="请输入评论"
                          @keyup.enter.native="answerSubmit(item.comId)"></el-input>
                <el-button type="primary"
                          @click="answerSubmit(item.comId)">评论</el-button>
              </div>
              <!-- 回复列表 -->
              <div class="commentchild"
                  v-show="item.list2&&item.list2.length">
                <i class="el-icon-caret-top"></i>
                <div class="comentcont-m"
                    v-for="(i,key) in item.list2"
                    :key="key">
                  <div class="commentcont-t">
                    <div class="comment-t">
                      <div class="avatar">
                        <el-avatar :size="25" icon="el-icon-user-solid"></el-avatar>{{i.userName}}
                        <div class="formatTime">{{dateFmt(i.time)}}</div>
                      </div>
                      <div class="commentcont-b">
                        <!-- <svg-icon class="icon"
                                  icon-class="dianzan" /> -->
                        <i class="el-icon-delete icon"
                          v-if="userType == 2"
                          @click="handleDel(2,i.nodeId)"></i>
                      </div>
                    </div>
                    <div class="comment-b">{{i.nodeContent}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination hide-on-single-page
                  :current-page.sync="listQuery.page"
                  :page-size="listQuery.pageSize"
                  @current-change="commentList"
                  layout="total, prev, pager, next, jumper"
                  :page-count="total">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { commentList, addCom, delCom } from "@/api/comment";
import { dateFmt } from "@/utils/time";

export default {
  data() {
    return {
      text: "",
      list: [],
      commentInputShow: false,
      addIndex: null,
      answerText: "",
      loading: false,
      listQuery: {
        page: 1,
        pageSize: 10,
      },
      total: 0,
    };
  },
  computed: {
    ...mapGetters(["userId", "userType", "userName"]),
  },
  created() {
    this.commentList();
  },
  methods: {
    dateFmt(time) {
      return dateFmt(time, "YYY-MM-DD h:mm");
    },
    commentList(val) {
      this.loading = true;
      this.list = [];
      if (val) {
        this.listQuery.page = val;
      }
      commentList(this.listQuery).then((data) => {
        this.list = data.list;
        this.total = data.count ? data.count : 0;
        this.loading = false;
      });
    },

    //评论提交
    commentSubmit () {
      if (!this.text.replace(/\s*/g, "")) {
        return
      }
      const params = {
        type: 1,
        userId: this.userId,
        username: this.userName,
        content: this.text,
      };
      addCom(params).then(() => {
        this.text = '';
        this.commentList();
      });
    },
    handleAnswer(index) {
      this.commentInputShow = true;
      this.addIndex = index;
    },
    //评论回复提交
    answerSubmit (comId) {
      if (!this.answerText.replace(/\s*/g, "")) {
        return;
      }
      const params = {
        type: 2,
        comId: comId,
        userId: this.userId,
        username: this.userName,
        content: this.answerText,
      };
      addCom(params).then(() => {
        this.answerText = "";
        this.commentInputShow = false;
        this.commentList();
      });
    },
    handleDel(type, comId) {
      let params = {
        type,
        id: comId,
      };
      delCom(params).then(() => {
        this.commentList();
      });
    },
  },
};
</script>
<style lang="scss">
.comment {
  .commentinput {
    margin: 40px 0;
  }
  > .el-button {
    width: 160px;
    display: block;
    margin: 0 auto;
  }
  .comment-m {
    margin-top: 40px;
    border-top: 1px solid #e6e6e6;
    min-height: 300px;
    color: #333;
    p {
      font-size: 18px;
      color: #323233;
      margin-top: 20px;
    }
    .commentul {
      margin-top: 20px;
      .commentli {
        padding: 10px 0;
        .commentcont {
          display: flex;
          .el-avatar {
            margin-right: 20px;
            font-size: 40px;
            flex-shrink: 0;
          }
          .comentcont-m {
            position: relative;
            flex-grow: 1;
            .commentcont-t {
              line-height: 30px;
              padding: 5px 10px;
              .comment-t {
                display: flex;
                justify-content: space-between;
                .formatTime {
                  font-size: 16px;
                  color: #666;
                }
                .avatar {
                  .el-avatar {
                    font-size: 18px;
                    margin-right: 10px;
                    position: relative;
                    top: 5px;
                  }
                }
                .commentcont-b {
                  margin: 0;
                  top: 10px;
                }
              }
              .comment-b {
                text-align: start;
                margin-top: 5px;
                padding: 3px 0 3px 6px;
                background: rgba($color: #eee, $alpha: 0.67);
              }
            }
            .commentcont-b {
              position: absolute;
              right: 20px;
              // display: flex;
              // justify-content: flex-end;
              font-size: 18px;
              margin-top: 15px;
              .icon {
                cursor: pointer;
                margin-left: 30px;
                &:hover {
                  color: #103871;
                }
              }
            }
            .commentinputbox {
              padding: 20px 50px;
              box-shadow: 0 0 20px rgba(#103871, 0.15);
              width: 100%;
              border-radius: 5px;
              background: #fff;
              margin-top: 20px;
              height: 160px;
              position: relative;
              .el-icon-close {
                position: absolute;
                right: 10px;
                top: 10px;
                cursor: pointer;
              }
              .el-input {
                margin: 20px 0;
              }
              .el-button {
                float: right;
              }
            }
          }
        }
        .commentchild {
          background: #f5f9fd;
          padding: 20px;
          border-radius: 5px;
          margin-top: 15px;
          position: relative;
          .el-icon-caret-top {
            color: #f5f9fd;
            position: absolute;
            top: -20px;
            font-size: 30px;
          }
        }
      }
    }
  }
  .el-pagination {
    margin: 20px 0;
    text-align: center;
  }
}
</style>
