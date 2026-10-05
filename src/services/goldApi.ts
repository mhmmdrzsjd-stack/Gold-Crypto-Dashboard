const GOLD_API_URL = 'https://api.gold-api.com/price/XAU'

export interface GoldApiResponse {
  currency: string
  currencySymbol: string
  exchangeRate: number
  name: string
  price: number
  symbol: string
  updatedAt: string
  updatedAtReadable: string
}

export async function getGoldPrice(): Promise<GoldApiResponse> {
  const response = await fetch(GOLD_API_URL)

  if (!response.ok) {
    throw new Error(`Gold API Error: ${response.status}`)
  }

  const data = await response.json()

  if (typeof data?.price !== 'number') {
    throw new Error('Invalid gold price data')
  }

  return data
}