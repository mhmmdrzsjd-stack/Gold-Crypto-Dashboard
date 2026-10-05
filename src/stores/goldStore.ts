import { defineStore } from 'pinia'
import { getGoldPrice } from '../services/goldApi'

export const useGoldStore = defineStore('gold', {
  state: () => ({
    price: 0,
    currency: 'USD',
    currencySymbol: '$',
    unit: 'Troy Ounce',
    symbol: 'XAU',
    updatedAt: '',
    updatedAtReadable: '',
    loading: false,
    error: null as string | null,
    lastUpdated: null as Date | null,

    // وضعیت آپدیت خودکار
    autoRefresh: false,
    refreshInterval: null as ReturnType<typeof setInterval> | null
  }),

  getters: {
    formattedPrice: (state) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: state.currency || 'USD',
        maximumFractionDigits: 2
      }).format(state.price)
    },

    isLive: (state) => {
      return state.autoRefresh && !state.error
    }
  },

  actions: {
    // دریافت قیمت طلا
    async fetchGold() {
      // جلوگیری از درخواست همزمان
      if (this.loading) return

      this.loading = true
      this.error = null

      try {
        const data = await getGoldPrice()

        // قیمت
        this.price = Number(data.price) || 0

        // اطلاعات بازار
        this.currency = data.currency || 'USD'
        this.currencySymbol = data.currencySymbol || '$'
        this.symbol = data.symbol || 'XAU'

        // واحد
        this.unit = 'Troy Ounce'

        // زمان API
        this.updatedAt = data.updatedAt || ''
        this.updatedAtReadable = data.updatedAtReadable || ''

        // زمان آخرین درخواست
        this.lastUpdated = new Date()

        console.log('🟡 Gold Price Updated:', this.price)

      } catch (error) {
        console.error('❌ Gold API Error:', error)

        this.error = 'دریافت اطلاعات طلا با خطا مواجه شد.'
      } finally {
        this.loading = false
      }
    },

    // شروع آپدیت خودکار
    startAutoRefresh() {
      // اگر قبلاً فعال است، دوباره ایجاد نکن
      if (this.refreshInterval) return

      this.autoRefresh = true

      // دریافت فوری
      this.fetchGold()

      // آپدیت هر 5 ثانیه
      this.refreshInterval = setInterval(() => {
        this.fetchGold()
      }, 5000)
    },

    // توقف آپدیت خودکار
    stopAutoRefresh() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval)
        this.refreshInterval = null
      }

      this.autoRefresh = false
    }
  }
})