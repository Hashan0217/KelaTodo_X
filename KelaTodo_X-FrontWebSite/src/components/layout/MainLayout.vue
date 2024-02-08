<template>
  <div class="container">

    <!-- 上部 -->
    <div class="top">
      <slot name="top"></slot>
    </div>

    <div class="center">
      <!-- 左侧 -->
      <div class="left">
        <slot name="left"></slot>
      </div>

      <!-- 右侧 -->
      <div class="right">
        <slot name="right"></slot>
      </div>

    </div>

  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 98vh;
  // background-color: bisque;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .top {
    width: 100%;
    flex: 0 0 70px;
  }

  .center {
    flex: 9;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .left {
      flex: 0 0 260px;
      height: 100%;
    }

    .right {
      flex: 8.5;
      height: 100%;
     
    }
  }
}
</style>
