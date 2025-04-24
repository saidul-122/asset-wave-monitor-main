
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Header from '@/components/Header';
import CryptoTable from '@/components/CryptoTable';
import Portfolio from '@/components/Portfolio';
import News from '@/components/News';
import WalletView from '@/components/WalletView';
import { cryptoWebSocket } from '@/services/cryptoWebSocketSimulator';

type ActiveTab = 'market' | 'portfolio' | 'news' | 'wallet';

const MainContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('market');

  useEffect(() => {
    // Connect to the WebSocket simulator when the component mounts
    cryptoWebSocket.connect();
    
    // Disconnect when the component unmounts
    return () => {
      cryptoWebSocket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'market' && <CryptoTable />}
        {activeTab === 'portfolio' && <Portfolio />}
        {activeTab === 'news' && <News />}
        {activeTab === 'wallet' && <WalletView />}
      </main>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <Provider store={store}>
      <MainContent />
    </Provider>
  );
};

export default Index;
