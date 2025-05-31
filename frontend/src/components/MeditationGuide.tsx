import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Play, Pause, Clock, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import axios from 'axios';


const backgroundTracks = [
  "/audio/calm.mp3",
  "/audio/calm2.mp3",
  "/audio/calm3.mp3",
  "/audio/calm4.mp3",
  "/audio/calm5.mp3"
];

const meditations = [
  {
    id: "breathing",
    title: "Deep Breathing",
    duration: "1 min",
    description: "Focus on slow, deep breaths to calm your nervous system and center your mind.",
    icon: <Sun className="h-10 w-10 text-calm-yellow" />,
    steps: [
      "Find a comfortable seated position with your back straight but not rigid",
      "Gently close your eyes and take a moment to settle in",
      "Notice the weight of your body against the chair or floor",
      "Bring your awareness to your natural breathing pattern",
      "Begin to deepen your breath, inhaling slowly through your nose",
      "Feel your belly expand as you fill your lungs completely",
      "Hold your breath for a comfortable 4 seconds",
      "Exhale slowly through your mouth for 6 seconds, releasing all tension",
      "Feel your shoulders relaxing with each breath out",
      "Continue this rhythmic breathing, staying present with each cycle"
    ],
    level: "Beginner",
    stepTiming: 6000, 
    pauseBeforeStart: 5000 // 5 second pause before starting
  },
  {
    id: "body-scan",
    title: "Body Scan",
    duration: "2 min",
    description: "Move your attention through your body, releasing tension and promoting deep relaxation.",
    icon: <Moon className="h-10 w-10 text-calm-lavender" />,
    steps: [
      "Lie down in a comfortable position or sit with your back supported",
      "Close your eyes and take three deep, cleansing breaths",
      "Bring your awareness to the top of your head, noticing any sensations",
      "Slowly move your attention down to your face, relaxing your jaw and eyes",
      "Continue down to your neck and shoulders, inviting them to soften",
      "Feel your arms becoming heavy and relaxed, all the way to your fingertips",
      "Bring awareness to your chest and back, releasing any held tension",
      "Notice your abdomen rising and falling with each breath",
      "Allow your hips and pelvis to sink into the surface beneath you",
      "Feel your legs becoming heavy, releasing all the way down to your toes",
      "Take a moment to sense your entire body as a whole, completely at ease",
      "Enjoy this state of complete relaxation, breathing naturally"
    ],
    level: "Intermediate",
    stepTiming: 10000, 
    pauseBeforeStart: 8000 
  },
  {
    id: "loving-kindness",
    title: "Loving Kindness",
    duration: "3 min",
    description: "Cultivate feelings of compassion for yourself and others through guided visualization.",
    icon: <BookOpen className="h-10 w-10 text-calm-pink" />,
    steps: [
      "Find a comfortable seated position with your eyes gently closed",
      "Take several deep breaths, allowing your body to relax completely",
      "Bring to mind an image of yourself, seeing yourself clearly",
      "Place your hand over your heart and feel its gentle rhythm",
      "Silently repeat: 'May I be safe and protected'",
      "Feel these words resonating within you: 'May I be healthy and strong'",
      "Continue with: 'May I be happy and at peace'",
      "And finally: 'May I accept myself just as I am'",
      "Now bring to mind someone you care deeply about",
      "Extend these same wishes to them, feeling the connection between you",
      "Next, visualize someone you have neutral feelings toward",
      "Offer them the same kind wishes, noticing how it feels to extend compassion",
      "If you're ready, bring to mind someone who has caused you difficulty",
      "With care for yourself, offer them wishes for peace and well-being",
      "Finally, expand this feeling of compassion to all beings everywhere",
      "Rest in this feeling of connection for a few moments"
    ],
    level: "Advanced",
    stepTiming: 11250, 
    pauseBeforeStart: 10000 
  }
];

