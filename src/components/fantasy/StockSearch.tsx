
import { useState } from "react";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Stock {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  sector: string;
}

interface StockSearchProps {
  onSelectStock: (stock: Stock) => void;
}

const mockStocks: Stock[] = [
  { id: "1", name: "Reliance Industries", ticker: "RELIANCE", price: 2750.45, change: 1.2, sector: "Energy" },
  { id: "2", name: "HDFC Bank", ticker: "HDFCBANK", price: 1680.30, change: -0.5, sector: "Finance" },
  { id: "3", name: "Tata Consultancy Services", ticker: "TCS", price: 3450.75, change: 0.8, sector: "IT" },
  { id: "4", name: "Infosys", ticker: "INFY", price: 1520.60, change: 1.5, sector: "IT" },
  { id: "5", name: "Bharti Airtel", ticker: "BHARTIARTL", price: 865.25, change: -0.3, sector: "Telecom" },
  { id: "6", name: "ITC", ticker: "ITC", price: 410.15, change: 0.2, sector: "FMCG" },
  { id: "7", name: "State Bank of India", ticker: "SBIN", price: 635.90, change: -1.1, sector: "Finance" },
  { id: "8", name: "Hindustan Unilever", ticker: "HINDUNILVR", price: 2540.30, change: 0.7, sector: "FMCG" },
];

const StockSearch = ({ onSelectStock }: StockSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    // In a real app, this would be an API call
    const query = searchQuery.toLowerCase();
    const filtered = mockStocks.filter(
      stock => 
        stock.name.toLowerCase().includes(query) || 
        stock.ticker.toLowerCase().includes(query)
    );
    
    setSearchResults(filtered);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="w-full">
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search stocks by name or ticker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9"
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>
      
      {searchResults.length > 0 && (
        <div className="mt-4 bg-white rounded-lg border overflow-hidden">
          {searchResults.map((stock) => (
            <div 
              key={stock.id}
              className="border-b last:border-0 p-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelectStock(stock)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{stock.name}</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <span>{stock.ticker}</span>
                    <span className="mx-2">•</span>
                    <span>{stock.sector}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium">₹{stock.price}</div>
                  <div className={`text-sm flex items-center ${
                    stock.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {stock.change >= 0 ? "+" : ""}{stock.change}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockSearch;
