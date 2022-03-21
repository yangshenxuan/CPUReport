<template>
  <div class="topbtn">
    <el-upload
      v-if="rId"
      class="upload"
      action=""
      :before-upload="beforeAvatarUpload"
      :multiple="false"
      :show-file-list="false"
      :http-request="upload"
    >
      <div style="color: #cf8f2e">报告上传</div>
    </el-upload>
    <a :href="docx" v-else>
      <div class="btn">报告模板</div>
    </a>
  </div>
</template>

<script>
import { addTemplate } from "@/api/template";
import { upload } from "@/api/file";
export default {
  props: ["rId"],
  data() {
    return {
      docx: process.env.VUE_APP_URL_BASE_API + "/cslgxy/doc/sybg.docx",
    };
  },
  methods: {
    upload(obj) {
      let fd = new FormData();
      fd.append("file", obj.file);
      upload(fd).then((data) => {
        const params = {
          id: +this.rId,
          fileId: data.fileId,
          score: "",
        };
        //添加实验报告
        addTemplate(params).then(() => {
          this.$message({
            message: "上传成功",
            type: "success",
          });
        });
      });
    },
    beforeAvatarUpload(file) {
      const isDOC = file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const isWORD = file.type === "application/msword";
      const isPDF = file.type === "application/pdf";
      // const isLtMB = file.size /1024/1024<10

      if(!isDOC&&!isWORD&&!isPDF){
        this.$message.error('上传文件只能是Word或PDF格式')
        return false
      }
      //if(!isLtMB){
      // this.$message.error("上传文件大小不能超过10MB")
      //return false  
      //}
      return true
    },
  },
};
</script>
<style lang="scss">
.btn {
  width: 137px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  background: #386591;
  cursor: pointer;
  margin-bottom: 10px;
}
</style>
