export async function getCoinGeckoData(symbol: string): Promise<TokenData[]> {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`CoinGecko API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  return data.map((token: any) => ({
    symbol: token.symbol,
    price: token.current_price,
    marketCap: token.market_cap,
    circulatingSupply: token.circulating_supply,
    totalSupply: token.total_supply
  })).filter((t: TokenData) => t.symbol !== symbol);
}
