<template>
  <div class="page">
    <Header />
    <div class="settings">
      <span>
        SETTINGS
      </span>
      <h2>
        Settings
      </h2>
      <div class="setting">
        <div>
          <strong>
            Dark Mode
          </strong>
          <p>
            Use dark interface
          </p>
        </div>
        <button
          class="toggle"
          :class="{ active: darkMode }"
          @click="darkMode = !darkMode"
        >
          {{ darkMode ? 'ON' : 'OFF' }}
        </button>
      </div>
      <div class="setting">
        <div>
          <strong>
            Notifications
          </strong>
          <p>
            Receive market notifications
          </p>
        </div>
        <button
          class="toggle"
          :class="{ active: notifications }"
          @click="notifications = !notifications"
        >
          {{ notifications ? 'ON' : 'OFF' }}
        </button>
      </div>
      <div class="setting">
        <div>
          <strong>
            Currency
          </strong>
          <p>
            Display currency
          </p>
        </div>
        <select v-model="currency">
          <option>
            USD
          </option>
          <option>
            EUR
          </option>
          <option>
            GBP
          </option>
        </select>
      </div>
      <div class="saved">
        Current currency:
        <strong>
          {{ currency }}
        </strong>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Header from '../components/Header.vue'
const darkMode = ref(true)
const notifications = ref(true)
const currency = ref('USD')
</script>