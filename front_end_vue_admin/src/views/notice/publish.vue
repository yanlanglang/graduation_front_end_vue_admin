<template>
  <el-container align="center">
    <el-main>
      <div>
        <el-input
          type="textarea"
          placeholder="请输入公告内容......"
          v-model="content"
          resize="none"
          maxlength="100"
          show-word-limit
        >
        </el-input>
      </div>

      <div>
        <el-col>
          <el-button @click="submitForm" type="primary" plain> 提交 </el-button>

          <el-button @click="clearForm" type="success" plain> 置空 </el-button>
        </el-col>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { postPublishNotice } from "@/api/notice.js";

export default {
  name: "noticePublish",
  components: {},
  data() {
    return {
      content: "",
    };
  },
  methods: {
    //提交
    submitForm() {
      postPublishNotice(this.content).then(
        (res) => {
            
            this.$message.success(res.data);
            this.$router.go(0);
        },
        (err) => {

        }
      )
    },

    //清除
    clearForm() {
      this.$router.go(0);
    },
  },
  mounted() {},
};
</script>

<style  scoped>
div {
  margin: 20px;
}
</style>
