<template>
    <div class="avatar-containre">
        <div class="user">
                <div class="info">
                    <div class="name">Hashan</div>
                    <div class="dis">
                        frontWeb
                    </div>
                </div>
                <div class="avatar">
                   <img src="@/assets/images/avatar.png" alt="">
                </div>
            </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.avatar-containre{
    .user{
            display: flex;
            align-items: center;
            justify-content: space-around;
            .info{
                display: flex;
                margin-right: 10px;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                .name{
                    font-size: 20px;
                    color: black;
                    font-weight: 800;
                    text-align: right;
                }
                .dis{
                    font-size: 18px;
                    color: #4e4c4c;
                    text-align: right;
                }
            }
            .avatar{
                width: 52px;
                height: 52px;
                border-radius: 50%;
                
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }
            

        }
}

</style>