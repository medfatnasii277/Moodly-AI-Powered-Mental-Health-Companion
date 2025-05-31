import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ImageIcon, Send, RefreshCw, History } from "lucide-react";
import axios from "axios";

const HIDDEN_EMOTIONAL_PROMPT = `
Create a realistic artistic portrait that visualizes this emotional state. Focus on capturing stress-related physical manifestations: include subtle details like tension in facial muscles, skin tone variations (pallor or flushed areas depending on emotion), eye expressions (tired, anxious, or sad), and body language (particularly in shoulders and posture).

Use color psychology effectively - employ cooler, muted tones for negative emotions or warmer tones for positive ones. Lighting should reflect the emotional intensity - harsh shadows for distress, softer lighting for calm states. The portrait should feel deeply human and relatable, avoiding exaggeration while still clearly conveying the emotional state.

Most importantly, maintain dignity in the portrayal - the image should feel like an empathetic reflection rather than a caricature, helping the viewer understand how emotions manifest physically. Include subtle environmental elements that reflect the emotional atmosphere.
`;

const MindMirrorComponent = () => {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const generateImage = async (prompt) => {
    setIsLoading(true);
    setCurrentPrompt(prompt);
    
    try {
      const finalPrompt = prompt + " " + HIDDEN_EMOTIONAL_PROMPT;
      
      const response = await axios.post('http://localhost:3000/image', { prompt: finalPrompt }, {
        responseType: 'blob', 
      });

      const imageBlob = response.data;
      const imageUrl = URL.createObjectURL(imageBlob);
      
      setGeneratedImage(imageUrl);
      
      // Save to history
      setHistory(prev => [{
        prompt: prompt,
        image: imageUrl,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev.slice(0, 4)]); // Keep only the 5 most recent
      
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
      setDescription('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    generateImage(description);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Mind Mirror
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See how your emotional state might manifest physically. Describe how you're feeling, and we'll visualize it.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left sidebar - when expanded shows history */}
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardContent className="p-4">
                <Button 
                  variant="outline" 
                  className="w-full mb-4 flex items-center justify-center"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  <History className="mr-2 h-4 w-4" />
                  {showHistory ? "Hide History" : "Show History"}
                </Button>
                
                {showHistory && (
                  <div className="space-y-4 mt-4">
                    <h3 className="font-medium text-sm text-slate-500">RECENT VISUALIZATIONS</h3>
                    {history.length === 0 ? (
                      <p className="text-sm text-slate-400">No history yet</p>
                    ) : (
                      history.map((item, index) => (
                        <div 
                          key={index}
                          className="cursor-pointer hover:bg-slate-100 p-2 rounded-lg"
                          onClick={() => {
                            setGeneratedImage(item.image);
                            setCurrentPrompt(item.prompt);
                          }}
                        >
                          <img 
                            src={item.image} 
                            alt={item.prompt}
                            className="w-full h-16 object-cover rounded-md mb-1" 
                          />
                          <p className="text-xs truncate">{item.prompt}</p>
                          <p className="text-xs text-slate-400">{item.timestamp}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main content area */}
          <div className="md:col-span-4">
            <Card className="shadow-xl border-slate-200">
              <div className="relative">
                {/* Image display area */}
                <div className="aspect-[4/3] bg-slate-100 rounded-t-lg flex items-center justify-center overflow-hidden">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center">
                      <RefreshCw className="h-12 w-12 text-slate-400 animate-spin" />
                      <p className="mt-4 text-slate-500">Generating your visualization...</p>
                    </div>
                  ) : generatedImage ? (
                    <img 
                      src={generatedImage} 
                      alt="Emotional visualization" 
                      className="w-full h-full object-contain" 
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <ImageIcon className="h-16 w-16 mb-4" />
                      <p className="text-lg">Enter your emotional state below to generate a visualization</p>
                    </div>
                  )}
                </div>
                
                {/* Current prompt display */}
                {currentPrompt && !isLoading && (
                  <div className="absolute top-4 left-4 right-4 bg-black/50 text-white p-3 rounded-lg backdrop-blur-sm">
                    <p className="text-sm font-medium">"{currentPrompt}"</p>
                  </div>
                )}
              </div>
              
              <CardFooter className="p-4">
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="flex gap-2">
                    <Input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe how you're feeling right now..."
                      className="flex-1 text-lg rounded-xl bg-slate-50 border-slate-200"
                    />
                    <Button
                      type="submit"
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={!description.trim() || isLoading}
                    >
                      {isLoading ? (
                        <RefreshCw className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="mt-3 text-center">
                    <p className="text-xs text-slate-500">
                      Try describing your emotions, stress levels, or current mood in detail
                    </p>
                  </div>
                </form>
              </CardFooter>
            </Card>
            
            {generatedImage && (
              <div className="mt-4 text-center">
                <Button 
                  variant="outline" 
                  className="text-sm"
                  onClick={() => setGeneratedImage('')}
                >
                  Start Over
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MindMirrorComponent;