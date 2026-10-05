import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import './assets/style_Dashboard.css'
import './assets/style_Header.css'
import './assets/style_MarketCard.css'
import './assets/style_PriceChart..css'
import './assets/style_sidebar.css'
import './assets/style_Crypto.css'
import './assets/style_Gold.css'
import './assets/style_Markets.css'
import './assets/style_Portfolio.css'
import './assets/style_Settings.css'
import './assets/style_Transactions.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')