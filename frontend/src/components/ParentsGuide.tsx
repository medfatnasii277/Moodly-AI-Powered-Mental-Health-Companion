import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, Shield, Brain, Lightbulb, 
  Clock, Loader2, ChevronDown, ChevronUp, AlertTriangle 
} from "lucide-react";
import axios from 'axios';

const ParentsGuide = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("development");
  const contentRef = useRef({});
  
  const sections = {
    development: [
      {
        id: 'early-childhood',
        title: 'Early Childhood (0-5 years)',
        icon: <Heart className="h-6 w-6 text-pink-500" />,
        prompt: 'Provide 3 key parenting tips for supporting mental health in early childhood (0-5 years). Format as concise, actionable advice with brief explanation of importance. Keep each tip under 50 words.'
      },
      {
        id: 'middle-childhood',
        title: 'Middle Childhood (6-11 years)',
        icon: <Shield className="h-6 w-6 text-blue-500" />,
        prompt: 'Provide 3 key parenting tips for supporting mental health in middle childhood (6-11 years). Format as concise, actionable advice with brief explanation of importance. Keep each tip under 50 words.'
      },
      {
        id: 'adolescence',
        title: 'Adolescence (12-18 years)',
        icon: <Brain className="h-6 w-6 text-purple-500" />,
        prompt: 'Provide 3 key parenting tips for supporting mental health in adolescence (12-18 years). Format as concise, actionable advice with brief explanation of importance. Keep each tip under 50 words.'
      }
    ],
    warning: [
      {
        id: 'behavior-changes',
        title: 'Concerning Behavior Changes',
        icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
        prompt: 'List 4 warning signs of mental health issues in children that parents should watch for. Format as brief descriptions (under 30 words each) of observable behaviors that may indicate a need for professional help.'
      },
      {
        id: 'when-to-seek',
        title: 'When to Seek Help',
        icon: <Clock className="h-6 w-6 text-red-500" />,
        prompt: 'Provide 3 clear indicators for when parents should seek professional mental health help for their child. Format as specific scenarios or thresholds that signal the need for intervention. Keep each indicator under 40 words.'
      }
    ],
    impact: [
      {
        id: 'parenting-styles',
        title: 'Parenting Styles & Mental Health',
        icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
        prompt: 'Describe 3 ways different parenting styles impact child mental health. Focus on authoritative, authoritarian, and permissive approaches. Format as brief cause-effect relationships, explaining how each style affects development. Keep each description under 50 words.'
      },
      {
        id: 'long-term',
        title: 'Long-term Impact of Childhood',
        icon: <Heart className="h-6 w-6 text-green-500" />,
        prompt: 'Explain 3 ways childhood experiences affect adult mental health. Format as brief explanations of how early experiences shape later outcomes. Include one positive and one negative example. Keep each explanation under 50 words.'
      }
    ]
  };

  // Fetch content for a specific section
  const fetchContent = async (section) => {
    // If we already have content for this section, don't fetch again
    if (contentRef.current[section.id]) {
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:3000/ask', { 
        message: section.prompt 
      });
      
      // Process response to extract points
      const responseText = response.data.response;
      
      // Split response into points (looking for numbered points or bullet points)
      const points = responseText
        .split(/\d+\.\s|\n-|\n•/)
        .map(point => point.trim())
        .filter(point => point.length > 0);
      
      // Update the content state with the fetched data
      setContent(prevContent => ({
        ...prevContent,
        [section.id]: points
      }));
      
      // Also store in ref for checking if we've already fetched
      contentRef.current = {
        ...contentRef.current,
        [section.id]: points
      };
      
    } catch (err) {
      console.error('Error fetching content:', err);
      // Set some fallback content in case of error
      setContent(prevContent => ({
        ...prevContent,
        [section.id]: ['Unable to load content. Please try again later.']
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSectionClick = (section) => {
    // If this section is already expanded, collapse it
    if (expandedSection === section.id) {
      setExpandedSection(null);
      return;
    }
    
    // Otherwise, expand it and fetch content if needed
    setExpandedSection(section.id);
    fetchContent(section);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    setExpandedSection(null); // Collapse any expanded section when changing tabs
  };

  return (
    <section className="py-16 bg-calm-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Parents Guide to Child Mental Health</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding how your parenting influences your child's mental development and wellbeing.
          </p>
        </div>

        <Tabs 
          defaultValue="development" 
          value={activeTab}
          onValueChange={handleTabChange}
          className="max-w-4xl mx-auto"
        >
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="development">Child Development</TabsTrigger>
            <TabsTrigger value="warning">Warning Signs</TabsTrigger>
            <TabsTrigger value="impact">Parental Impact</TabsTrigger>
          </TabsList>

          {Object.entries(sections).map(([tabId, tabSections]) => (
            <TabsContent key={tabId} value={tabId} className="space-y-6">
              {tabSections.map((section) => (
                <Card 
                  key={section.id} 
                  className="shadow-md rounded-2xl overflow-hidden"
                >
                  <div 
                    className="flex justify-between items-center p-5 cursor-pointer hover:bg-calm-gray/10 transition-colors"
                    onClick={() => handleSectionClick(section)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white rounded-full shadow-sm">
                        {section.icon}
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                    <div>
                      {expandedSection === section.id ? 
                        <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      }
                    </div>
                  </div>

                  {expandedSection === section.id && (
                    <CardContent className="p-5 border-t">
                      {loading ? (
                        <div className="flex justify-center items-center h-32">
                          <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                          <span>Loading guidance...</span>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {content[section.id]?.map((point, index) => (
                            <div key={index} className="bg-calm-gray/10 rounded-xl p-4">
                              <p className="text-lg">{point}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}
              
              <div className="mt-8 p-5 bg-primary/10 rounded-2xl">
                <p className="text-center text-muted-foreground">
                  These guidelines are for educational purposes only and not a substitute for professional advice.
                  If you have concerns about your child's mental health, please consult a healthcare professional.
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ParentsGuide;