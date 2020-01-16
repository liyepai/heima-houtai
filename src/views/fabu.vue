<template>
  <div class="fabu">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 小卡片 -->
    <el-card class="box-card" style="margin-top:20px">
      <el-form ref="form" :model="post" label-width="80px">
        <!-- 标题 -->
        <el-form-item label="标题:">
          <el-input v-model="post.title"></el-input>
        </el-form-item>

        <!-- 单选框 -->
        <el-form-item label="类型:" label-width="80px">
          <el-radio-group v-model="post.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 内容 -->
        <el-form-item label="类型:" label-width="80px">
          <!-- 内容选择1：文本框 -->
          <VueEditor :config="config" v-if="post.type === 1" ref="myeditor" />
          <!-- 内容选择2：上传视频 -->
          <el-upload class="upload-demo" action="" v-if="post.type === 2">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>

        <!-- 多选框 -->
        <el-form-item label="栏目:" label-width="80px">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group
            v-model="post.categories"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox v-for="a in arr" :label="a.id" :key="a.id">{{
              a.name
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 照片墙 -->
        <el-form-item label="封面:" label-width="80px">
          <el-upload
            action="http://localhost:3000/upload"
            :headers="getToken()"
            list-type="picture-card"
            :on-success="chenggong"
            :on-remove="shanchu"
            :file-list="post.cover"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-button type="primary" @click="tijiao" id="btn">发布啦</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
import {
  getCateList,
  publishPost,
  getArticleById,
  bianji
} from "../apis/wenzhang";
//引入请求的接口

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      //   这个对象是放我们请求接口需要的数据 需要看着api文档来
      post: {
        // 标题
        title: "",
        type: 1,
        content: "",
        categories: [],
        cover: []
      },
      arr: [],

      isIndeterminate: false,
      checkAll: false,
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:3000/upload",
          name: "file",
          //需要设置请求带token认证的请求头，得用他的封装的herder
          headers: this.getToken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.data.url);
            console.log(this.post.cover.url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:3000/upload",
          name: "file",
          headers: this.getToken(),
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.data.url);
          }
        }
      }
    };
  },
  methods: {
    //这个方法是当我们点击全选框是，会触发的函数
    // val是个布尔值，点上为true 没点为false
    handleCheckAllChange(val) {
      // 怎么做到:当我们点击全部当选框时，这个全选框为true
      //   console.log(val);
      //之前我们在mounted钩子函数中有请求获取全部的栏目，如果全部的栏目与我们点击后存id的那个栏目一样 那么就是全点上
      //this.categories里存放的是id例如：[1,2,3,4...]
      //而this.arr里存的是[{1},{2},{3}]
      //为了让他们有机会相等  使用使用map 把id去出来返回一个新数组
      this.post.categories = val
        ? this.arr.map(value => {
            return value.id;
          })
        : [];
      //现在的状态已经确定了，要么全选，要么不全选
      //如果为true  那么就是还不确定可能继续点 可能不点下去了
      this.isIndeterminate = false;
    },

    //这个方法是当我们点击单选框是，会触发的函数
    handleCheckedCitiesChange(value) {
      //  如果 我们把点选的都点上 那么 这个全选的状态应该是true，之前有定义一个全选框的状态了
      //用个变量来接收 先取得数组
      let dianle = value.length; //得到的是一个长度
      //如果点上了这个长度 和我们请求栏目的长度是相等的 那么他就是全选 把全选的状态改true
      this.checkAll = dianle === this.arr.length;
      //那么他的状态还是不确定的，可能还要点 可能要取消点上的

      this.isIndeterminate = dianle > 0 && dianle < this.arr.length;
    },
    getToken() {
      let token = localStorage.getItem("token");
      return { Authorization: token };
    },

    async tijiao() {
      let res;
      ///判断是编辑还是提交
      if (this.$route.params.id) {
        //处理下点击的分类
        this.post.categories = this.post.categories.map(v => {
          return { id: v };
        });
        console.log(this.post);
        

        res = await bianji(this.$route.params.id, this.post);
        console.log(res);
       
          
        
      } else {
        //如果没有带id参数就是发布页面
        //点击提交获取文本框的内容
        //如果是内容是文本框的
        if (this.post.type === 1) {
          //获取文本框的所有内容包括图片视频文章生成的是一个字符串的结构
          this.post.content = this.$refs.myeditor.editor.root.innerHTML;
          //由于接口要求，这个存点上的栏目必须是{id：id值}的形式，需要改造
          this.post.categories = this.post.categories.map(value => {
            //返回的是一个数组， 里面是多个对象{id：value}
            return { id: value };
          });
          //发送发布的请求
          res = await publishPost(this.post);
          if (res.data.message === "文章发布成功") {
            this.$message.success("文章发布成功");
            this.$router.push({ name: "postList" });
          }
        }
      }
    },

    //封面成功后执行的代码
    chenggong(response) {
      //一档成功后，将里面返回的id以对象的形式存起来
      this.post.cover.push({ id: response.data.id });
    },
    // 一旦我们上传完，需要删除掉执行的函数
    //一旦删除，我们之前存在数组里的也需要删除
    shanchu(file) {
      // let id = file.response.data.id;

      // //在利用循环在存的数组里把他找出来删除
      // for (let i = 0; i < this.post.cover.length; i++) {
      //   if (this.post.cover[i].id === id) {
      //     this.post.cover.splice(i, 1);
      //   }
      // }
      // eslint-disable-next-line no-unused-vars
      let id = 0;
      if (this.$route.params.id) {
        id = file.id;
      } else {
        id = file.response.data.id;
      }

      for (let i = 0; i < this.post.cover.length; i++) {
        if (this.post.cover[i].id === id) {
          this.post.cover.splice(i, 1);
          break;
        }
      }
    }
  },
  async mounted() {
    let res = await getCateList();
    this.arr = res.data.data.splice(2);

    if (this.$route.params.id) {
      let obj = this.$route.params;
      console.log(obj);
      if (obj) {
        //发送请求获取数据
        let res = await getArticleById(obj.id);
        console.log(res);
        //存进数组
        this.post = res.data.data;
        //  console.log(this.newpost);
        //判断是什么类型的
        if (this.post.type === 1) {
          //  console.log(this.newpost.type);
          //  this.post.type=1
          console.log(this.post.type);
          this.$refs.myeditor.editor.clipboard.dangerouslyPasteHTML(
            0,
            this.post.content
          );
        }

        //处理路径问题 有些没有基准路径
        this.post.cover.forEach(v => {
          if (v.url.indexOf("http") === -1) {
            v.url = "http://127.0.0.1:3000" + v.url;
            console.log(v.url);
          }
        });

        //处理复选框的
        this.post.categories = this.post.categories.map(v => {
          return v.id;
        });
      }
    }
    //拿到obj  他是对象  里面有个id属性
  }
};
</script>

<style></style>
