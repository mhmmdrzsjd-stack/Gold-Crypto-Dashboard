<script setup lang="ts">
import MarketCard from '../components/MarketCard.vue'
import { useMarketStore } from '../stores/marketStore'

const marketStore = useMarketStore()
</script>
<template>
  <section class="cards">
    <MarketCard
      v-for="market in marketStore.markets"
      :key="market.id"
      :market="market"
    />
  </section>
</template>
<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
</style>