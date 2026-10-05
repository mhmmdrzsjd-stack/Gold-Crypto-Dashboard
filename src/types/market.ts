export interface Market {
  id: string
  name: string
  symbol: string
  price: number
  change: number
  volume: string
  type: 'gold' | 'crypto'
}