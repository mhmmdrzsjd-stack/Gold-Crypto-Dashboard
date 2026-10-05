<template>
  <div class="page">
    <Header />


    <!-- Loading -->
    <div
      v-if="loading && transactions.length === 0"
      class="state-message"
    >
      در حال دریافت تراکنش‌ها...
    </div>

    <!-- Error -->
    <div
      v-else-if="error && transactions.length === 0"
      class="state-message error"
    >
      {{ error }}
    </div>

    <!-- Transactions -->
    <div
      v-else
      class="transactions"
    >
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="transaction"
      >
        <div
          class="transaction-icon"
          :class="{
            gold: transaction.type === 'gold'
          }"
        >
          {{ transaction.icon }}
        </div>

        <div>
          <strong>
            {{ transaction.title }}
          </strong>

          <small>
            {{ transaction.date }} · {{ transaction.time }}
          </small>
        </div>

        <b>
          +{{ formatAmount(transaction.amount) }}
        </b>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import Header from '../components/Header.vue'
import { useTransactionStore } from '../stores/transactionStore'

const transactionStore = useTransactionStore()

const {
  transactions,
  loading,
  error
} = storeToRefs(transactionStore)

const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount)
}

onMounted(() => {
  transactionStore.fetchTransactions()
})
</script>