
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Building, ChevronDown, ChevronUp } from "lucide-react";

export interface Industry {
  id: string;
  name: string;
}

const industries: Industry[] = [
  { id: "healthcare", name: "Healthcare" },
  { id: "finance", name: "Finance" },
  { id: "technology", name: "Technology" },
  { id: "education", name: "Education" },
  { id: "retail", name: "Retail" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "energy", name: "Energy" },
  { id: "agriculture", name: "Agriculture" },
];

interface ResearchHeaderProps {
  onSearch: (query: string, selectedIndustries: string[]) => void;
}

export function ResearchHeader({ onSearch }: ResearchHeaderProps) {
  const [query, setQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, selectedIndustries);
    }
  };

  const toggleIndustry = (industryId: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industryId) 
      ? prev.filter(id => id !== industryId)
      : [...prev, industryId]
    );
  };

  return (
    <div className="bg-research-700 text-white py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">WebWise Research AI</h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Generate comprehensive research reports on any topic
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-3xl">
          <div className="flex flex-col md:flex-row gap-3">
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
          </div>

          <Collapsible 
            open={isFiltersOpen} 
            onOpenChange={setIsFiltersOpen}
            className="bg-research-600 rounded-md p-3"
          >
            <CollapsibleTrigger className="flex items-center gap-2 w-full justify-between text-left text-white py-1">
              <div className="flex items-center gap-2">
                <Building size={20} />
                <span className="font-medium">Filter by Industry</span>
                {selectedIndustries.length > 0 && (
                  <span className="bg-research-500 text-white text-xs px-2 py-1 rounded-full">
                    {selectedIndustries.length}
                  </span>
                )}
              </div>
              {isFiltersOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {industries.map((industry) => (
                  <div key={industry.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={industry.id} 
                      checked={selectedIndustries.includes(industry.id)}
                      onCheckedChange={() => toggleIndustry(industry.id)}
                    />
                    <label 
                      htmlFor={industry.id} 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-white"
                    >
                      {industry.name}
                    </label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </form>
      </div>
    </div>
  );
}
