
import { store } from '../store/store';
import { updateAssetPrice } from '../store/cryptoSlice';

export class CryptoWebSocketSimulator {
  private interval: number | null = null;

  constructor(private updateFrequency = 2000) {}

  connect() {
    if (this.interval !== null) return;

    console.log('WebSocket simulator connected');
    
    this.interval = window.setInterval(() => {
      const state = store.getState();
      const assets = state.crypto.assets;
      
      // Randomly select 1-3 assets to update
      const assetIds = Object.keys(assets);
      const updateCount = Math.floor(Math.random() * 3) + 1;
      
      const assetsToUpdate = new Set<string>();
      while (assetsToUpdate.size < updateCount && assetsToUpdate.size < assetIds.length) {
        const randomIndex = Math.floor(Math.random() * assetIds.length);
        assetsToUpdate.add(assetIds[randomIndex]);
      }
      
      // Update the selected assets
      assetsToUpdate.forEach(id => {
        const asset = assets[id];
        const priceChange = asset.price * (Math.random() * 0.01 - 0.005); // -0.5% to +0.5%
        const newPrice = parseFloat((asset.price + priceChange).toFixed(2));
        
        store.dispatch(updateAssetPrice({ id, price: newPrice }));
      });
    }, this.updateFrequency);
  }

  disconnect() {
    if (this.interval !== null) {
      window.clearInterval(this.interval);
      this.interval = null;
      console.log('WebSocket simulator disconnected');
    }
  }
}

export const cryptoWebSocket = new CryptoWebSocketSimulator();
