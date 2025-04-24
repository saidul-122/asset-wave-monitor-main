import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setWalletConnected } from "@/store/portfolioSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setFilter } from "@/store/cryptoSlice";
import { Wallet, Search } from "lucide-react";

type NavTab = "market" | "portfolio" | "news" | "wallet";

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const dispatch = useAppDispatch();
  const isWalletConnected = useAppSelector(
    (state) => state.portfolio.isWalletConnected
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch(setFilter(e.target.value));
  };

  const connectWallet = () => {
    dispatch(setWalletConnected(true));
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl md:text-3xl font-bold text-crypto-blue">
              Cryptocurrency Prices
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">
              Real-time price updates for top cryptocurrencies
            </p>
          </div>

          <div className="w-full md:w-auto flex items-center space-x-2 order-3 md:order-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-8"
              />
            </div>
          </div>

          <nav className="flex overflow-x-auto order-2 md:order-3">
            <ul className="flex space-x-1 md:space-x-2">
              <li>
                <Button
                  variant={activeTab === "market" ? "default" : "ghost"}
                  onClick={() => onTabChange("market")}
                  className={activeTab === "market" ? "bg-crypto-blue" : ""}
                >
                  Market
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === "portfolio" ? "default" : "ghost"}
                  onClick={() => onTabChange("portfolio")}
                  className={activeTab === "portfolio" ? "bg-crypto-blue" : ""}
                >
                  Portfolio
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === "news" ? "default" : "ghost"}
                  onClick={() => onTabChange("news")}
                  className={activeTab === "news" ? "bg-crypto-blue" : ""}
                >
                  News
                </Button>
              </li>
              <li>
                {isWalletConnected ? (
                  <Button
                    variant={activeTab === "wallet" ? "default" : "outline"}
                    onClick={() => onTabChange("wallet")}
                    className={`flex items-center gap-1 ${
                      activeTab === "wallet"
                        ? "bg-crypto-blue"
                        : "border-crypto-blue text-crypto-blue"
                    }`}
                  >
                    <Wallet size={16} />
                    <span className="hidden md:inline">Connected</span>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={connectWallet}
                    className="flex items-center gap-1 border-crypto-blue text-crypto-blue"
                  >
                    <Wallet size={16} />
                    <span className="hidden md:inline">Connect Wallet</span>
                  </Button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
