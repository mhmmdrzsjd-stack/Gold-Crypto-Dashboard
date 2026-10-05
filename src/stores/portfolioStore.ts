import { defineStore } from 'pinia'

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    gold: 8420,

    crypto: 0,

    totalBalance: 0,

    goldPercent: 0,
    cryptoPercent: 0,

    change: 0,

    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchPortfolio() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true'
        )

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`)
        }

        const data = await response.json()

        console.log('🔥 Portfolio API Data:', data)

        const bitcoin = data.bitcoin?.usd ?? 0
        const ethereum = data.ethereum?.usd ?? 0
        const solana = data.solana?.usd ?? 0
        const bnb = data.binancecoin?.usd ?? 0

        // مجموع قیمت ارزها
        this.crypto =
          bitcoin +
          ethereum +
          solana +
          bnb

        // مجموع کل
        this.totalBalance =
          this.gold +
          this.crypto

        // درصد طلا
        this.goldPercent =
          this.totalBalance > 0
            ? (this.gold / this.totalBalance) * 100
            : 0

        // درصد کریپتو
        this.cryptoPercent =
          this.totalBalance > 0
            ? (this.crypto / this.totalBalance) * 100
            : 0

        // میانگین تغییرات 24 ساعته
        const bitcoinChange =
          data.bitcoin?.usd_24h_change ?? 0

        const ethereumChange =
          data.ethereum?.usd_24h_change ?? 0

        const solanaChange =
          data.solana?.usd_24h_change ?? 0

        const bnbChange =
          data.binancecoin?.usd_24h_change ?? 0

        this.change =
          (
            bitcoinChange +
            ethereumChange +
            solanaChange +
            bnbChange
          ) / 4

      } catch (error) {
        console.error(
          '❌ Portfolio Error:',
          error
        )

        this.error =
          'دریافت اطلاعات پرتفولیو با خطا مواجه شد.'
      } finally {
        this.loading = false
      }
    }
  }
})