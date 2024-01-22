
<template>
    <div class="grand-son">
        这是孙组件
    </div>
</template>
<script>
    export default {
        name:'GrandSon',
        mounted() {
            //这样孙组件通过emit触发Parent组件中的监听函数  让后代组件触发祖先组件
            console.log('this.$listeners',this.$listeners) // {eventOne: fn}
            console.log('this.$attrs',this.$attrs);
            this.$emit('eventOne') //可以触发Parent组件中的eventHandler函数
        }
    }
</script>
<style>
.grand-son{
    background: deeppink;
    height: 50px;
}
</style>