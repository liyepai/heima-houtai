<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <!-- 左栏 -->
        <!-- <img src="../assets/logo.png" class="logo" alt=""> -->
        <div class="hezi">
          <!-- <img :src="user.head_img" class="imgs" alt="" /> -->
        <img   src="../assets/微信图片_20200105161555.jpg" class="imgs" alt="">
        </div>
        <el-menu
          :router="true"
          :unique-opened="true"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>用户登录</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-wind-power"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/index/postList">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>文章列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/index/fabu">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>文章发布</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>栏目管理</span>
            </template>
            <el-menu-item index="3-1">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>栏目列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <span class="el-icon-s-fold toggle-btn"></span>
          <span></span>
          <span class="system-title">黑马头条后台管理</span>
          <div class="welcome">
            <span>传智欢迎您！</span>&nbsp;&nbsp;&nbsp;
            <span>退出</span>
          </div>
        </el-header>
        <!-- 主要内容展示位置展示的位置 -->

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>


export default {
  data () {
    return {
      data () {
        return {
          userimg:localStorage.getItem('userImg')
        }
      }
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
     
    },
  },

};
</script>

<style lang="less" socder>
.index {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    border-right: none;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 50px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
  .hezi {
    width: 200px;
    height: 150px;
    background-color: #545c64;
    position: relative;
    .imgs {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      background-color: #545c64;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -50px;
      margin-left: -50px;
    }
  }
}
</style>
  