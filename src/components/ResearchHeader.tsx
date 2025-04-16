
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ResearchHeaderProps {
  onSearch: (query: string) => void;
}

export function ResearchHeader({ onSearch }: ResearchHeaderProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="bg-research-700 text-white py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">WebWise Research AI</h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Generate comprehensive research reports on any topic
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 max-w-3xl">
          <div className="flex-1 relative">
            <Input
              className="w-full pl-4 pr-12 py-3 text-lg text-black border-2 border-research-300 focus-visible:ring-research-500 h-14"
              placeholder="Enter your research topic..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <Button 
            type="submit" 
            className="h-14 px-6 bg-research-500 hover:bg-research-600 text-white"
            disabled={!query.trim()}
          >
            Research Now
          </Button>
        </form>
      </div>
    </div>
  );
}
