<template>
  <div class="taber-container">
    <div class="d-flex align-center justify-space-between">
       
       <div>
          <v-sheet>
            <Commonly />
          </v-sheet>
        </div>

        <div class="d-flex align-center justify-space-between">
           <v-sheet>
            <Search />
          </v-sheet>

          <v-sheet>
            <Prompt  />
          </v-sheet>

          <v-sheet>
            <Avatar />
          </v-sheet>
        </div>

      </div>
  </div>
</template>

<script setup>
import Commonly from "@/components/tabs/Commonly.vue";
import Search from "@/components/tabs/Search.vue";
import Prompt from "@/components/tabs/Prompt.vue";
import Avatar from "@/components/tabs/Avatar.vue";
</script>

<style lang="scss" scoped>
.taber-container{
  padding-left: 60px;
  padding-right: 40px;
}
</style>