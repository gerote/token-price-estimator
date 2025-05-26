const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

export async function getCoinMarketCapData(symbol: string): Promise<TokenData[]> {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10&sort=market_cap&cryptocurrency_type=all`;
  
  const response = await fetch(url, {
    headers: {
      'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
      'Accept': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`CoinMarketCap API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  return data.data.map((token: any) => ({
    symbol: token.symbol,
    price: token.quote.USD.price,
    marketCap: token.quote.USD.market_cap,
    circulatingSupply: token.circulating_supply,
    totalSupply: token.total_supply
  })).filter((t: TokenData) => t.symbol !== symbol);
}
