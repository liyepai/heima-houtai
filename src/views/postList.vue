<template>
  <div class="postlist">
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单栏 -->
    <el-table :data="postList" style="width: 100%">
      <el-table-column label="序号" width="50" type="index"></el-table-column>
      <el-table-column label="类型" width="100" prop="type">
        <template slot-scope="scope">
          {{ scope.row.type === 1 ? "文章" : "视频" }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="580"></el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="100">
      </el-table-column>

      <el-table-column label="时间" width="280" prop="user.create_date">
        <template slot-scope="scope">
          {{ scope.row.create_date | dateFormat }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" round @click="edit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分享" placement="top">
            <el-button
              type="info"
              icon="el-icon-share"
              round
              @click="kejian"
            ></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              type="danger"
              icon="el-icon-error"
              round
              @click="del(scope.row)"
            ></el-button>
          </el-tooltip>

          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="kongList">
              <el-form-item label="活动名称" :label-width="'100px'">
                <el-input auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="活动区域" :label-width="'100px'">
                <el-select placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>



      <!-- -----分页栏----- -->
      <!--切换每页显示数量列表时触发 -->
      <!-- 切换页码时触发 -->
      <!-- 当前页码 -->
      <!-- 可选择的每页显示的数量的列表 -->
      <!-- 每页显示的数量 -->
      <!-- 分页的组成部分 -->
      <!-- 记录总数，返回数据中包含着 -->
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="postIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { wenzhangliebiao } from "../apis/wenzhang";
import { dateFormat } from "../utils/shijian";
export default {
  filters: {
    dateFormat
  },
  data() {
    return {
      postList: [],
      pagesize: 2,
      postIndex: 1,
      total: 10,
      // dialogTableVisible: false,
      dialogFormVisible: false,
      kongList: []
    };
  },
  mounted() {
    // let res = await wenzhangliebiao();
    // console.log(res);
    // this.postList = res.data.data;
    this.into();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 切换每页以多少条数据展示
      this.pagesize = val;
      //重新请求
      this.into();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      //改当前的页码
      this.postIndex = val;
      this.into();
    },
    //获取列表分类的数据，封装成方法，方便调用
    async into() {
      let res = await wenzhangliebiao({
        pageSize: this.pagesize,
        postIndex: this.postIndex
      });
      this.total = res.data.total;
      this.postList = res.data.data;
    },
    del(row) {
      // console.log(1111);
      this.$confirm(`此操作将永久删除该id为：${row.id}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          }); 
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    kejian() {
      this.dialogFormVisible = true;
    },
   async edit(row){
//  console.log(row);
   this.$router.push({path:`fabu/${row.id}`})
    }
  }
};
</script>

<style></style>
