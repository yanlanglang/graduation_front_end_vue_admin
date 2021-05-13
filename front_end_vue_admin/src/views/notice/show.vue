<template>
  <el-container>
    <el-main>
      <el-table :data="notices" style="width: 100%">
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

        <!-- 创建日期 -->
        <el-table-column label="创建日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{
              scope.row.createTime | timeFormat
            }}</span>
          </template>
        </el-table-column>

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
    </el-main>
  </el-container>
</template>

<script>
import { getNotices, delNotice } from "@/api/notice.js";

export default {
  name: "noticeShow",
  components: {},
  data() {
    return {
      notices: [],
    };
  },
  methods: {
    //删除操作
    handleDelete(index, noticeId) {
      this.open(noticeId);
    },

    //是否确认删除
    open(noticeId) {
      this.$confirm("您是否确认删除该条公告？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定删除",
        cancelButtonText: "放弃删除",
      })
        .then(() => {
          //远程删除
          delNotice(noticeId).then(
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
    getNotices().then(
      (res) => {
        this.notices = res.data;
      },
      (err) => {}
    );
  },
};
</script>

<style  scoped>
</style>
