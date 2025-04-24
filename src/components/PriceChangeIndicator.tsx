
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface PriceChangeIndicatorProps {
  change: number;
}

const PriceChangeIndicator: React.FC<PriceChangeIndicatorProps> = ({ change }) => {
  if (change === 0) return <span className="text-gray-500">0.00%</span>;

  const isPositive = change > 0;
  const color = isPositive ? 'text-crypto-green' : 'text-crypto-red';
  const Icon = isPositive ? ArrowUp : ArrowDown;
  const formattedChange = Math.abs(change).toFixed(2);

  return (
    <div className={`flex items-center justify-end ${color}`}>
      <Icon size={14} className="mr-1" />
      <span>{formattedChange}%</span>
    </div>
  );
};

export default PriceChangeIndicator;
