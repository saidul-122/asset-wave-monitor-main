
import React from 'react';
import { useAppSelector } from '@/store/store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PriceChangeIndicator from './PriceChangeIndicator';
import MiniSparkline from './MiniSparkline';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

const Portfolio: React.FC = () => {
  const { assets: cryptoAssets } = useAppSelector(state => state.crypto);
  const { assets: portfolioAssets, isWalletConnected } = useAppSelector(state => state.portfolio);
  
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  // Calculate total portfolio value
  const portfolioItems = portfolioAssets
    .map(asset => {
      const cryptoData = cryptoAssets[asset.id];
      if (!cryptoData) return null;
      return {
        ...cryptoData,
        holding: asset.amount,
        value: asset.amount * cryptoData.price,
      };
    })
    .filter(Boolean);

  const totalValue = portfolioItems.reduce((sum, asset) => sum + asset.value, 0);
  
  if (!isWalletConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-8 gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-6">Connect your wallet to view and manage your portfolio</p>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Portfolio Value</CardDescription>
            <CardTitle className="text-3xl">{formatCurrency(totalValue)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>24h Change</CardDescription>
            <CardTitle className="text-3xl flex items-center">
              <PriceChangeIndicator change={2.34} />
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Assets</CardDescription>
            <CardTitle className="text-3xl">{portfolioItems.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Your Assets</h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">24h %</TableHead>
              <TableHead className="text-right">Holdings</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">Last 7 Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolioItems.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      {asset.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">{formatCurrency(asset.price)}</TableCell>
                <TableCell className="text-right">
                  <PriceChangeIndicator change={asset.priceChange24h} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col">
                    <span>{asset.holding} {asset.symbol}</span>
                    <span className="text-xs text-muted-foreground">
                      {((asset.holding / asset.circulatingSupply) * 100).toFixed(8)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(asset.value)}</TableCell>
                <TableCell className="text-right">
                  <MiniSparkline data={asset.sparkline} change={asset.priceChange7d} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Portfolio;
