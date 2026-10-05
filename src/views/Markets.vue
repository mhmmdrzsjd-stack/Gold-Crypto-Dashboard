<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  ref
} from 'vue'

import { storeToRefs } from 'pinia'
import { useMarketStore } from '../stores/marketStore'

const marketStore = useMarketStore()

const {
  markets,
  loading,
  error,
  lastUpdated
} = storeToRefs(marketStore)

const liveTime = ref(new Date())

let refreshInterval: ReturnType<typeof setInterval> | null = null
let clockInterval: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  await marketStore.fetchMarkets()

  refreshInterval = setInterval(() => {
    marketStore.fetchMarkets()
  }, 5000)

  clockInterval = setInterval(() => {
    liveTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
    refreshInterval = null
  }

  if (clockInterval) {
    clearInterval(clockInterval)
    clockInterval = null
  }
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(price)
}

const formatChange = (change: number) => {
  return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`
}

const formattedLiveTime = computed(() => {
  return liveTime.value.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
})

const formattedLastUpdated = computed(() => {
  if (!lastUpdated.value) {
    return '--:--:--'
  }

  return lastUpdated.value.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
})
</script>

<template>
  <div class="markets-page">

    <!-- Header -->
    <div class="page-header">

      <div>
        <h1>Markets</h1>

        <p>
          Live cryptocurrency prices
        </p>
      </div>

      <!-- Live Status -->
      <div class="live-status">

        <span class="live-dot"></span>

        <div class="live-info">

          <strong>
            {{ loading ? 'Updating' : 'Live' }}
          </strong>

          <span>
            {{ formattedLiveTime }}
          </span>

          <small>
            Prices updated:
            {{ formattedLastUpdated }}
          </small>

        </div>

      </div>

    </div>

    <!-- Loading -->
    <div
      v-if="loading && markets.length === 0"
      class="state-message"
    >
      در حال دریافت اطلاعات بازار...
    </div>

    <!-- Error -->
    <div
      v-else-if="error && markets.length === 0"
      class="state-message error"
    >
      {{ error }}
    </div>

    <!-- Markets -->
    <div
      v-else
      class="markets-list"
    >

      <div
        v-for="market in markets"
        :key="market.id"
        class="market-row"
      >

        <!-- Name -->
        <div class="market-info">

          <div class="market-name">
            {{ market.name }}
          </div>

          <div class="market-symbol">
            {{ market.symbol }}
          </div>

        </div>

        <!-- Price -->
        <div class="market-price">
          {{ formatPrice(market.price) }}
        </div>

        <!-- Change -->
        <div
          class="market-change"
          :class="{
            positive: market.change >= 0,
            negative: market.change < 0
          }"
        >
          {{ formatChange(market.change) }}
        </div>

      </div>

    </div>

  </div>
</template>