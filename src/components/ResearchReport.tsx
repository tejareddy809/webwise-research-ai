
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Copy, Download, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    background?: string;
    developments?: string;
    benefits?: string;
  };
  statistics: Array<{ stat: string; source: string }>;
  expertOpinions: Array<{ expert: string; quote: string; affiliation?: string }>;
  casestudies: Array<{ title: string; description: string }>;
  conclusion: string;
  sources: Source[];
}

interface ResearchReportProps {
  data: ResearchData | null;
  isLoading: boolean;
}

export function ResearchReport({ data, isLoading }: ResearchReportProps) {
  const [viewMode, setViewMode] = useState<"summary" | "detailed">("summary");
  const [citationStyle, setCitationStyle] = useState<string>("apa");
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block p-4 rounded-full bg-research-100 mb-4">
          <div className="w-8 h-8 border-4 border-research-500 border-t-transparent rounded-full animate-spin"></div>
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">{data.title}</h2>
          <p className="text-gray-500 mt-1">
            Based on {data.sources.length} authoritative sources
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={citationStyle} onValueChange={setCitationStyle}>
            <SelectTrigger className="w-[140px]">
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
            className="flex items-center gap-2"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy Text"}
          </Button>

          <Button 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Export PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="summary" className="w-full" onValueChange={(v) => setViewMode(v as "summary" | "detailed")}>
        <TabsList className="mb-6">
          <TabsTrigger value="summary">Summary View</TabsTrigger>
          <TabsTrigger value="detailed">Detailed View</TabsTrigger>
        </TabsList>

        <div id="research-content">
          <TabsContent value="summary">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Introduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{data.introduction}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {data.insights.background && <li>{data.insights.background}</li>}
                    {data.insights.developments && <li>{data.insights.developments}</li>}
                    {data.insights.benefits && <li>{data.insights.benefits}</li>}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conclusion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{data.conclusion}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {data.sources.slice(0, 3).map((source, index) => (
                      <li key={index} className="flex gap-2">
                        <LinkIcon size={16} className="mt-1 flex-shrink-0 text-research-500" />
                        <div>
                          <p className="text-sm">{formatSourceCitation(source)}</p>
                        </div>
                      </li>
                    ))}
                    {data.sources.length > 3 && (
                      <li className="text-research-600 text-sm font-medium">
                        + {data.sources.length - 3} more sources (view in detailed mode)
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="detailed">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Introduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{data.introduction}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Background & Context</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{data.insights.background}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Developments & Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{data.insights.developments}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Benefits & Challenges</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{data.insights.benefits}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {data.statistics.map((stat, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 mt-2 rounded-full bg-research-500 flex-shrink-0" />
                        <div>
                          <p>{stat.stat}</p>
                          <p className="text-sm text-gray-500">Source: {stat.source}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expert Opinions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.expertOpinions.map((opinion, index) => (
                      <div key={index} className="border-l-4 border-research-200 pl-4 py-1">
                        <p className="italic">"{opinion.quote}"</p>
                        <p className="text-sm font-semibold mt-2">
                          — {opinion.expert}{opinion.affiliation ? `, ${opinion.affiliation}` : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Case Studies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.casestudies.map((casestudy, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4">
                        <h4 className="font-semibold mb-2">{casestudy.title}</h4>
                        <p>{casestudy.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conclusion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{data.conclusion}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>References</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {data.sources.map((source, index) => (
                      <li key={index} className="flex gap-2">
                        <LinkIcon size={16} className="mt-1 flex-shrink-0 text-research-500" />
                        <div>
                          <p className="text-sm">{formatSourceCitation(source)}</p>
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-research-600 hover:underline"
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
