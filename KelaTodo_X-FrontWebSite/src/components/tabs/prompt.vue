<template>
    <div class="prompt-container">
        <div class="prompt-message" id="menu-activator">
            <i class="iconfont kelaIcot-lingdang "></i>
            <div></div>
        </div>
        <v-menu activator="#menu-activator" :close-on-content-click="false"  >
            <v-tabs fixed-tabs    bgColor="#ffffff"  class="rounded-t-xl"  style="z-index:99;" >
                <v-tab :rounded="10"  minWidth="150" slider-color="#fabb18"  v-for="(item,index) in tabsItemsRef" :key="index" >
                   {{ item.title }} 
                </v-tab>
            </v-tabs>
            <v-list >
                <v-list-item v-for="(item, index) in listItemsRef" :key="index" :value="index">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const listItemsRef = ref([
    { title: '首页' },
    { title: '分类' },
    { title: '标签' },
    { title: '留言' },
])

const tabsItemsRef = ref([
    { title: '未读消息'},
    { title: '全部消息'}
])

const selectedClassRef= ref([])


</script>

<style lang="scss" scoped>
.prompt-container {
    .prompt-message {
        position: relative;
        margin-right: 50px;

        i {
            font-size: 24px;
            line-height: 24px;
            text-align: center;
        }

        div {
            position: absolute;
            top: -10px;
            left: 10px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: $yellow;
        }

        .v-tabs .v-tab--active{
            background-color: white;
            color: black;
        }
        .vtabs .v-tab--hover{
            background-color: red;
        }



    }
}
</style>