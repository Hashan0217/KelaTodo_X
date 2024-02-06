<template>
    <div class="container">
        <div class="prompt-message" id="menu-activator">
            <i class="iconfont kelaIcot-lingdang "></i>
            <div></div>
        </div>
        <v-menu activator="#menu-activator" :close-on-content-click="false">
            <v-tabs fixed-tabs bg-color="indigo-darken-2" bgColor="#ffffff" style="z-index:99;">
                <v-tab :rounded="10" slider-color="#fabb18" >
                    Option
                </v-tab>
                <v-tab slider-color="#fabb18">
                    Another Option
                </v-tab>
            </v-tabs>
            <v-list>
                <v-list-item v-for="(item, index) in itemsRef" :key="index" :value="index">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const itemsRef = ref([
    { title: '首页' },
    { title: '分类' },
    { title: '标签' },
    { title: '留言' },
])

const tabsItemStylesRef = ref({
    color:'white',

})

</script>

<style lang="scss" scoped>
.container {
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
            background-color: #fabb18;
        }

        

    }
}
</style>