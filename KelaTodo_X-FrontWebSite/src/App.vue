
<template>
  <MainLayout class="container">
    <template #top>
      <div>
        <Taber></Taber>
      </div>
    </template>
  </MainLayout>
</template>


<script setup>
  import MainLayout from "@/components/layout/MainLayout.vue";
  import Taber from '@/components/tabs/Taber.vue';
</script>


<style lang="scss" scoped>
  .container{
    height: 100vh;
    width: 100%;
    background-color: #f9f9f9;
  }
</style>
