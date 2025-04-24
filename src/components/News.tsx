
import React from 'react';
import { useAppSelector } from '@/store/store';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const News: React.FC = () => {
  const { articles } = useAppSelector(state => state.news);
  const { assets } = useAppSelector(state => state.crypto);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Crypto News</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{article.title}</CardTitle>
              <CardDescription>{formatDate(article.publishedAt)} • {article.source}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p>{article.summary}</p>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 pt-2 border-t">
              {article.relatedAssets.map(assetId => {
                const asset = assets[assetId];
                if (!asset) return null;
                return (
                  <Badge key={assetId} variant="outline" className="flex items-center gap-1">
                    {asset.name}
                    <span className={asset.priceChange24h >= 0 ? "text-crypto-green" : "text-crypto-red"}>
                      {asset.priceChange24h >= 0 ? "+" : ""}{asset.priceChange24h.toFixed(2)}%
                    </span>
                  </Badge>
                );
              })}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default News;
