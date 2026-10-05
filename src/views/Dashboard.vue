<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Header from '../components/Header.vue'
import NavCard from '../components/NavCard.vue'
import { useMarketStore } from '../stores/marketStore'

const marketStore = useMarketStore()

const selectedRange = ref<'1H' | '1D' | '1W' | '1M' | '1Y'>('1D')

const chartPrices = ref<number[]>([])
const chartLabels = ref<string[]>([])
const chartLoading = ref(false)

let refreshInterval: ReturnType<typeof setInterval> | null = null

const rangeDays = computed(() => {
  switch (selectedRange.value) {
    case '1H':
      return 1 / 24

    case '1D':
      return 1

    case '1W':
      return 7

    case '1M':
      return 30

    case '1Y':
      return 365

    default:
      return 1
  }
})

const bitcoin = computed(() => {
  return marketStore.markets.find(
    market => market.id === 'bitcoin'
  )
})

const bitcoinPrice = computed(() => {
  return bitcoin.value?.price ?? 0
})

const bitcoinChange = computed(() => {
  return bitcoin.value?.change ?? 0
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

/* گرفتن اطلاعات نمودار */
const fetchChartData = async () => {
  chartLoading.value = true

  try {
    const days = rangeDays.value

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`
    )

    if (!response.ok) {
      throw new Error(
        `Chart API Error: ${response.status}`
      )
    }

    const data = await response.json()

    const prices = data.prices ?? []

    chartPrices.value = prices.map(
      (item: [number, number]) => item[1]
    )

    chartLabels.value = prices.map(
      (item: [number, number]) => {
        const date = new Date(item[0])

        return date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    )
  } catch (error) {
    console.error(
      '❌ Chart Error:',
      error
    )

    chartPrices.value = []
    chartLabels.value = []
  } finally {
    chartLoading.value = false
  }
}

/* ساخت نقاط SVG */
const chartPoints = computed(() => {
  if (chartPrices.value.length < 2) {
    return ''
  }

  const width = 1000
  const height = 300

  const min = Math.min(...chartPrices.value)
  const max = Math.max(...chartPrices.value)

  const difference = max - min || 1

  return chartPrices.value
    .map((price, index) => {
      const x =
        (index /
          (chartPrices.value.length - 1)) *
        width

      const y =
        height -
        ((price - min) / difference) *
          (height - 30) -
        15

      return `${x},${y}`
    })
    .join(' ')
})

/* محدوده نمودار */
const chartMin = computed(() => {
  if (!chartPrices.value.length) {
    return 0
  }

  return Math.min(...chartPrices.value)
})

const chartMax = computed(() => {
  if (!chartPrices.value.length) {
    return 0
  }

  return Math.max(...chartPrices.value)
})

/* تغییر بازه */
const changeRange = async (
  range: '1H' | '1D' | '1W' | '1M' | '1Y'
) => {
  selectedRange.value = range

  await fetchChartData()
}

onMounted(async () => {
  await marketStore.fetchMarkets()

  await fetchChartData()

  /*
    هر ۵ ثانیه:
    قیمت بازار + نمودار دوباره آپدیت می‌شوند
  */
  refreshInterval = setInterval(async () => {
    await marketStore.fetchMarkets()
    await fetchChartData()
  }, 5000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
    refreshInterval = null
  }
})
</script>

<template>
  <div class="page">

    <Header />

    <NavCard />

    <!-- Chart -->
    <section class="chart">

      <div class="chart-head">

        <div>
          <span>
            BTC / USD
          </span>

          <h2>
            {{ formatPrice(bitcoinPrice) }}
          </h2>

          <b
            :class="{
              positive: bitcoinChange >= 0,
              negative: bitcoinChange < 0
            }"
          >
            {{ formatChange(bitcoinChange) }}
          </b>
        </div>

        <!-- Filters -->
        <div class="filters">

          <button
            :class="{ active: selectedRange === '1H' }"
            @click="changeRange('1H')"
          >
            1H
          </button>

          <button
            :class="{ active: selectedRange === '1D' }"
            @click="changeRange('1D')"
          >
            1D
          </button>

          <button
            :class="{ active: selectedRange === '1W' }"
            @click="changeRange('1W')"
          >
            1W
          </button>

          <button
            :class="{ active: selectedRange === '1M' }"
            @click="changeRange('1M')"
          >
            1M
          </button>

          <button
            :class="{ active: selectedRange === '1Y' }"
            @click="changeRange('1Y')"
          >
            1Y
          </button>

        </div>

      </div>

      <!-- Chart -->
      <div class="graph">

        <div
          v-if="chartLoading"
          class="chart-loading"
        >
          Loading chart...
        </div>

        <svg
          v-else-if="chartPoints"
          viewBox="0 0 1000 300"
          preserveAspectRatio="none"
        >

          <!-- Grid -->
          <line
            x1="0"
            y1="75"
            x2="1000"
            y2="75"
            class="grid-line"
          />

          <line
            x1="0"
            y1="150"
            x2="1000"
            y2="150"
            class="grid-line"
          />

          <line
            x1="0"
            y1="225"
            x2="1000"
            y2="225"
            class="grid-line"
          />

          <!-- Chart line -->
          <polyline
            :points="chartPoints"
            fill="none"
            stroke="#d9b85a"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

        </svg>

        <div
          v-else
          class="chart-loading"
        >
          No chart data
        </div>

      </div>

      <!-- Chart info -->
      <div class="chart-info">

        <span>
          Low:
          {{ formatPrice(chartMin) }}
        </span>

        <span>
          High:
          {{ formatPrice(chartMax) }}
        </span>

      </div>

    </section>


    <!-- Market Table -->
    <section class="table">

      <div class="table-title">

        <div>
          <span>
            MARKET
          </span>

          <h2>
            Market Overview
          </h2>
        </div>

        <RouterLink to="/markets">
          View All →
        </RouterLink>

      </div>


      <div
        v-for="market in marketStore.markets"
        :key="market.id"
        class="row"
      >

        <strong>
          {{ market.name }}
        </strong>

        <span>
          {{ market.symbol }}
        </span>

        <b>
          {{ formatPrice(market.price) }}
        </b>

        <i
          :class="{
            positive: market.change >= 0,
            negative: market.change < 0
          }"
        >
          {{ formatChange(market.change) }}
        </i>

        <span>
          {{ market.type }}
        </span>

      </div>

    </section>

  </div>
</template>