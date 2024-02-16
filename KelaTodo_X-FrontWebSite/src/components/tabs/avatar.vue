<template>
    <div class="avatar-containre">
        <div class="user">
            <div class="info">
                <div
                    class="name"
                    dir="rtl"
                    style="direction: rtl;"
                >Hashan</div>
                <!-- <div class="dis">
                    frontWeb
                </div> -->
            </div>
            <v-container>
                <v-row justify="center">
                    <v-menu
                        min-width="200px"
                        rounded
                    >
                        <template v-slot:activator="{ props }">
                            <v-btn
                                icon
                                v-bind="props"
                            >
                                <v-avatar size="46px">
                                    <v-img
                                        alt="Avatar"
                                        cover
                                        src="https://th.bing.com/th?id=OIP.WysRo7MngIpnkjp5_7Xp2gAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                                    ></v-img>
                                </v-avatar>
                            </v-btn>
                        </template>
                        <v-card
                            width="250"
                            class="rounded-xl"
                        >
                            <v-card-text>
                                <div class="mx-auto text-center">
                                    <div class="d-flex align-center justify-space-around">
                                        <v-avatar size="66px">
                                            <v-img
                                                alt="Avatar"
                                                cover
                                                src="https://th.bing.com/th?id=OIP.WysRo7MngIpnkjp5_7Xp2gAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                                            ></v-img>
                                        </v-avatar>
                                        <div class="d-flex flex-column">
                                            <h2>{{ user.fullName }}</h2>
                                            <p class="text-caption mt-1">
                                                {{ user.email }}
                                            </p>
                                        </div>
                                    </div>
                                    <v-divider class="my-4"></v-divider>
                                    <div class="d-flex flex-column">
                                        <v-btn
                                            rounded
                                            variant="text"
                                            v-for="(item, index) in avatarMenuList"
                                            :key="index"
                                            size="large"
                                            class="d-flex align-center justify-center"
                                        >

                                            <template v-slot:prepend>
                                                <v-icon
                                                    class="iconfont "
                                                    :class="{ [item.icon]: true }"
                                                ></v-icon>
                                            </template>
                                            <span style="margin-left: 10px;"> {{ item.title }}</span>
                                        </v-btn>
                                    </div>

                                </div>
                            </v-card-text>
                        </v-card>
                    </v-menu>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"

const user = {
    initials: 'HS',
    fullName: 'Hashan',
    email: 'Hashan@88.com',
    avatarurl: ''
}

const avatarMenuList = ref([
    {
        title: '个人主页',
        icon: 'kelaIcot-gerenzhuye',
        type: 'user',
    },
    {
        title: '主题切换',
        icon: 'kelaIcot-zhuti',
        type: 'theme',
    }
])


</script>

<style lang="scss" scoped>
.avatar-containre {
    .user {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .info {
            display: flex;
            margin-right: 10px;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

            .name {
                font-size: 20px;
                color: black;
                font-weight: 800;
                text-align: right;
            }

            .dis {
                font-size: 18px;
                color: #4e4c4c;
                text-align: right;
            }
        }

    }
}</style>