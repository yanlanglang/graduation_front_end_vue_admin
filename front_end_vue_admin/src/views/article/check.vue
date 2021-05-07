<template>
  <el-container>
    <el-main>
      <el-table :data="page.content" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="标题">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="简介">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="文章分类">
                <span>{{ props.row.type.name }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime | timeFormat }}</span>
              </el-form-item>
              <el-form-item label="浏览次数">
                <span>{{ props.row.views }}</span>
              </el-form-item>
              <el-form-item label="内容">
                <p class="articleContent" v-html="props.row.content"></p>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="文章 ID" prop="id"> </el-table-column>
        <el-table-column label="标题" prop="title"> </el-table-column>
        <el-table-column label="简述" prop="description"> </el-table-column>
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

      <!--分页-->
      <div class="block">
        <!-- :hide-on-single-page="hideFlag" -->
        <el-pagination
          align="center"
          @current-change="handleCurrentChange"
          @prev-click="handlePrev"
          @next-click="handleNext"
          layout="total,prev, pager, next, jumper"
          :page-size="page.size"
          :total="page.totalElements"
        >
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { getAllCustomerArticles, delArticle } from "@/api/article";

export default {
  name: "articleCheck",
  components: {},
  data() {
    return {
      //当前分页的全部信息
      page: {},
    };
  },
  methods: {
    //删除操作
    handleDelete(index, articleId) {
      console.log(index, articleId);
      this.open(articleId);

      //刷新页面(强制刷新)
      this.$router.go(0);

    },

    //是否确认删除
    open(articleId) {
      this.$confirm("您是否确认删除该篇文章？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定删除",
        cancelButtonText: "放弃删除",
      })
        .then(() => {
          //远程删除
          delArticle(articleId).then(
            (res) => {
              this.$message({
                type: "success",
                message: "删除成功",
              });
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

    /*换页的三个方法 提取出来的公共部分，此处的page代表需要跳转的页码*/
    changePageNumber(page) {
      getAllCustomerArticles(page).then(
        (res) => {
          this.page = res.data;
        },
        (err) => {}
      );
    },

    /*选择页码数时触发*/
    handleCurrentChange(val) {
      this.changePageNumber(val - 1);
    },
    /*点击上一页时触发*/
    handlePrev() {
      this.changePageNumber(this.page.number - 1);
    },
    /*点击下一页时触发*/
    handleNext() {
      this.changePageNumber(this.page.number + 1);
    },
  },
  mounted() {
    getAllCustomerArticles().then(
      (res) => {
        this.page = res.data;
      },
      (err) => {}
    );
  },
};
</script>

<style  scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.articleContent {
  padding: 10px;
  border: 1px solid rgb(0, 0, 0);
  width: 100%;
}
</style>
