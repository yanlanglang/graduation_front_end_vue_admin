<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
// 初始element-ui版本-
// "element-ui": "2.7.2",
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
}
</script>
<style lang="scss">
.root{
  margin: 50px 25px 0px 25px
}
.my-flex{
  display: flex;
}
</style>
