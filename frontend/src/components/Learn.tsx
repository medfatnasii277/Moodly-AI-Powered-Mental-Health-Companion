import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Book, X, Loader2 } from "lucide-react";
import axios from 'axios';

const Learn = () => {
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mentalHealthConditions = [
    {
      id: 'depression',
      title: 'Depression',
      description: 'Major depressive disorder impacts mood, thoughts, and daily functioning.',
      color: 'bg-blue-100'
    },
    {
      id: 'anxiety',
      title: 'Anxiety Disorders',
      description: 'A group of conditions characterized by persistent and excessive worry.',
      color: 'bg-green-100'
    },
    {
      id: 'ptsd',
      title: 'Post-Traumatic Stress Disorder (PTSD)',
      description: 'A condition triggered by experiencing or witnessing traumatic events.',
      color: 'bg-purple-100'
    },
    {
      id: 'eating',
      title: 'Eating Disorders',
      description: 'Serious conditions related to persistent eating behaviors that negatively impact health.',
      color: 'bg-yellow-100'
    },
    {
      id: 'schizophrenia',
      title: 'Schizophrenia',
      description: 'A chronic brain disorder that affects how a person thinks, feels, and behaves.',
      color: 'bg-red-100'
    }
  ];

  useEffect(() => {
    if (selectedCondition) {
      fetchSymptoms(selectedCondition);
    }
  }, [selectedCondition]);

  const fetchSymptoms = async (condition) => {
    setLoading(true);
    setError(null);
    
    const educationalPrompt = `\nAs a mental health educational resource, provide exactly 5 common symptoms of ${condition.title} in a brief, informative format. Each symptom should be a single complete sentence. Format the response as a JSON array of symptoms without any additional text. Example format: ["Symptom 1.", "Symptom 2.", "Symptom 3.", "Symptom 4.", "Symptom 5."]`;
    
    try {
      const response = await axios.post('http://localhost:3000/ask', { message: educationalPrompt });
      
      let parsedSymptoms = [];
      try {
        // Try to parse JSON response
        const responseText = response.data.response;
        const cleanedJsonText = responseText.replace(/^```json|```$/g, '').trim();
        parsedSymptoms = JSON.parse(cleanedJsonText);
      } catch (jsonError) {
        // If JSON parsing fails, try to extract with regex
        const responseText = response.data.response;
        parsedSymptoms = responseText
          .split(/\d+\.|\n-|\n•/)
          .map(item => item.trim())
          .filter(item => item.length > 0)
          .slice(0, 5);
      }
      
      setSymptoms(parsedSymptoms.slice(0, 5));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching symptoms:', err);
      setError('Failed to load symptoms. Please try again.');
      setLoading(false);
    }
  };

  const handleConditionClick = (condition) => {
    setSelectedCondition(condition);
  };

  const handleCloseDetails = () => {
    setSelectedCondition(null);
    setSymptoms([]);
  };

  return (
    <section className="py-16 bg-calm-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mental Health Education</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about common mental health conditions, their symptoms, and treatment approaches.
          </p>
        </div>

        {selectedCondition ? (
          <Card className="max-w-4xl mx-auto shadow-lg rounded-3xl border-calm-gray/30 overflow-hidden mb-8">
            <CardHeader className={`${selectedCondition.color}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <CardTitle className="text-2xl">{selectedCondition.title}</CardTitle>
                    <CardDescription className="text-base">{selectedCondition.description}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleCloseDetails} className="rounded-full h-10 w-10">
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Common Symptoms</h3>
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading symptoms...</span>
                </div>
              ) : error ? (
                <div className="text-center p-4 bg-red-50 text-red-600 rounded-lg">
                  {error}
                </div>
              ) : (
                <ul className="space-y-3">
                  {symptoms.map((symptom, index) => (
                    <li key={index} className="bg-calm-gray/20 rounded-xl p-4 flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      <p>{symptom}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>

            <CardFooter className="border-t p-4 flex justify-between">
              <p className="text-sm text-muted-foreground">
                This information is educational and not a substitute for professional diagnosis or treatment.
              </p>
              <Button onClick={handleCloseDetails} variant="outline" className="rounded-xl">
                Close
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentalHealthConditions.map((condition) => (
              <Card 
                key={condition.id} 
                className="shadow-md hover:shadow-lg transition-shadow cursor-pointer rounded-2xl overflow-hidden"
                onClick={() => handleConditionClick(condition)}
              >
                <CardHeader className={`${condition.color}`}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Book className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="ml-3 text-xl">{condition.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  <p className="text-muted-foreground">{condition.description}</p>
                </CardContent>
                <CardFooter className="bg-calm-gray/10 p-4">
                  <Button className="w-full rounded-xl">Learn About Symptoms</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Learn;