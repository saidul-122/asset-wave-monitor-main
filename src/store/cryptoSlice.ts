
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  priceChange1h: number;
  priceChange24h: number;
  priceChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  logo: string;
  sparkline: number[];
  isUpdating?: boolean;
}

interface CryptoState {
  assets: Record<string, CryptoAsset>;
  loading: boolean;
  error: string | null;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  filter: string;
}

const initialState: CryptoState = {
  assets: {},
  loading: false,
  error: null,
  sortBy: 'rank',
  sortDirection: 'asc',
  filter: '',
};

// Sample data for the initial state
const sampleData: CryptoAsset[] = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 93759.48,
    priceChange1h: 0.43,
    priceChange24h: 0.93,
    priceChange7d: 11.11,
    marketCap: 1861618902186,
    volume24h: 43874950947,
    circulatingSupply: 19.85,
    maxSupply: 21,
    logo: '/public/lovable-uploads/a9ae7987-d9f9-4168-9314-e698d39bba7e.png',
    sparkline: [62000, 63000, 62500, 64000, 65000, 66000, 67000, 68000, 70000, 72000, 75000, 80000, 85000, 90000, 93759],
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: 1802.46,
    priceChange1h: 0.60,
    priceChange24h: 3.21,
    priceChange7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23547469307,
    circulatingSupply: 120.71,
    maxSupply: null,
    logo: '/public/lovable-uploads/a9ae7987-d9f9-4168-9314-e698d39bba7e.png',
    sparkline: [1500, 1520, 1510, 1530, 1550, 1570, 1600, 1650, 1700, 1750, 1800, 1825, 1815, 1802, 1802.46],
  },
  {
    id: 'tether',
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    price: 1.00,
    priceChange1h: -0.00,
    priceChange24h: -0.00,
    priceChange7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    circulatingSupply: 145.27,
    maxSupply: null,
    logo: '/public/lovable-uploads/a9ae7987-d9f9-4168-9314-e698d39bba7e.png',
    sparkline: [1.00, 1.00, 0.999, 0.998, 1.001, 1.002, 1.000, 1.000, 0.999, 0.999, 1.000, 1.000, 1.000, 1.000, 1.00],
  },
  {
    id: 'xrp',
    rank: 4,
    name: 'XRP',
    symbol: 'XRP',
    price: 2.22,
    priceChange1h: 0.46,
    priceChange24h: 0.54,
    priceChange7d: 6.18,
    marketCap: 130073814966,
    volume24h: 5131481491,
    circulatingSupply: 58.39,
    maxSupply: 100,
    logo: '/public/lovable-uploads/a9ae7987-d9f9-4168-9314-e698d39bba7e.png',
    sparkline: [2.00, 2.02, 2.03, 2.05, 2.07, 2.10, 2.15, 2.12, 2.08, 2.10, 2.15, 2.18, 2.20, 2.21, 2.22],
  },
  {
    id: 'bnb',
    rank: 5,
    name: 'BNB',
    symbol: 'BNB',
    price: 606.65,
    priceChange1h: 0.09,
    priceChange24h: -1.20,
    priceChange7d: 3.73,
    marketCap: 85471956947,
    volume24h: 1874281784,
    circulatingSupply: 140.89,
    maxSupply: 200,
    logo: '/public/lovable-uploads/a9ae7987-d9f9-4168-9314-e698d39bba7e.png',
    sparkline: [580, 585, 590, 585, 580, 575, 580, 585, 595, 600, 605, 610, 605, 600, 606.65],
  },
  {
    id: 'solana',
    rank: 6,
    name: 'Solana',
    symbol: 'SOL',
    price: 151.51,
    priceChange1h: 0.53,
    priceChange24h: 1.26,
    priceChange7d: 14.74,
    marketCap: 78381958631,
    volume24h: 4881674486,
    circulatingSupply: 517.31,
    maxSupply: null,
    logo: '/public/lovable-uploads/a9ae7987-d9f9-4168-9314-e698d39bba7e.png',
    sparkline: [125, 127, 130, 132, 135, 138, 140, 143, 145, 147, 149, 150, 149, 150, 151.51],
  }
];

// Initialize the assets from the sample data
const initializedState: CryptoState = {
  ...initialState,
  assets: sampleData.reduce((acc, asset) => {
    acc[asset.id] = asset;
    return acc;
  }, {} as Record<string, CryptoAsset>),
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: initializedState,
  reducers: {
    updateAssetPrice: (state, action: PayloadAction<{ id: string; price: number; }>) => {
      const { id, price } = action.payload;
      const asset = state.assets[id];
      if (asset) {
        asset.isUpdating = true;
        asset.price = price;
        // In a real app we would calculate this from the new price, but here we'll simulate it
        asset.priceChange1h = parseFloat((asset.priceChange1h + (Math.random() * 0.2 - 0.1)).toFixed(2));
        asset.priceChange24h = parseFloat((asset.priceChange24h + (Math.random() * 0.4 - 0.2)).toFixed(2));
        asset.volume24h = asset.volume24h * (1 + (Math.random() * 0.04 - 0.02));
        
        // Update sparkline to show movement
        asset.sparkline = [...asset.sparkline.slice(1), price];
        
        // Reset the updating flag after a delay
        setTimeout(() => {
          state.assets[id].isUpdating = false;
        }, 1000);
      }
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      if (state.sortBy === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = action.payload;
        state.sortDirection = 'asc';
      }
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    }
  },
});

export const { updateAssetPrice, setSortBy, setFilter } = cryptoSlice.actions;
export default cryptoSlice.reducer;
