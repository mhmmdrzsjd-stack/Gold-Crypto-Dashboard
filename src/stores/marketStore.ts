import { defineStore } from 'pinia'

import { getCryptoPrices } from '../services/cryptoApi'

export interface Market {
  id: string
  name: string
  symbol: string
  price: number
  change: number
  type: 'crypto' | 'gold'
}

export const useMarketStore = defineStore('market', {

  state: () => ({
    crypto: null as any,

    gold: null as any,

    markets: [] as Market[],

    loading: false,

    error: null as string | null,

    // زمان آخرین بروزرسانی
    lastUpdated: null as Date | null
  }),

  getters: {

    bitcoin: (state) =>
      state.markets.find((item) => item.id === 'bitcoin'),

    ethereum: (state) =>
      state.markets.find((item) => item.id === 'ethereum'),

    solana: (state) =>
      state.markets.find((item) => item.id === 'solana'),

    bnb: (state) =>
      state.markets.find((item) => item.id === 'binancecoin')

  },

  actions: {

    async fetchMarkets() {

      this.loading = true
      this.error = null

      try {

        const cryptoData = await getCryptoPrices()

        console.log('🔥 Crypto API Data:', cryptoData)

        this.crypto = cryptoData

        this.markets = [

          {
            id: 'bitcoin',
            name: 'Bitcoin',
            symbol: 'BTC',
            price: cryptoData.bitcoin?.usd ?? 0,
            change: cryptoData.bitcoin?.usd_24h_change ?? 0,
            type: 'crypto'
          },

          {
            id: 'ethereum',
            name: 'Ethereum',
            symbol: 'ETH',
            price: cryptoData.ethereum?.usd ?? 0,
            change: cryptoData.ethereum?.usd_24h_change ?? 0,
            type: 'crypto'
          },

          {
            id: 'solana',
            name: 'Solana',
            symbol: 'SOL',
            price: cryptoData.solana?.usd ?? 0,
            change: cryptoData.solana?.usd_24h_change ?? 0,
            type: 'crypto'
          },

          {
            id: 'binancecoin',
            name: 'BNB',
            symbol: 'BNB',
            price: cryptoData.binancecoin?.usd ?? 0,
            change: cryptoData.binancecoin?.usd_24h_change ?? 0,
            type: 'crypto'
          }

        ]

        // زمان دریافت موفق اطلاعات
        this.lastUpdated = new Date()

      } catch (error) {

        console.error('❌ Market Error:', error)

        this.error =
          'دریافت اطلاعات بازار با خطا مواجه شد.'

      } finally {

        this.loading = false

      }

    }

  }

})