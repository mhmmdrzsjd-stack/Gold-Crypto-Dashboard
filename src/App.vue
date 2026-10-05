<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
</script>
<template>
  <div class="app">
    <Sidebar />
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>
<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  background: #090b10;
  color: white;
}
.main {
  flex: 1;
  min-width: 0;
  padding: 32px 35px;
}
@media (max-width: 700px) {
  .main {
    padding: 20px;
  }
}
</style>