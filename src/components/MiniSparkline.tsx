
import React from 'react';
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';

interface MiniSparklineProps {
  data: number[];
  change: number;
}

const MiniSparkline: React.FC<MiniSparklineProps> = ({ data, change }) => {
  const chartData = data.map((value) => ({ value }));
  const color = change >= 0 ? "#16C784" : "#EA3943";

  return (
    <ResponsiveContainer width={120} height={40}>
      <LineChart data={chartData}>
        <YAxis 
          domain={['dataMin', 'dataMax']} 
          hide 
        />
        <Line 
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MiniSparkline;
