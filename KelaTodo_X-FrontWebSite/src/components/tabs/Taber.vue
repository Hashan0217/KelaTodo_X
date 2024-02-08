<template>
    <div class="taber-container">
        <div class="left">
            <div class="logo">KELATODO<span style="color: #fabb18;">-X</span></div>
            <commonly></commonly>
        </div>
        <div class="right">
            <search class="search"></search>
            <prompt class="prompt"></prompt>
            <avatar class="avatar"></avatar>
        </div>
    </div>
</template>

<script setup>
    import commonly from '@/components/tabs/commonly.vue'
    import search from "@/components/tabs/search.vue"
    import prompt from "@/components/tabs/prompt.vue"
    import avatar from "@/components/tabs/avatar.vue"
</script>

<style lang="scss" scoped>

.taber-container {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
   

    .left {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-left: 20px;
        .logo {
            width: 300px;
            font-size: 32px;
            font-weight: bold;
        }
      
    }

    .right {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        .search {
            margin-right: 50px;

        }

        .prompt{

            margin-right: 10px;
           

        }
        .avatar{
            margin-right: 50px;
        }
    
    }

}</style>