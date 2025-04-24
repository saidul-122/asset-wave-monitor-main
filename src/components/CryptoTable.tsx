import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { setSortBy } from '@/store/cryptoSlice';
import { ArrowUp, ArrowDown, HelpCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import PriceChangeIndicator from './PriceChangeIndicator';
import MiniSparkline from './MiniSparkline';

// Define the type for crypto assets
interface CryptoAsset {
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
  maxSupply?: number;
  sparkline: number[];
  isUpdating?: boolean;
}

const CryptoTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { assets, sortBy, sortDirection, filter } = useAppSelector(state => state.crypto);

  const handleSort = (column: string) => {
    dispatch(setSortBy(column));
  };

  const sortedAssets = Object.values(assets as Record<string, CryptoAsset>)
    .filter(asset => 
      asset.name.toLowerCase().includes(filter.toLowerCase()) || 
      asset.symbol.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      // Handle default case for strings
      const stringSort = (aVal: string, bVal: string) => {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      };

      // Handle default case for numbers
      const numberSort = (aVal: number, bVal: number) => {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      };

      // Sort based on the selected column
      switch (sortBy) {
        case 'rank':
          return numberSort(a.rank, b.rank);
        case 'name':
          return stringSort(a.name, b.name);
        case 'price':
          return numberSort(a.price, b.price);
        case 'priceChange1h':
          return numberSort(a.priceChange1h, b.priceChange1h);
        case 'priceChange24h':
          return numberSort(a.priceChange24h, b.priceChange24h);
        case 'priceChange7d':
          return numberSort(a.priceChange7d, b.priceChange7d);
        case 'marketCap':
          return numberSort(a.marketCap, b.marketCap);
        case 'volume24h':
          return numberSort(a.volume24h, b.volume24h);
        case 'circulatingSupply':
          return numberSort(a.circulatingSupply, b.circulatingSupply);
        default:
          return numberSort(a.rank, b.rank);
      }
    });

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: num < 1 ? 4 : 2,
      maximumFractionDigits: num < 1 ? 4 : 2,
    }).format(num);
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return formatCurrency(num);
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortBy !== column) return null;
    return sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  const renderSortableHeader = (label: string, column: string, tooltip?: string) => (
    <div className="flex items-center gap-1">
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-auto p-0 font-semibold hover:bg-transparent"
        onClick={() => handleSort(column)}
      >
        {label}
        <SortIcon column={column} />
      </Button>
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle size={14} className="text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">{renderSortableHeader('#', 'rank')}</TableHead>
            <TableHead>{renderSortableHeader('Name', 'name')}</TableHead>
            <TableHead className="text-right">{renderSortableHeader('Price', 'price')}</TableHead>
            <TableHead className="text-right">{renderSortableHeader('1h %', 'priceChange1h')}</TableHead>
            <TableHead className="text-right">{renderSortableHeader('24h %', 'priceChange24h')}</TableHead>
            <TableHead className="text-right">{renderSortableHeader('7d %', 'priceChange7d')}</TableHead>
            <TableHead className="text-right">{renderSortableHeader('Market Cap', 'marketCap', 'The total market value of a cryptocurrency\'s circulating supply.')}</TableHead>
            <TableHead className="text-right">{renderSortableHeader('Volume(24h)', 'volume24h', 'The total trading volume for this asset in the past 24 hours.')}</TableHead>
            <TableHead className="text-right">{renderSortableHeader('Circulating Supply', 'circulatingSupply', 'The amount of coins that are circulating in the market.')}</TableHead>
            <TableHead className="text-right">Last 7 Days</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAssets.map((asset) => (
            <TableRow key={asset.id} className={asset.isUpdating ? 'animate-flash' : ''}>
              <TableCell>{asset.rank}</TableCell>
              <TableCell className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  {asset.symbol.charAt(0)}
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <span className="font-medium">{asset.name}</span>
                  <span className="text-xs text-muted-foreground">{asset.symbol}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(asset.price)}</TableCell>
              <TableCell className="text-right">
                <PriceChangeIndicator change={asset.priceChange1h} />
              </TableCell>
              <TableCell className="text-right">
                <PriceChangeIndicator change={asset.priceChange24h} />
              </TableCell>
              <TableCell className="text-right">
                <PriceChangeIndicator change={asset.priceChange7d} />
              </TableCell>
              <TableCell className="text-right">{formatLargeNumber(asset.marketCap)}</TableCell>
              <TableCell className="text-right">{formatLargeNumber(asset.volume24h)}</TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col">
                  <span>{formatNumber(asset.circulatingSupply)}M {asset.symbol}</span>
                  {asset.maxSupply && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-crypto-blue h-1.5 rounded-full" 
                        style={{ width: `${(asset.circulatingSupply / asset.maxSupply) * 100}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <MiniSparkline data={asset.sparkline} change={asset.priceChange7d} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CryptoTable;
