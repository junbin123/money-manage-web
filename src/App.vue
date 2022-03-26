<script>
// import { ElContainer, ElAside, ElMain, ElDialog } from 'element-plus'
export default {
  name: 'App',
  // components: { ElContainer, ElAside, ElMain, ElDialog },
  setup() {},
}
</script>

<template>
  <div>
    <ElContainer>
      <ElAside width="228px" class="aside-box">
        <Sidebar />
      </ElAside>
      <ElMain class="main-box">
        <RouterView />
      </ElMain>
    </ElContainer>
  </div>
</template>

<style scoped>
.aside-box {
  /* background: lightblue; */
  min-height: 100vh;
  border-right: 1px solid #eee;
}
.main-box {
  /* background: lightcoral; */
  min-height: 100vh;
  padding: 0;
}
</style>
