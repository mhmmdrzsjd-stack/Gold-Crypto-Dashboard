<template>

  <aside class="sidebar">
    <!-- Logo -->
    <div class="logo">
      <div class="logo-icon">
        ◆
      </div>
      <span>
        FINORA
      </span>
    </div>
    <!-- Navigation -->
    <nav class="menu">
      <RouterLink
        to="/"
        class="menu-item"
      >
        <span>⌂</span>
        Dashboard
      </RouterLink>
      <RouterLink
        to="/markets"
        class="menu-item"
      >
        <span>◈</span>
        Markets
      </RouterLink>
      <RouterLink
        to="/gold"
        class="menu-item"
      >
        <span>Au</span>
        Gold
      </RouterLink>
      <RouterLink
        to="/crypto"
        class="menu-item"
      >
        <span>₿</span>
        Crypto
      </RouterLink>
      <RouterLink
        to="/portfolio"
        class="menu-item"
      >
        <span>▣</span>
        Portfolio
      </RouterLink>
      <RouterLink
        to="/transactions"
        class="menu-item"
      >
        <span>◷</span>
        Transactions
      </RouterLink>
    </nav>
    <!-- Bottom Menu -->
    <div class="bottom">
      <RouterLink
        to="/settings"
        class="menu-item"
      >
        <span>⚙</span>
        Settings
      </RouterLink>
      <button
        class="menu-item help"
        @click="showHelp"
      >
        <span>?</span>
        Help Center
      </button>
    </div>
    <!-- User -->
    <div class="user">
      <div class="avatar">
        M
      </div>
      <div class="user-info">
        <strong>
          Mohammad
        </strong>
        <small>
          Premium User
        </small>
      </div>
    </div>
    <!-- Help Popup -->
    <div
      v-if="helpVisible"
      class="help-popup"
    >
      <strong>
        Help Center
      </strong>
      <p>
        Welcome to Finora.
      </p>
      <button @click="helpVisible = false">
        Close
      </button>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const helpVisible = ref(false)
const showHelp = () => {
  helpVisible.value = true
}
</script>