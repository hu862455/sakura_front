<template>
  <el-container style="border: 1px solid #eee;min-height:800px">
    <el-aside style="width: 225px;">
      <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>
              50音图
            </span>
          </template>
          <el-menu-item index="1-1" style="padding-left: 88px" @click="show('qingyin')">
            清音
          </el-menu-item>
          <el-menu-item index="1-2" style="padding-left: 88px" @click="show('zhuoyin')">浊音</el-menu-item>
          <el-menu-item index="1-3" style="padding-left: 88px" @click="show('banzhuoyin')">半浊音</el-menu-item>
          <el-menu-item index="1-4" style="padding-left: 88px" @click="show('aoyin')">拗音</el-menu-item>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main style="border: 1px solid #eee">
      <Py :name="name" v-if="hackReset"></Py>
    </el-main>
  </el-container>
</template>

<script>
  import Py from './50yin'
  export default {
    name: "HelloWorld",
    data() {
      return {
        isCollapse: true,
        name: '',
        hackReset: ''
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      show(name) {
        this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
        })
        this.name = name;
      }
    },
    components: {
      Py
    }
  };

</script>
<!--Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-main {
    padding: 2px
  }

  .el-menu-item {
    padding-left: 88px
  }

</style>
