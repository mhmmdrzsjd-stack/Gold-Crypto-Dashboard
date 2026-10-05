import { defineStore } from 'pinia'

export interface Transaction {
  id: number
  type: 'crypto' | 'gold'
  asset: string
  title: string
  icon: string
  amount: number
  date: string
  time: string
}

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [] as Transaction[],
    loading: false,
    error: null as string | null,
    lastUpdated: null as Date | null
  }),

  getters: {
    totalTransactions: (state) => state.transactions.length,

    totalAmount: (state) =>
      state.transactions.reduce(
        (total, transaction) => total + transaction.amount,
        0
      )
  },

  actions: {
    async fetchTransactions() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true'
        )

        if (!response.ok) {
          throw new Error(`Transaction API Error: ${response.status}`)
        }

        const data = await response.json()

        console.log('🔥 Transaction API Data:', data)

        const now = new Date()

        const formattedTime = now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })

        const formattedDate = now.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })

        this.transactions = [
          {
            id: 1,
            type: 'crypto',
            asset: 'BTC',
            title: 'Bitcoin Purchase',
            icon: '₿',
            amount: data.bitcoin?.usd ?? 0,
            date: formattedDate,
            time: formattedTime
          },
          {
            id: 2,
            type: 'crypto',
            asset: 'ETH',
            title: 'Ethereum Purchase',
            icon: 'ETH',
            amount: data.ethereum?.usd ?? 0,
            date: formattedDate,
            time: formattedTime
          },
          {
            id: 3,
            type: 'crypto',
            asset: 'SOL',
            title: 'Solana Purchase',
            icon: 'SOL',
            amount: data.solana?.usd ?? 0,
            date: formattedDate,
            time: formattedTime
          },
          {
            id: 4,
            type: 'crypto',
            asset: 'BNB',
            title: 'BNB Purchase',
            icon: 'BNB',
            amount: data.binancecoin?.usd ?? 0,
            date: formattedDate,
            time: formattedTime
          }
        ]

        this.lastUpdated = new Date()
      } catch (error) {
        console.error('❌ Transaction Error:', error)

        this.error = 'دریافت اطلاعات تراکنش با خطا مواجه شد.'
      } finally {
        this.loading = false
      }
    }
  }
})