<script>
export default {
  name: 'App',
  setup() {},
}
</script>

<template>
  <div>
    <ElContainer>
      <ElAside width="228px" class="aside-box hidden sm:block">
        <Sidebar />
      </ElAside>
      <ElMain class="main-box">
        <div class="sm:pl-[228px]">
          <RouterView />
        </div>
      </ElMain>
      <div
        class="tabbar w-screen fixed block sm:hidden flex justify-center items-center border-t bg-slate-50"
      >
        <a
          target="_blank"
          href="https://github.com/junbin123/money-manage-web"
          class="text-base flex items-center hover:bg-slate-200 h-8 rounded-md py-2"
        >
          <div class="ml-2 iconfont icon-github"></div>
          <div class="pl-1 pr-2">GitHub</div>
        </a>
      </div>
    </ElContainer>
  </div>
</template>

<style scoped>
.aside-box {
  height: 100vh;
  border-right: 1px solid #eee;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}
.main-box {
  min-height: 100vh;
  padding: 0;
}
.tabbar {
  height: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
