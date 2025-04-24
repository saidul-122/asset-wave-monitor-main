
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PortfolioAsset {
  id: string;
  amount: number;
}

interface PortfolioState {
  assets: PortfolioAsset[];
  isWalletConnected: boolean;
}

const initialState: PortfolioState = {
  assets: [
    { id: 'bitcoin', amount: 0.25 },
    { id: 'ethereum', amount: 3.5 },
    { id: 'solana', amount: 10 }
  ],
  isWalletConnected: false
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<PortfolioAsset>) => {
      const existingAsset = state.assets.find(asset => asset.id === action.payload.id);
      if (existingAsset) {
        existingAsset.amount += action.payload.amount;
      } else {
        state.assets.push(action.payload);
      }
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter(asset => asset.id !== action.payload);
    },
    updateAssetAmount: (state, action: PayloadAction<{ id: string, amount: number }>) => {
      const asset = state.assets.find(asset => asset.id === action.payload.id);
      if (asset) {
        asset.amount = action.payload.amount;
      }
    },
    setWalletConnected: (state, action: PayloadAction<boolean>) => {
      state.isWalletConnected = action.payload;
    }
  }
});

export const { addAsset, removeAsset, updateAssetAmount, setWalletConnected } = portfolioSlice.actions;
export default portfolioSlice.reducer;
