
import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { setWalletConnected } from '@/store/portfolioSlice';
import { Wallet, Check, ExternalLink, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const WalletView: React.FC = () => {
  const isWalletConnected = useAppSelector(state => state.portfolio.isWalletConnected);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  const walletAddress = '0x1234...5678';
  
  const disconnectWallet = () => {
    dispatch(setWalletConnected(false));
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected successfully",
    });
  };
  
  const copyAddress = () => {
    navigator.clipboard.writeText('0x1234567890abcdef1234567890abcdef12345678');
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    });
  };
  
  if (!isWalletConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-8 gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-6">Connect your wallet to view and manage your assets</p>
          <Button className="bg-crypto-blue hover:bg-crypto-blue/80">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Wallet</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-crypto-blue" />
            Connected Wallet
            <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
              <Check className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          </CardTitle>
          <CardDescription>Manage your connected wallet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Wallet Address</span>
            <div className="flex items-center gap-2">
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                0x1234567890abcdef1234567890abcdef12345678
              </code>
              <Button variant="ghost" size="icon" onClick={copyAddress}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Network</span>
            <span>Ethereum Mainnet</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" onClick={disconnectWallet} className="text-crypto-red border-crypto-red">
            Disconnect
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            View on Explorer
            <ExternalLink className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WalletView;
