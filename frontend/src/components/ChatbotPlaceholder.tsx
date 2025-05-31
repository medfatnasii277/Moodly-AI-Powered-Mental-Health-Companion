
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";

const ChatbotPlaceholder = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm here to help support your mental well-being. How are you feeling today?" }
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return; 
  
    setMessages(prevMessages => [
      ...prevMessages,
      { sender: 'user', text: message }
    ]);
  
   
    const mentalHealthPrompt = "\nPlease respond as a mental health mentor. Be empathetic, cheerful, and non-judgmental, helping those who suffer from mental health issues. and pls keep it shorter no longer then 50 words per response ty ";
  
    
    const fullMessage = message + mentalHealthPrompt;
  
    try {
      const response = await axios.post('http://localhost:3000/ask', { message: fullMessage });
  
     
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'bot', text: response.data.response } 
      ]);
    } catch (err) {
      console.error('Error:', err);
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' }
      ]);
    }
  

    setMessage('');
  };

  return (
    <section className="py-16 bg-calm-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">"Mira: A Friend for Your Mind, Body, and Soul"</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Talk with our compassionate AI assistant designed to provide support and guidance through difficult times.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg rounded-3xl border-calm-gray/30 overflow-hidden">
          <CardHeader className="bg-calm-lavender/30">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <CardTitle className="text-2xl">Mental Health Companion</CardTitle>
                <CardDescription className="text-base">Always here to listen and support</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`bg-${msg.sender === 'user' ? 'primary' : 'calm-gray'}/30 rounded-2xl px-6 py-3 max-w-[80%]`}>
                    <p className="text-lg">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="border-t p-4">
            <div className="flex w-full space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 text-lg rounded-xl"
              />
              <Button
                onClick={sendMessage}
                className="rounded-xl"
                size="icon"
                disabled={!message.trim()} 
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default ChatbotPlaceholder;