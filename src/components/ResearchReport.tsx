
import React, { useState } from "react";
import { Check, Copy, Download, Link as LinkIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Source {
  title: string;
  url: string;
  publisher?: string;
  date?: string;
}

export interface ResearchData {
  title: string;
  introduction: string;
  insights: {
    title: string;
    content: string;
  }[];
  statistics: Array<{ value: string; label: string }>;
  expertOpinions: Array<{ name: string; title: string; quote: string }>;
  conclusion: string;
  references: Source[];
}

interface ResearchReportProps {
  data: ResearchData | null;
  isLoading: boolean;
  selectedIndustries?: string[];
}

export function ResearchReport({ data, isLoading, selectedIndustries = [] }: ResearchReportProps) {
  const [viewMode, setViewMode] = useState<"summary" | "detailed">("summary");
  const [citationStyle, setCitationStyle] = useState<string>("apa");
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <div className="py-12 text-center animate-fade-in">
        <div className="inline-block p-4 rounded-full bg-accent/10 mb-4">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h3 className="text-xl font-semibold">Analyzing sources and generating report...</h3>
        <p className="text-gray-500 mt-2">
          We're searching the web and compiling the most relevant information.
        </p>
      </div>
    );
  }

  if (!data) return null;

  const handleCopyText = () => {
    const text = document.getElementById("research-content")?.textContent;
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const formatSourceCitation = (source: Source): string => {
    if (citationStyle === "apa") {
      return `${source.publisher ? source.publisher + ". " : ""}(${source.date || "n.d."}). ${source.title}. Retrieved from ${source.url}`;
    } else if (citationStyle === "mla") {
      return `"${source.title}." ${source.publisher ? source.publisher + ", " : ""}${source.date || "n.d."}, ${source.url}.`;
    } else {
      return `${source.title}. ${source.url}${source.date ? " (" + source.date + ")" : ""}`;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary">{data.title}</h2>
          <p className="text-gray-500 mt-1">
            Based on {data.references.length} authoritative sources
            {selectedIndustries.length > 0 && (
              <> • Focused on {selectedIndustries.join(", ")}</>
            )}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 animate-slide-up" style={{animationDelay: '100ms'}}>
          <Select value={citationStyle} onValueChange={setCitationStyle}>
            <SelectTrigger className="w-[140px] transition-all duration-200 hover:border-accent">
              <SelectValue placeholder="Citation Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apa">APA Style</SelectItem>
              <SelectItem value="mla">MLA Style</SelectItem>
              <SelectItem value="harvard">Harvard Style</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={handleCopyText} 
            variant="outline" 
            className="flex items-center gap-2 transition-all duration-200 hover:bg-accent hover:text-white"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy Text"}
          </Button>

          <Button 
            variant="outline" 
            className="flex items-center gap-2 transition-all duration-200 hover:bg-accent hover:text-white"
          >
            <Download size={16} />
            Export PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="summary" className="w-full" onValueChange={(v) => setViewMode(v as "summary" | "detailed")}>
        <TabsList className="mb-6 bg-gray-100 animate-scale-in">
          <TabsTrigger value="summary" className="data-[state=active]:bg-accent data-[state=active]:text-white transition-all duration-200">Summary View</TabsTrigger>
          <TabsTrigger value="detailed" className="data-[state=active]:bg-accent data-[state=active]:text-white transition-all duration-200">Detailed View</TabsTrigger>
        </TabsList>

        <div id="research-content">
          <TabsContent value="summary">
            <div className="grid gap-6">
              <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-secondary">Introduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{data.introduction}</p>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in" style={{animationDelay: '100ms'}}>
                <CardHeader>
                  <CardTitle className="text-secondary">Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {data.insights.map((insight, index) => (
                      <li key={index}>{insight.content}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in" style={{animationDelay: '200ms'}}>
                <CardHeader>
                  <CardTitle className="text-secondary">Conclusion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{data.conclusion}</p>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in" style={{animationDelay: '300ms'}}>
                <CardHeader>
                  <CardTitle className="text-secondary">Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {data.references.slice(0, 3).map((source, index) => (
                      <li key={index} className="flex gap-2">
                        <LinkIcon size={16} className="mt-1 flex-shrink-0 text-accent" />
                        <div>
                          <p className="text-sm">{formatSourceCitation(source)}</p>
                        </div>
                      </li>
                    ))}
                    {data.references.length > 3 && (
                      <li className="text-accent text-sm font-medium">
                        + {data.references.length - 3} more sources (view in detailed mode)
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="detailed">
            <div className="grid gap-6">
              <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-secondary">Introduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{data.introduction}</p>
                </CardContent>
              </Card>

              {data.insights.map((insight, index) => (
                <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in" style={{animationDelay: `${index * 100}ms`}}>
                  <CardHeader>
                    <CardTitle className="text-secondary">{insight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{insight.content}</p>
                  </CardContent>
                </Card>
              ))}

              <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in" style={{animationDelay: '300ms'}}>
                <CardHeader>
                  <CardTitle className="text-secondary">Key Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {data.statistics.map((stat, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 mt-2 rounded-full bg-accent flex-shrink-0" />
                        <div>
                          <p className="font-semibold">{stat.value}</p>
                          <p className="text-gray-600">{stat.label}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in" style={{animationDelay: '400ms'}}>
                <CardHeader>
                  <CardTitle className="text-secondary">Expert Opinions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.expertOpinions.map((opinion, index) => (
                      <div key={index} className="border-l-4 border-accent/20 pl-4 py-1 hover:border-accent transition-all duration-200">
                        <p className="italic">"{opinion.quote}"</p>
                        <p className="text-sm font-semibold mt-2">
                          — {opinion.name}, {opinion.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in" style={{animationDelay: '500ms'}}>
                <CardHeader>
                  <CardTitle className="text-secondary">Conclusion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{data.conclusion}</p>
                </CardContent>
              </Card>

              <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in" style={{animationDelay: '600ms'}}>
                <CardHeader>
                  <CardTitle className="text-secondary">References</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {data.references.map((source, index) => (
                      <li key={index} className="flex gap-2">
                        <LinkIcon size={16} className="mt-1 flex-shrink-0 text-accent" />
                        <div>
                          <p className="text-sm">{formatSourceCitation(source)}</p>
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-accent hover:underline transition-all duration-200"
                          >
                            Visit Source
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
