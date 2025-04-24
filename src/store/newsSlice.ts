
import { createSlice } from '@reduxjs/toolkit';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  relatedAssets: string[];
}

interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [
    {
      id: '1',
      title: 'Bitcoin Breaks $90,000 for the First Time',
      summary: 'Bitcoin has surpassed $90,000, marking a new all-time high as institutional adoption continues to grow.',
      source: 'CryptoNews',
      url: '#',
      publishedAt: '2025-04-23T10:30:00Z',
      relatedAssets: ['bitcoin']
    },
    {
      id: '2',
      title: 'Ethereum ETFs Receive Approval from SEC',
      summary: 'The SEC has approved the first Ethereum ETFs, allowing traditional investors easy access to the second-largest cryptocurrency.',
      source: 'Blockchain Times',
      url: '#',
      publishedAt: '2025-04-23T08:15:00Z',
      relatedAssets: ['ethereum']
    },
    {
      id: '3',
      title: 'Solana DeFi Ecosystem Surpasses $50 Billion in Total Value Locked',
      summary: 'Solana-based DeFi protocols have collectively reached $50 billion in TVL, showing strong growth in the ecosystem.',
      source: 'DeFi Pulse',
      url: '#',
      publishedAt: '2025-04-22T16:45:00Z',
      relatedAssets: ['solana']
    },
    {
      id: '4',
      title: 'Tether Issues Transparency Report, Confirms Full Backing of USDT',
      summary: 'Tether has released its quarterly transparency report, confirming that all USDT tokens are fully backed by reserves.',
      source: 'Stablecoin News',
      url: '#',
      publishedAt: '2025-04-22T14:20:00Z',
      relatedAssets: ['tether']
    },
    {
      id: '5',
      title: 'BNB Chain Announces Major Protocol Upgrade for Enhanced Scalability',
      summary: 'BNB Chain has unveiled plans for a significant protocol upgrade aimed at improving network scalability and performance.',
      source: 'Chain Update',
      url: '#',
      publishedAt: '2025-04-21T11:00:00Z',
      relatedAssets: ['bnb']
    }
  ],
  loading: false,
  error: null
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    // In a real app, we'd have actions to fetch and update news
    // but for this demo, we'll use static data
  }
});

export default newsSlice.reducer;
