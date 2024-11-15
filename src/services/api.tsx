import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';


export interface CryptoData {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number | null;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: number | null;
    last_updated: string;
  }
  

export const fetchCryptoData = async (): Promise<CryptoData[]> => {
    console.log("called api");
    
  try {
    const response = await axios.get<CryptoData[]>(`${BASE_URL}/coins/markets`, {
      params: { vs_currency: 'usd' },
    });
    
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw new Error('No internet connection');
    } else {
      throw new Error('Failed to fetch cryptocurrency data');
    }
  }
};
