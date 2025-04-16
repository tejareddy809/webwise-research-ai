
import { useState } from "react";
import { ResearchHeader } from "@/components/ResearchHeader";
import { ResearchReport, ResearchData } from "@/components/ResearchReport";
import { generateResearch } from "@/services/researchService";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key } from "lucide-react";
import { Brain, Book, Search, FileText, Lightbulb, BarChart } from "lucide-react";
import { toast } from "sonner";

export default function Index() {
  const [researchData, setResearchData] = useState<ResearchData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const handleSearch = async (query: string, industries: string[] = []) => {
    setIsLoading(true);
    setHasSearched(true);
    setSelectedIndustries(industries);
    
    try {
      // Pass the selected industries to the research service
      const data = await generateResearch(query, industries);
      setResearchData(data);
    } catch (error) {
      console.error("Error generating research:", error);
      toast.error("Failed to generate research. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySave = () => {
    if (apiKey.trim().length > 0) {
      localStorage.setItem('openai_api_key', apiKey);
      toast.success("API Key saved successfully");
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <ResearchHeader onSearch={handleSearch} />
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="fixed top-4 right-4">
            <Key className="mr-2 h-4 w-4" /> Add OpenAI Key
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add OpenAI API Key</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input 
              placeholder="Paste your OpenAI API key" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="password"
            />
            <Button onClick={handleApiKeySave} className="w-full">
              Save API Key
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Note: API keys are stored locally in your browser. For secure storage, 
            we recommend using Supabase secrets.
          </p>
        </DialogContent>
      </Dialog>

      {!hasSearched ? (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center mb-10">Your AI-Powered Research Assistant</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Search className="h-8 w-8 text-research-500" />}
              title="Web Search & Analysis"
              description="Searches the entire web for the latest, most relevant information on your topic from authoritative sources."
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-research-500" />}
              title="Smart Information Filtering"
              description="Removes redundant, outdated, or biased content to deliver only high-quality, factual information."
            />
            <FeatureCard
              icon={<FileText className="h-8 w-8 text-research-500" />}
              title="Structured Reports"
              description="Generates well-organized research reports with introduction, key insights, data points, and conclusions."
            />
            <FeatureCard
              icon={<BarChart className="h-8 w-8 text-research-500" />}
              title="Statistics & Data"
              description="Includes verifiable numbers, percentages, and real-world figures to support your research."
            />
            <FeatureCard
              icon={<Lightbulb className="h-8 w-8 text-research-500" />}
              title="Expert Opinions"
              description="Summarizes views from thought leaders, researchers, and industry professionals on your topic."
            />
            <FeatureCard
              icon={<Book className="h-8 w-8 text-research-500" />}
              title="Cited Sources"
              description="Every insight comes with proper citations and references in your preferred academic style."
            />
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-500">
              Try searching for topics like "Artificial Intelligence in Healthcare", "Climate Change Solutions", 
              "Remote Work Trends", or any subject you're interested in researching.
            </p>
          </div>
        </div>
      ) : (
        <ResearchReport 
          data={researchData} 
          isLoading={isLoading} 
          selectedIndustries={selectedIndustries}
        />
      )}
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