const MeditationGuide = () => {
  const [activeTab, setActiveTab] = useState("breathing");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepsVisible, setStepsVisible] = useState(false);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("");
  const [audioMuted, setAudioMuted] = useState(false);
  const [breathCount, setBreathCount] = useState(null);
  const [showBreathingGuide, setShowBreathingGuide] = useState(false);
  
  const audioRef = useRef(null); 
  const bgAudioRef = useRef(null); 
  const meditationActiveRef = useRef(false); 
  const meditationIdRef = useRef(""); 
  const timerRef = useRef(null); 
  const transitionTimerRef = useRef(null); // For smooth step transitions

  const meditation = meditations.find(med => med.id === activeTab);
  const steps = meditation?.steps || [];


  const getRandomTrack = () => {
    const randomIndex = Math.floor(Math.random() * backgroundTracks.length);
    return backgroundTracks[randomIndex];
  };

  
  useEffect(() => {
    if (!bgAudioRef.current) {
      bgAudioRef.current = new Audio();
      bgAudioRef.current.loop = true; 
      bgAudioRef.current.volume = 0.35; 
    }
  }, []);


  useEffect(() => {
   
    setCurrentStepIndex(0);
    setStepsVisible(false);
    setIsPlaying(false);
    meditationActiveRef.current = false;
    meditationIdRef.current = activeTab;
    setShowBreathingGuide(false);
    setBreathCount(null);
    

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
      bgAudioRef.current.currentTime = 0;
    }
    
    setIsRequestInProgress(false);
  }, [activeTab]);


  const toggleMute = () => {
    if (bgAudioRef.current) {
      bgAudioRef.current.muted = !audioMuted;
      setAudioMuted(!audioMuted);
    }
  };

  const fetchTTS = async (text) => {
    if (isRequestInProgress) return null;

    try {
      setIsRequestInProgress(true);
      console.log("Fetching TTS for:", text); 

      const response = await axios.post(
        'http://localhost:3000/tts',  
        { text },
        { responseType: 'blob' }
      );

      console.log("TTS response received"); 
      const audioBlob = response.data;
      const audioUrl = URL.createObjectURL(audioBlob);
      
  
      const audio = new Audio(audioUrl);
      
     
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      audioRef.current = audio;
      
      
      return new Promise((resolve) => {
        audio.onended = () => {
          console.log("Audio playback ended");
          setIsRequestInProgress(false);
          resolve(true);
        };
        
        audio.onerror = (e) => {
          console.error("Audio playback error:", e); 
          setIsRequestInProgress(false);
          resolve(false);
        };
        
        
        console.log("Playing audio...");
        audio.play().catch(error => {
          console.error("Failed to play audio:", error); 
          setIsRequestInProgress(false);
          resolve(false);
        });
      });
    } catch (error) {
      console.error("Error fetching TTS:", error);
      setIsRequestInProgress(false);
      return false;
    }
  };


  const startBreathingGuide = () => {
    if (activeTab === "breathing") {
      setShowBreathingGuide(true);
      setBreathCount(0);
      
     
      const breathingCycle = () => {
        setBreathCount(prev => {
          const newCount = (prev + 1) % 3;
          return newCount;
        });
      };
      
   
      timerRef.current = setInterval(breathingCycle, 4700);
    }
  };

  const startMeditation = () => {
    if (isPlaying) {
      stopMeditation();
      return;
    }
    
    
    meditationIdRef.current = activeTab;
    
 
    setCurrentStepIndex(0);
    setStepsVisible(true);
    setIsPlaying(true);
    meditationActiveRef.current = true;
    
   
    const randomTrack = getRandomTrack();
    setCurrentTrack(randomTrack);
    
 
    if (bgAudioRef.current) {
      bgAudioRef.current.src = randomTrack;
      bgAudioRef.current.volume = 0;  
      bgAudioRef.current.currentTime = 0;
      bgAudioRef.current.muted = audioMuted;
      console.log(`Playing background track: ${randomTrack}`);
      

      bgAudioRef.current.play().then(() => {
      
        let vol = 0;
        const fadeIn = setInterval(() => {
          if (vol < 0.35) {
            vol += 0.01;
            bgAudioRef.current.volume = vol;
          } else {
            clearInterval(fadeIn);
          }
        }, 100);
      }).catch(e => console.error("Failed to play background audio:", e));
    }
    
  
    if (activeTab === "breathing") {
      startBreathingGuide();
    }
    
   
    fetchTTS(`Welcome to ${meditation.title} meditation. Take a moment to get comfortable.`).then(() => {
    
      timerRef.current = setTimeout(() => {
        if (meditationActiveRef.current && activeTab === meditationIdRef.current) {
          narrateCurrentStep();
        }
      }, meditation.pauseBeforeStart || 5000);
    });
  };

  const stopMeditation = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setStepsVisible(false);
    meditationActiveRef.current = false;
    setShowBreathingGuide(false);
    setBreathCount(null);
    
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
   
    if (bgAudioRef.current && bgAudioRef.current.paused === false) {
      const fadeOut = setInterval(() => {
        if (bgAudioRef.current.volume > 0.05) {
          bgAudioRef.current.volume -= 0.05;
        } else {
          bgAudioRef.current.pause();
          bgAudioRef.current.currentTime = 0;
          clearInterval(fadeOut);
        }
      }, 100);
    }
    
    setIsRequestInProgress(false);
  };

  
  const narrateCurrentStep = async () => {
   
    if (!meditationActiveRef.current || activeTab !== meditationIdRef.current) {
      console.log("Meditation stopped or changed"); 
      return;
    }
    
  
    if (currentStepIndex >= steps.length) {
      console.log("Reached end of steps"); // Debug log
      return;
    }
    
    console.log(`Narrating step ${currentStepIndex + 1} of ${steps.length}`); 
    
  
    const success = await fetchTTS(steps[currentStepIndex]);
    
   
    if (success && meditationActiveRef.current && activeTab === meditationIdRef.current) {
      
      timerRef.current = setTimeout(() => {
       
        if (meditationActiveRef.current && activeTab === meditationIdRef.current) {
          if (currentStepIndex < steps.length - 1) {
        
            transitionTimerRef.current = setTimeout(() => {
              setCurrentStepIndex(prevIndex => prevIndex + 1);
            }, 300); 
          } else {
         
            timerRef.current = setTimeout(() => {
              if (meditationActiveRef.current && activeTab === meditationIdRef.current) {
              
                fetchTTS("Your meditation is now complete. Take a moment to notice how you feel. When you're ready, gently bring your awareness back to your surroundings.");
                
               
                if (bgAudioRef.current) {
                  const fadeAudio = setInterval(() => {
                    if (bgAudioRef.current.volume > 0.05) {
                      bgAudioRef.current.volume -= 0.05;
                    } else {
                      bgAudioRef.current.pause();
                      bgAudioRef.current.currentTime = 0;
                      clearInterval(fadeAudio);
                    }
                  }, 200);
                }
                
                
                setShowBreathingGuide(false);
                setBreathCount(null);
                if (timerRef.current) {
                  clearInterval(timerRef.current);
                }
                
              
                timerRef.current = setTimeout(() => {
                  meditationActiveRef.current = false;
                  setIsPlaying(false);
                }, 8000); 
              }
            }, 3000); 
          }
        }
      }, meditation.stepTiming || 8000); 
    }
  };


  useEffect(() => {
    if (isPlaying && meditationActiveRef.current && activeTab === meditationIdRef.current && currentStepIndex < steps.length) {
      narrateCurrentStep();
    }
  }, [currentStepIndex, isPlaying, activeTab, steps.length]);


  useEffect(() => {
    return () => {
      meditationActiveRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        clearInterval(timerRef.current);
      }
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
      }
    };
  }, []);

  
  const getBreathingAnimationStyle = () => {
    if (breathCount === 0) {
      return "scale-100 opacity-100 transition-transform duration-4000 ease-in"; // Inhale
    } else if (breathCount === 1) {
      return "scale-100 opacity-100 transition-transform duration-4000 ease-in"; // Hold
    } else {
      return "scale-90 opacity-80 transition-transform duration-6000 ease-out"; // Exhale
    }
  };

  const getBreathingGuidanceText = () => {
    if (breathCount === 0) return "Inhale...";
    if (breathCount === 1) return "Hold...";
    return "Exhale...";
  };

  return (
    <section id="meditation" className="py-16 bg-calm-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meditation Guide</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover mindfulness techniques to help reduce stress, improve focus, and find inner peace.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="breathing" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 rounded-full p-1 bg-calm-gray/30">
              {meditations.map((med) => (
                <TabsTrigger
                  key={med.id}
                  value={med.id}
                  className="rounded-full text-lg py-3 data-[state=active]:bg-white data-[state=active]:shadow"
                >
                  {med.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {meditations.map((meditation) => (
              <TabsContent key={meditation.id} value={meditation.id}>
                <Card className="rounded-3xl overflow-hidden border-calm-gray/30 shadow-lg">
                  <div className="md:grid md:grid-cols-3">
                    <div className="bg-calm-lavender/30 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="mb-4">{meditation.icon}</div>
                        <h3 className="text-2xl font-bold mb-2">{meditation.title}</h3>
                        <div className="flex items-center text-muted-foreground mb-4">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{meditation.duration}</span>
                          <span className="mx-2">•</span>
                          <span>{meditation.level}</span>
                        </div>
                        <p className="text-lg mb-6">{meditation.description}</p>
                      </div>
                      
                      <div className="space-y-4">
                        <Button 
                          onClick={startMeditation}
                          className="rounded-full bg-primary hover:bg-primary/90 w-full text-lg py-6"
                          disabled={isRequestInProgress && activeTab === meditationIdRef.current}
                        >
                          {isPlaying && activeTab === meditationIdRef.current ? (
                            <><Pause className="mr-2 h-5 w-5" /> End Meditation</>
                          ) : (
                            <><Play className="mr-2 h-5 w-5" /> Begin Meditation</>
                          )}
                        </Button>
                        
                        {/* Audio mute toggle button */}
                        <Button
                          variant="outline"
                          onClick={toggleMute}
                          className="rounded-full w-full"
                          disabled={!isPlaying}
                        >
                          {audioMuted ? (
                            <><VolumeX className="mr-2 h-5 w-5" /> Unmute Music</>
                          ) : (
                            <><Volume2 className="mr-2 h-5 w-5" /> Mute Music</>
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="col-span-2 p-6 md:p-8">
                      {/* Breathing visualization (only shown for breathing meditation) */}
                      {showBreathingGuide && activeTab === "breathing" && isPlaying && (
                        <div className="mb-8 flex flex-col items-center justify-center">
                          <div className={`w-32 h-32 rounded-full bg-calm-blue/30 mb-4 ${getBreathingAnimationStyle()}`} />
                          <p className="text-xl font-medium">{getBreathingGuidanceText()}</p>
                        </div>
                      )}
                    
                      <h4 className="text-xl font-semibold mb-4">How to Practice</h4>
                      {!isPlaying || activeTab !== meditationIdRef.current ? (
                        <div className="bg-calm-lavender/10 p-6 rounded-2xl">
                          <p className="text-lg text-muted-foreground mb-4">
                            For the best experience:
                          </p>
                          <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                            <li>Find a quiet space where you won't be disturbed</li>
                            <li>Sit or lie in a comfortable position</li>
                            <li>Wear headphones if possible</li>
                            <li>Allow yourself to fully follow the guidance</li>
                            <li>It's okay if your mind wanders—gently bring it back</li>
                          </ul>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {steps.slice(0, currentStepIndex + 1).map((step, index) => (
                            <div 
                              key={index} 
                              className={`flex items-start p-4 rounded-xl transition-all duration-500 ${
                                index === currentStepIndex ? "bg-calm-blue/10" : ""
                              }`}
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-calm-blue text-white mr-3">
                                {index + 1}
                              </span>
                              <p className="text-lg pt-1">{step}</p>
                            </div>
                          ))}
                          
                          {currentStepIndex < steps.length - 1 && (
                            <div className="mt-8 p-4 bg-calm-green/10 rounded-2xl border border-calm-green/20">
                              <h5 className="font-medium text-lg mb-2">Coming Up Next</h5>
                              <p className="text-muted-foreground">{steps[currentStepIndex + 1]}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default MeditationGuide;