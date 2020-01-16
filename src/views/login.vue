<template>
  <div class="login">
    <div class="container">
      <img src="../assets/avatar.jpg" alt="" class="avatar" />
      <el-form :model="loginForm" :rules="rules1" ref="ruleForm">
        <!--表单验证prop 必填属性-->
        <el-form-item prop="username">
          <el-input
            autofocus           
            v-model="loginForm.username"  
            placeholder="请输入用户名"
            prefix-icon="icon-user"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入用户密码"
            prefix-icon="icon-key"
           @keyup.enter.native='huiche'
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login-btn" @click="denglu"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "../apis/user";
export default {
  data() {
    return {
      //v-form标签绑定的对象
      loginForm: {
        username: "",
        password: ""
      },
      //表单验证规则
      rules1: {
        //el-form-item标签里的prop属性，此属性是绑定一个判断规则的数组
        username: [
          // 这是一条规则，可以多条
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 16, message: "请输入3-16位的密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    denglu() {
      this.$refs.ruleForm.validate(async v => {
        if (v) {
          let res = await login(this.loginForm);
          if (res.data.message === "登录成功") {
            //使用Message 消息提示 组件
            this.$message({
              message: res.data.message,
              type: "success"
            });
            localStorage.setItem("token", res.data.data.token);
            console.log();
            
            localStorage.setItem("userImg", 'http://localhost:3000'+res.data.data.user.head_img);
            this.$router.push({ name: "Index" });
          } else {
            //使用Message 消息提示 组件
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error("请先输入");
        }
      });
    },
    //  @keyup.enter.native='huiche'是使用回车调用登录
    huiche( ){
      this.denglu();
    }
  }
};
</script>

<style lang="less">
//整体样式
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  //包着整个全部组件的div的样式
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    //图片的样式
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
