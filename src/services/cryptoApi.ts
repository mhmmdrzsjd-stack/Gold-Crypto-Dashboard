export async function getCryptoPrices() {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true'
  )
  if (!response.ok) {
    throw new Error(`Crypto API Error: ${response.status}`)
  }
  return await response.json()
}