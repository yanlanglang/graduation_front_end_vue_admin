<template>
  <el-container align="center">
    <el-main>
      <div>
        <el-input
          type="textarea"
          placeholder="请描述当前案例......"
          v-model="submitData.content"
          resize="none"
          maxlength="100"
          show-word-limit
        >
        </el-input>
      </div>

      <div>
        <el-radio
          @change="getCheckedRadio"
          v-model="submitData.checkedRadio"
          label="blockly"
          border
          >Blockly</el-radio
        >
        <el-radio
          @change="getCheckedRadio"
          v-model="submitData.checkedRadio"
          label="johnnyFive"
          border
          >JohnnyFive</el-radio
        >
      </div>

      <div>
        <!-- :data 很重要，在这里加上可以将表单的数据和图片同时上传 -->
        <el-upload
          class="upload-demo"
          ref="upload"
          drag
          action="admin/publishExample"
          :on-exceed="handleExceed"
          :on-change="handleChange"
          :on-success="handleSuccess"
          :auto-upload="false"
          :data="submitData"
          :limit="1"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            请上传 xml 文件，且文件大小不超过5MB
          </div>
        </el-upload>
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
export default {
  name: "examplePublish",
  components: {},
  data() {
    return {
      submitData: {
        //默认选中的radio
        checkedRadio: "blockly",
        //案例简述
        content: "",
        //是否是blockly
        blockly: true
        
      },
    };
  },
  methods: {
    //获取选中的单选框label值
    getCheckedRadio(label) {
      var isBlockly = (label==='blockly' ? true : false);
      this.submitData.blockly = isBlockly;
    },

    /*改变时触发*/
    handleChange(file) {
      const allowType = "text/xml";
      if(file.raw.type!==allowType){
        this.$message.error("只能上传xml文件 ! ");
        this.$refs.upload.clearFiles();
        this.files = null;
        return;
      }

      // image/png, image/jpeg, image/gif, image/jpg
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isLt5M) {
        this.$message.error("上传文件的大小不能超过 5MB !");
        this.$refs.upload.clearFiles();
        this.files = null;
        return;
      }

      this.files = file.raw;
      //console.log(file);
    },
    /*多选时触发*/
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件。  如需添加当前的文件，请删除原有文件。`
      );
    },
    /*上传成功后触发*/
    handleSuccess(res, file, fileList) {
      this.$message.success(res.data);

      this.$router.go(0);
    },

    //提交数据
    submitForm() {
      this.$refs.upload.submit(); //图片上传
    },


    //清空数据
    clearForm() {
      this.$router.go(0);
    }
  },
  mounted() {},
};
</script>

<style  scoped>
div {
  margin: 20px;
}
</style>
