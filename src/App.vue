<script>
export default {
  name: 'App',
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
  height: 100vh;
  border-right: 1px solid #eee;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}
.main-box {
  /* background: lightcoral; */
  padding-left: 228px;
  min-height: 100vh;
  padding-top: 0;
  padding-right: 0;
}
</style>
