import { getCoinMarketCapData } from './cmc';
import { getCoinGeckoData } from './cg';

export interface TokenData {
  symbol: string;
  price: number;
  marketCap: number;
  circulatingSupply: number;
  totalSupply: number;
}

export async function estimateTokenPrice(tokenSymbol: string): Promise<string> {
  try {
    // Dapatkan data dari CoinMarketCap atau CoinGecko
    const similarTokens = await getSimilarTokens(tokenSymbol);
    
    if (similarTokens.length === 0) {
      throw new Error('No similar tokens found for comparison');
    }
    
    // Hitung rata-rata market cap per circulating supply
    const avgRatio = similarTokens.reduce((sum, token) => {
      return sum + (token.marketCap / token.circulatingSupply);
    }, 0) / similarTokens.length;
    
    // Estimasi harga berdasarkan rata-rata
    const estimatedPrice = avgRatio;
    
    return estimatedPrice.toFixed(6);
  } catch (error) {
    console.error('Estimation error:', error);
    throw error;
  }
}

async function getSimilarTokens(tokenSymbol: string): Promise<TokenData[]> {
  // Coba CoinMarketCap dulu, lalu CoinGecko sebagai fallback
  try {
    return await getCoinMarketCapData(tokenSymbol);
  } catch (cmcError) {
    console.log('Falling back to CoinGecko');
    return await getCoinGeckoData(tokenSymbol);
  }
}
