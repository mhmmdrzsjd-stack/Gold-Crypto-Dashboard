<script setup lang="ts">
import { onMounted } from 'vue'
import Header from '../components/Header.vue'
import { useMarketStore } from '../stores/marketStore'
const marketStore = useMarketStore()
onMounted(() => {
  marketStore.fetchMarkets()
})
const coins = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL'
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB'
  }
]
</script>
<template>
  <div class="page">
    <Header />
    <div class="title">
      <span>
        CRYPTOCURRENCY
      </span>
      <p>
        Live cryptocurrency prices
      </p>
    </div>
    <div
      v-if="marketStore.loading"
      class="loading"
    >
      Loading...
    </div>
    <div
      v-else-if="marketStore.error"
      class="error"
    >
      {{ marketStore.error }}
      <button
        @click="marketStore.fetchMarkets()"
      >
        Try Again
      </button>
    </div>
    <div
      v-else
      class="cards"
    >
      <div
        v-for="coin in coins"
        :key="coin.id"
        class="card"
      >
        <div class="coin">
          <div class="coin-icon">
            {{ coin.symbol }}
          </div>
          <div>
            <strong>
              {{ coin.name }}
            </strong>
            <small>
              {{ coin.symbol }}
            </small>
          </div>
        </div>
        <div
          v-if="marketStore.crypto"
          class="price"
        >
          $
          {{
            marketStore.crypto[coin.id]?.usd
              ?.toLocaleString()
          }}

        </div>
        <div
          v-if="marketStore.crypto"
          class="change"
        >
          {{
            marketStore.crypto[coin.id]
              ?.usd_24h_change
              ?.toFixed(2)
          }}%
        </div>
      </div>
    </div>
  </div>
</template>