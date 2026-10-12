
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()

// Hide sidebar on Signup page
const hideSidebar = computed(() => {
  return route.path === '/signup' || route.path === '/singup'
})
</script>

<template>
  <div class="app">

    <!-- Sidebar -->
    <Sidebar v-if="!hideSidebar" />

    <!-- Main Content -->
    <main class="main" :class="{ 'signup-main': hideSidebar }">
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

/* Signup page without sidebar */
.signup-main {
  width: 100%;
  padding: 0;
}

@media (max-width: 700px) {
  .main {
    padding: 20px;
  }

  .signup-main {
    padding: 0;
  }
}
</style>
