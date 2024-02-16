<template>
    <div class="prompt-container">
        <v-menu
            location="bottom"
            :close-on-content-click="false"
        >
            <template v-slot:activator="{ props }">
                <v-btn
                    color="surface"
                    v-if="messageCount > 0"
                >
                    <v-badge
                        color="error"
                        :content="messageCount"
                        v-bind="props"
                        v-show="messageCount > 0"
                    >
                        <v-icon
                            color="grey"
                            icon="mdi-bell-ring-outline"
                            size="x-large"
                        >
                        </v-icon>
                    </v-badge>

                </v-btn>
                <v-btn
                    color="surface"
                    v-else
                >

                    <v-icon
                        v-bind="props"
                        color="grey"
                        icon="mdi-bell-ring-outline"
                        size="x-large"
                    >
                    </v-icon>

                </v-btn>

            </template>

            <v-list
                class="rounded-x py-0"
                width="300"
            >
                <!-- Tbas -->
                <div class="d-flex justify-center">
                    <v-tabs
                        v-model="tabRef"
                        grow
                        class="rounded-x"
                    >
                        <v-tab
                            v-for="(item, index) in tabItemList"
                            :key="index"
                            :value="index"
                            :color="item.color"
                            @click="tabHandler(item.type)"
                        >{{ item.title }}</v-tab>

                    </v-tabs>
                </div>
                <!-- List -->
                <v-list-item class="px-0">
                    <!-- <v-list-item-title>{{ item.title }}</v-list-item-title> -->
                    <!-- 消息弹窗组件 -->
                    <v-dialog
                        v-model="dialog"
                        persistent
                        eager
                        width="500"
                        v-for="(item, index) in listItemsRefComputed"
                        :key="index"
                        :value="index"
                        class="d-flex flex-column align-center justify-center"
                    >
                        <!-- 图标 与 消息 -->
                        <template v-slot:activator="{ props }">
                            <v-list-item
                                v-bind="props"
                                :active="false"
                                class="font-weight-thin"
                                @click="opneCard(item)"
                            >
                                <!-- 图标 -->
                                <template v-slot:prepend>

                                    <div class="d-flex flex-column me-2 align-center">
                                        <v-icon
                                            color="primary"
                                            icon="mdi-bell-circle"
                                            size="x-large"
                                            class=""
                                        ></v-icon>
                                    </div>

                                </template>

                                <!-- 消息 -->
                                <span
                                    class="text-truncate"
                                    :class="{ 'text-decoration-line-through': item.status === 1 }"
                                >{{ item.title }}</span>
                                <div
                                    class="text-disabled"
                                    style="font-size: 12px;"
                                >
                                    2021-09-01
                                </div>

                            </v-list-item>
                        </template>
                        <v-card>
                            <v-card-title class="text-h5">
                                {{ showCardContainerRef.title }}
                            </v-card-title>
                            <v-card-text>{{ showCardContainerRef.describe }}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="success"
                                    variant="tonal"
                                    @click="readHandler"
                                >
                                    朕已阅
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

//消息统计
const messageCount = computed(() => {
    return listItemsRef.value.filter(item => item.status === 0).length
})

// 消息Tab
const tab = null;
const tabRef = ref(tab)
const tabItemList = [
    {
        title: '全部消息',
        color: 'primary',
        type: -1
    },
    {
        title: '未读消息',
        color: 'error',
        type: 0

    },
]

/**
 * description Tab切换
 * @param {number} param - 0 未读消息 1 已读消息 -1 全部消息
 */
const tabHandler = (type) => {
    let temp;
    switch (type) {
        case 0:
            temp = listItemsOriginal.filter(item => item.status === 0)
            listItemsRef.value = temp;
            break;
        case 1:
            temp = listItemsOriginal.filter(item => item.status === 1)
            listItemsRef.value = temp;
            break;
        case -1:
            listItemsRef.value = listItemsOriginal
            break
    }
}
// 消息列表展示数据
const listItemsRef = ref([
    {
        title: '撒范德萨发生的发大水发士发撒打发',
        describe: '发生的发大水发士发撒打发afsdfsadfsdfdsafgasdfsdafadsfafdsfasd',
        status: 0,
        id: '1'
    },
    {
        title: '啊士大夫艰苦迪斯科浪费很多开始就回复',
        describe: '发生的发大水发士发撒打发afsdfsadfsdfdsafgasdfsdafadsfafdsfasd',
        status: 0,
        id: '2'
    },
    {
        title: '的方式返回十分艰苦撒旦回复',
        describe: '发生的发大水发士发撒打发afsdfsadfsdfdsafgasdfsdafadsfafdsfasd',
        status: 0,
        id: '3'
    },
    {
        title: '发动机卡号十分',
        describe: '发生的发大水发士发撒打发afsdfsadfsdfdsafgasdfsdafadsfafdsfasd',
        status: 0,
        id: '4'
    },
])

// 消息列表原始数据
const listItemsOriginal = listItemsRef.value

//超出文字长度处理
const listItemsRefComputed = computed(() => {
    const newlistItems = listItemsRef.value.map(item => {
        if (item.title.length >= 12) {
            return { ...item, title: item.title.slice(0, 12) + '...' }
        }
        return item;
    })

    return newlistItems
})


// 消息弹窗
const dialog = ref(false)



// 消息弹窗内容
let showCardContainerRef = ref({})

// 打开消息弹窗
const opneCard = (item) => {
    showCardContainerRef.value = item

}

// 关闭消息弹窗
const readHandler = () => {
    listItemsRef.value.forEach(item => {
        if (item.id === showCardContainerRef.value.id) {
            item.status = 1
        }
    });
    showCardContainerRef.value = {}
    dialog.value = false
    tabHandler(0)
}


</script>

<style lang="scss" scoped>
@import "@/main.scss";

.prompt-container {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>