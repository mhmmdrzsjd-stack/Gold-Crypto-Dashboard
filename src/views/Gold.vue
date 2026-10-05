<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import Header from '../components/Header.vue'
import { useGoldStore } from '../stores/goldStore'

const goldStore = useGoldStore()

const {
  price,
  currency,
  symbol,
  unit,
  updatedAtReadable,
  loading,
  error
} = storeToRefs(goldStore)

let priceInterval: ReturnType<typeof setInterval> | null = null

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.value || 'USD',
    maximumFractionDigits: 2
  }).format(value)
}

onMounted(async () => {
  // دریافت قیمت اولیه
  await goldStore.fetchGold()

  // بروزرسانی خودکار قیمت هر 5 ثانیه
  priceInterval = setInterval(() => {
    goldStore.fetchGold()
  }, 5000)
})

onUnmounted(() => {
  if (priceInterval) {
    clearInterval(priceInterval)
    priceInterval = null
  }
})
</script>

<template>
  <div class="page">

    <Header />

    <div class="gold">

      <!-- Title -->
      <span class="gold-label">
        GOLD MARKET
      </span>

      <!-- Live -->
      <div class="gold-live">

        <span
          class="gold-live-dot"
          :class="{ loading }"
        ></span>

        <div class="gold-live-info">

          <strong>
            {{ loading ? 'UPDATING' : 'LIVE' }}
          </strong>

          <span>
            {{ loading ? 'Updating gold price...' : 'Gold market is live' }}
          </span>

        </div>

      </div>

      <!-- Loading -->
      <div
        v-if="loading && !price"
        class="state-message"
      >
        Loading gold data...
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="state-message error"
      >
        {{ error }}
      </div>

      <!-- Data -->
      <template v-else>

        <!-- Main Price -->
        <div class="gold-main">

          <div>

            <span>
              {{ symbol }} / {{ currency }}
            </span>

            <h1>
              {{ formatPrice(price) }}
            </h1>

            <b class="positive">
              Live Spot Price
            </b>

          </div>

          <div class="gold-unit">

            <small>
              Unit
            </small>

            <strong>
              {{ unit }}
            </strong>

          </div>

        </div>

        <!-- Gold Cards -->
        <div class="gold-grid">

          <div class="gold-card">

            <span>
              PRICE
            </span>

            <strong>
              {{ formatPrice(price) }}
            </strong>

          </div>

          <div class="gold-card">

            <span>
              SYMBOL
            </span>

            <strong>
              {{ symbol }}
            </strong>

          </div>

          <div class="gold-card">

            <span>
              CURRENCY
            </span>

            <strong>
              {{ currency }}
            </strong>

          </div>

          <div class="gold-card">

            <span>
              UNIT
            </span>

            <strong>
              {{ unit }}
            </strong>

          </div>

        </div>

        <!-- API Information -->
        <div class="gold-info">

          <div>

            <span>
              MARKET
            </span>

            <strong>
              Gold Spot
            </strong>

          </div>

          <div>

            <span>
              API UPDATED
            </span>

            <strong>
              {{ updatedAtReadable || '-' }}
            </strong>

          </div>

          <div>

            <span>
              STATUS
            </span>

            <strong class="live-text">
              {{ loading ? 'Updating...' : 'Live' }}
            </strong>

          </div>

        </div>

      </template>

    </div>

  </div>
</template>