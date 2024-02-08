<template>
    <div class="search-container">
        <div class="search">
                <input type="text" value="请输入搜索内容">
                <i class="iconfont kelaIcot-sousuo"></i>
            </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.search-container{
    .search {
            position: relative;
            input {
                width: 309px;
                height: 38px;
                padding-left: 20px;
                outline-style: none;
                border-radius: 10px;
                border: none;
                background-color: #f7f7f7;
            }
            i {
                position: absolute;
                right: 18px;
                bottom: 12px;
            }
            
        }

}

</style>