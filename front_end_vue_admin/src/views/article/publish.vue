<template>
  <el-container>
    <!---->
    <el-main>
      <el-form
        :model="formModel"
        status-icon
        label-position="left"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <!--标题-->
        <el-form-item prop="title">
          <el-input
            type="text"
            placeholder="请输入文章标题"
            v-model="formModel.title"
            maxlength="20"
            show-word-limit
          >
          </el-input>
        </el-form-item>

        <!--简介-->
        <el-form-item prop="description">
          <el-input
            type="textarea"
            placeholder="请输入文章简介"
            v-model="formModel.description"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </el-form-item>

        <!--分类-->
        <el-form-item prop="type">
          <el-select
            autocomplete="off"
            style="width: 100%"
            size="medium"
            v-model="formModel.value"
            filterable
            placeholder="请选择文章分类"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!--markdown编辑框-->
        <el-form-item prop="content">
          <div>
            <mavon-editor
              v-model="formModel.content"
              ref="md"
              @change="change"
              style="min-height: 600px"
            />
          </div>
        </el-form-item>
      </el-form>

      <!--提交按钮-->
      <el-col>
        <el-button
          size="medium"
          type="success"
          plain
          @click="submit('ruleForm')"
          >提交</el-button
        >
        <el-link href="#/index" :underline="false" type="primary">
          <el-button type="primary" plain> 返回 </el-button>
        </el-link>
      </el-col>
    </el-main>
  </el-container>
</template>

<script>
import { postPublishArticle, getTypes } from "@/api/article";

// 导入组件 及 组件样式
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import Qs from "qs";

export default {
  inject: ["reload"],
  name: "articlePublish",
  // 注册
  components: {
    mavonEditor,
  },
  data() {
    /*自定义rules*/
    var checkType = (rule, value, callback) => {
      if (this.formModel.value === "") {
        callback(new Error("请选择分类"));
      } else {
        console.log(this.formModel.value);
        callback();
      }
    };
    return {
      /*表单*/
      formModel: {
        title: "",
        description: "",
        value: "",
        content: "", // 输入的markdown
      },
      /*下拉列表的选项*/
      options: [],
      html: "", // 实时的html
      /*使用elementUI定义的校验规则*/
      rules: {
        title: [
          {
            type: "string",
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        description: [
          {
            type: "string",
            required: true,
            message: "请输入简介",
            trigger: "blur",
          },
        ],
        type: [{ validator: checkType, required: true, trigger: "blur" }],
        content: [
          {
            type: "string",
            required: true,
            message: "请输入内容",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },

    // 提交
    submit(ruleForm) {
      //表单验证
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          //装到article.js中

          postPublishArticle(this.formModel).then(
            (res) => {
              console.log(res);
              this.$message.success("文章发布成功!");
              this.$router.go(0);
            },
            (err) => {}
          );
        }
      });
    },
  },
  mounted() {
    getTypes().then(
      (res) => {

        //console.log(res);
        var list = res.data;

        /*给options赋值*/
        for (let i = 0; i < list.length; i++) {
          var value = list[i].id;
          var label = list[i].name;
          var option = { value: value, label: label };
          this.options.push(option);
        }

      },
      (err) => {}
    );

  },
};
</script>

<style scoped>
.el-header {
  padding: 0;
}

.el-main {
  text-align: center;
}

.el-footer {
  padding: 0;
}

.el-form {
  width: 80%;
  margin: 50px auto;
  text-align: center;
}
</style>
