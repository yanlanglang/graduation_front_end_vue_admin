<template>
  <el-container>
    <el-main>
      <el-tabs @tab-click="checkIsBlockly" tab-position="left">
        <!-- Blockly examples-->
        <el-tab-pane label="Blockly">
          <el-table :data="blocklyExamples" style="width: 100%">
            <!-- ID -->
            <el-table-column prop="id" label="ID"> </el-table-column>

            <!-- 内容 -->
            <el-table-column label="内容">
              <template slot-scope="scope">
                <i class="el-icon-reading"></i>
                <span style="margin-left: 10px">{{
                  scope.row.content | stringSplit
                }}</span>
              </template>
            </el-table-column>

            <!-- 附件 -->
            <el-table-column label="附件">
              <template slot-scope="scope">
                <i class="el-icon-link"></i>
                <a
                  @click="
                    downloadFile(scope.row.fileMapPath, 'blocklyExample.xml')
                  "
                  >附件下载</a
                >
              </template>
            </el-table-column>

            <!-- 创建日期 -->
            <el-table-column label="创建日期">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{
                  scope.row.createTime | timeFormat
                }}</span>
              </template>
            </el-table-column>

            <!-- 操作 -->
            <el-table-column align="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row.id)"
                  >Delete</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- J5 examples -->
        <el-tab-pane label="Johnny-Five">
          <el-table :data="j5Examples" style="width: 100%">
            <!-- ID -->
            <el-table-column prop="id" label="ID"> </el-table-column>

            <!-- 内容 -->
            <el-table-column label="内容">
              <template slot-scope="scope">
                <i class="el-icon-reading"></i>
                <span style="margin-left: 10px">{{
                  scope.row.content | stringSplit
                }}</span>
              </template>
            </el-table-column>

            <!-- 附件 -->
            <el-table-column label="附件">
              <template slot-scope="scope">
                <i class="el-icon-link"></i>
                <a @click="downloadFile(scope.row.fileMapPath, 'j5Example.xml')"
                  >附件下载</a
                >
              </template>
            </el-table-column>

            <!-- 创建日期 -->
            <el-table-column label="创建日期">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{
                  scope.row.createTime | timeFormat
                }}</span>
              </template>
            </el-table-column>

            <!-- 操作 -->
            <el-table-column align="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row.id)"
                  >Delete</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import { getPublishExample, delExample } from "@/api/example";

export default {
  name: "exampleShow",
  components: {},
  data() {
    return {
      isBlockly: true,
      blocklyExamples: [],
      j5Examples: [],
      prefixAccessory: "",
    };
  },
  methods: {
    //下载文件
    downloadFile(fileMapPath, fileName) {
      var x = new XMLHttpRequest();
      //this.prefixAccessory : 路径前缀
      x.open("GET", this.prefixAccessory + fileMapPath, true);
      x.responseType = "blob";
      x.onload = function (e) {
        var url = window.URL.createObjectURL(x.response);
        var a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
      };
      x.send();
    },

    //根据tab来查询对应的examples
    checkIsBlockly(tab) {
      //判断是否是blockly
      this.isBlockly = tab.label === "Blockly" ? true : false;
      //远程请求
      getPublishExample(this.isBlockly).then(
        (res) => {
          //console.log(res.data);

          if (this.isBlockly) {
            this.blocklyExamples = res.data;
          } else {
            this.j5Examples = res.data;
          }
        },
        (err) => {}
      );
    },

    //删除操作
    handleDelete(index, exampleId) {
      this.open(exampleId);
    },

    //是否确认删除
    open(exampleId) {
      this.$confirm("您是否确认删除该条公告？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定删除",
        cancelButtonText: "放弃删除",
      })
        .then(() => {
          //远程删除
          delExample(exampleId).then(
            (res) => {
              this.$message({
                type: "success",
                message: "删除成功",
              });

              //刷新页面(强制刷新)
              this.$router.go(0);
            },
            (err) => {}
          );
        })
        .catch((action) => {
          this.$message({
            type: "info",
            message: action === "cancel" ? "放弃删除并离开页面" : "放弃删除",
          });
        });
    },
  },

  mounted() {
    //设置附件的前缀
    this.prefixAccessory = "http://localhost:8000/yl";
    //默认加载blockly的案例
    getPublishExample(this.isBlockly).then(
      (res) => {
        this.blocklyExamples = res.data;
        //console.log(res.data);
      },
      (err) => {}
    );
  },
};
</script>

<style  scoped>
</style>
