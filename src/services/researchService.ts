
import { ResearchData } from "@/components/ResearchReport";

// Mock research generation with industry filtering
export async function generateResearch(query: string, industries: string[] = []): Promise<ResearchData> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // In a real implementation, you would use the OpenAI API key and pass the industry filters to generate targeted research
  const apiKey = localStorage.getItem('openai_api_key');
  
  // For demo purposes, we'll return a mock response with the industries included
  const industryText = industries.length > 0 
    ? `with focus on the ${industries.join(', ')} ${industries.length > 1 ? 'industries' : 'industry'}`
    : '';

  return {
    title: `Research Report: ${query} ${industryText}`,
    introduction: `This research report provides a comprehensive analysis of ${query} ${industryText}.`,
    insights: [
      {
        title: "Overview",
        content: `${query} is a complex topic that intersects with various domains ${industryText}. This section explores the fundamental concepts and current landscape.`
      },
      {
        title: "Key Developments",
        content: `Recent advancements in ${query} ${industryText} have shown promising results. This section covers the latest innovations and breakthroughs.`
      },
      {
        title: "Impact Analysis",
        content: `The impact of ${query} ${industryText} cannot be overstated. This section analyzes the social, economic, and technological implications.`
      }
    ],
    statistics: [
      {
        value: "78%",
        label: `of organizations are investing in ${query} research ${industryText}`
      },
      {
        value: "$4.2B",
        label: `global market value for ${query} solutions ${industryText}`
      },
      {
        value: "3.5x",
        label: `ROI for companies implementing ${query} strategies ${industryText}`
      }
    ],
    expertOpinions: [
      {
        name: "Dr. Jane Smith",
        title: `${getRandomIndustryExpert(industries)}`,
        quote: `"${query} represents one of the most significant opportunities for transformation we've seen in decades. Organizations that don't adapt will fall behind."`
      },
      {
        name: "Prof. Alex Johnson",
        title: `${getRandomIndustryExpert(industries)}`,
        quote: `"Our research indicates that ${query} will continue to evolve rapidly. We're only seeing the beginning of its potential impact."`
      }
    ],
    conclusion: `In conclusion, ${query} ${industryText} presents both significant opportunities and challenges. Organizations and individuals who stay informed and adaptable will be best positioned to leverage its benefits while mitigating potential risks.`,
    references: [
      {
        title: "Journal of Advanced Research",
        url: "https://example.com/research"
      },
      {
        title: "Industry Analysis Report 2024",
        url: "https://example.com/industry-analysis"
      },
      {
        title: "Global Trends Institute",
        url: "https://example.com/trends"
      }
    ]
  };
}

function getRandomIndustryExpert(industries: string[]): string {
  const industryMap: Record<string, string> = {
    "healthcare": "Healthcare Innovation Researcher",
    "finance": "Financial Technology Analyst",
    "technology": "Technology Strategy Director",
    "education": "Educational Technology Specialist",
    "retail": "Retail Transformation Expert",
    "manufacturing": "Manufacturing Innovation Lead",
    "energy": "Sustainable Energy Consultant",
    "agriculture": "Agricultural Technology Researcher",
  };

  if (industries.length > 0) {
    const selectedIndustry = industries[Math.floor(Math.random() * industries.length)];
    return industryMap[selectedIndustry] || "Industry Expert";
  }

  return "Research Director";
}
