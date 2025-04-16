
import { useState } from "react";
import { ResearchHeader } from "@/components/ResearchHeader";
import { ResearchReport, ResearchData } from "@/components/ResearchReport";
import { generateResearch } from "@/services/researchService";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Book, Search, FileText, Lightbulb, BarChart } from "lucide-react";

export default function Index() {
  const [researchData, setResearchData] = useState<ResearchData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const data = await generateResearch(query);
      setResearchData(data);
    } catch (error) {
      console.error("Error generating research:", error);
      // In a real app, we'd handle this error properly
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <ResearchHeader onSearch={handleSearch} />
      
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
        <ResearchReport data={researchData} isLoading={isLoading} />
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
