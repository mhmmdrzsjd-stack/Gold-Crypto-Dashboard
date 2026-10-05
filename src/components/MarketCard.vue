<script setup lang="ts">
import type { Market } from '../types/market'
defineProps<{
  market: Market
}>()
</script>
<template>
  <div class="card">
    <div class="top">
      <div class="asset">
        <div
          class="icon"
          :class="market.type"
        >
          {{ market.symbol }}
        </div>
        <div>
          <h3>
            {{ market.name }}
          </h3>
          <span>
            {{ market.symbol }} / USD
          </span>
        </div>
      </div>
      <b>
        +{{ market.change.toFixed(2) }}%
      </b>
    </div>
    <div class="price">
      ${{ market.price.toLocaleString() }}
    </div>
    <div class="bottom">
      <span>
        24h Volume
      </span>
      <strong>
        {{ market.volume }}
      </strong>
    </div>
  </div>
</template>