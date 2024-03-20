<template>
    <template v-for="item in menuList" :key="item.path">
        <!--没有子路由-->
        <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <template #title>
                {{ item.meta.title }}
            </template>
        </el-menu-item>
        <!-- 有子路由 -->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 0">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>
                    {{ item.meta.title }}
                </span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">

defineProps(['menuList'])

</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style lang="scss" scoped></style>