<template>
  <div class="page">
    <Header />

    <div class="portfolio">

      <span>
        PORTFOLIO
      </span>

      <!-- Loading -->
      <div
        v-if="loading"
        class="state-message"
      >
        در حال دریافت اطلاعات...
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="state-message error"
      >
        {{ error }}
      </div>

      <!-- Portfolio -->
      <template v-else>

        <div class="balance">

          <small>
            Total Balance
          </small>

          <strong>
            {{ formatPrice(totalBalance) }}
          </strong>

          <b>
            {{ formatChange(change) }}
          </b>

        </div>

        <div class="portfolio-grid">

          <div class="portfolio-card">

            <span>
              GOLD
            </span>

            <strong>
              {{ formatPrice(gold) }}
            </strong>

            <b>
              {{ goldPercent.toFixed(0) }}%
            </b>

          </div>

          <div class="portfolio-card">

            <span>
              CRYPTO
            </span>

            <strong>
              {{ formatPrice(crypto) }}
            </strong>

            <b>
              {{ cryptoPercent.toFixed(0) }}%
            </b>

          </div>

        </div>

      </template>

    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  onUnmounted
} from 'vue'

import {
  storeToRefs
} from 'pinia'

import Header from '../components/Header.vue'

import {
  usePortfolioStore
} from '../stores/portfolioStore'

const portfolioStore =
  usePortfolioStore()

const {
  gold,
  crypto,
  totalBalance,
  goldPercent,
  cryptoPercent,
  change,
  loading,
  error
} = storeToRefs(portfolioStore)

let refreshInterval:
  ReturnType<typeof setInterval> | null = null

onMounted(async () => {

  // دریافت اولیه
  await portfolioStore.fetchPortfolio()

  // بروزرسانی هر 5 ثانیه
  refreshInterval = setInterval(() => {
    portfolioStore.fetchPortfolio()
  }, 5000)

})

onUnmounted(() => {

  if (refreshInterval) {
    clearInterval(refreshInterval)

    refreshInterval = null
  }

})

const formatPrice = (
  price: number
): string => {

  return new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }
  ).format(price)

}

const formatChange = (
  value: number
): string => {

  return `${
    value >= 0 ? '+' : ''
  }${value.toFixed(2)}%`

}
</script>