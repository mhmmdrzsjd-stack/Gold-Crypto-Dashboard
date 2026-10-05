<template>
  <header class="header">
    <div>
      <span class="date">
  
      </span>
      <h1>
        {{ pageTitle }}
      </h1>
      <p>
    
      </p>
    </div>
    <div class="actions">
      <!-- Search -->
      <div class="search">
        <span>
          ⌕
        </span>
        <input
          v-model="search"
          placeholder="Search..."
        />
        <kbd>
          /
        </kbd>
      </div>
      <!-- Notification -->
      <button
        class="notification"
        @click="notificationVisible = !notificationVisible"
      >
        🔔
        <span
          v-if="notificationVisible"
          class="notification-dot"
        ></span>
      </button>
      <!-- Profile -->
      <div class="profile">
        <div class="avatar">
          M
        </div>
        <div>
          <strong>
            Mohammad
          </strong>
          <small>
            Premium
          </small>
        </div>
      </div>
    </div>
    <!-- Notification Popup -->
    <div
      v-if="notificationVisible"
      class="notification-popup"
    >
      <strong>
        Notifications
      </strong>
      <p>
        BTC increased by 3.42%
      </p>
      <p>
        Gold increased by 1.26%
      </p>
    </div>
  </header>
</template>
<script setup lang="ts">
import {
  computed,
  ref
} from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const search = ref('')
const notificationVisible = ref(false)
const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    dashboard: 'Dashboard',
    markets: 'Markets',
    gold: 'Gold',
    crypto: 'Crypto',
    portfolio: 'Portfolio',
    transactions: 'Transactions',
    settings: 'Settings'
  }
  return titles[route.name as string] || 'Dashboard'
})
</script>
