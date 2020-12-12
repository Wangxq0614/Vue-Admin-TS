<template>
  <div class="OtherLogin">
    <a href="#"><i class="iconfont icon-weibo"></i></a>
    <a href="#"><i class="iconfont icon-qq"></i></a>
    <a href="#"><i class="iconfont icon-gongzhonghao"></i></a>
    <a href="#"> <i class="iconfont icon-github"> </i></a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "OtherLogin",
  components: {}
})
export default class OtherLogin extends Vue {}
</script>

<style lang="scss" scope>
.OtherLogin {
  width: 60%;
  height: 60px;
  margin: 15px auto 0;
  padding: 10px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 1px solid #f1f1f1;
  position: relative;
  &::before {
    content: "Other";
    width: 50px;
    height: 20px;
    line-height: 20px;
    color: #666;
    font-size: 14px;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  a {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    i {
      font-size: 30px;
      transition: all 0.1s linear;
      color: #666;
      &:hover {
        font-size: 35px;
        color: #333;
      }
    }
  }
}
</style>
