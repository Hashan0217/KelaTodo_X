<template>
   <v-layout class="rounded rounded-md">
      <v-navigation-drawer>
        <slot name="left"></slot>
      </v-navigation-drawer>

      <v-app-bar>
        <slot name="top"></slot>
      </v-app-bar>

      <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
        <slot name="right"></slot>
      </v-main>
    </v-layout>
</template>

<script setup></script>

<style lang="scss" scoped>

</style>
