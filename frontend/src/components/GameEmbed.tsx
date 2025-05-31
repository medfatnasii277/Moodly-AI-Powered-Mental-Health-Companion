import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GamepadIcon, Maximize2, Minimize2 } from "lucide-react";

const games = [
  {
    id: 1,
    title: "Fruit Chop",
    description: "Swipe the screen to chop fruits but don't hit the bombs!",
    embedUrl: "https://zv1y2i8p.play.gamezop.com/g/rkWfy2pXq0r", 
    cover: "bg-calm-blue",
  },
  {
    id: 2,
    title: "Tower Twist",
    description: "Navigate the gaps as your fall through this helix tower labyrinth .",
    embedUrl: "https://zv1y2i8p.play.gamezop.com/g/HJT46GkPcy7" ,
    cover: "bg-calm-green",
  },
  {
    id: 3,
    title: "Bowling Stars",
    description: "Let's see how many pins you can knock down.",
    embedUrl: "https://zv1y2i8p.play.gamezop.com/g/BkdJhTX50B" ,
    cover: "bg-calm-yellow",
  }
];

const GameEmbed = () => {
  const [selectedGame, setSelectedGame] = useState(games[0]);
  const [expanded, setExpanded] = useState(false);
  const [gameLoaded, setGameLoaded] = useState(false);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setGameLoaded(false); 
  };

  return (
    <section id="games" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Therapeutic Games</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Engage with interactive games designed to reduce stress and improve mental well-being.
          </p>
        </div>

        <div className={`grid ${expanded ? '' : 'md:grid-cols-4'} gap-8`}>
          {!expanded && (
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-2xl font-bold">Select a Game</h3>
              {games.map((game) => (
                <div 
                  key={game.id}
                  onClick={() => handleGameSelect(game)} 
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 gentle-hover 
                    ${selectedGame.id === game.id 
                      ? 'bg-calm-lavender/50 border-2 border-calm-lavender' 
                      : 'bg-calm-gray/30 hover:bg-calm-gray/50'
                    }`}
                >
                  <h4 className="font-medium text-lg">{game.title}</h4>
                  <p className="text-muted-foreground">{game.description}</p>
                </div>
              ))}
            </div>
          )}

          <div className={`${expanded ? '' : 'md:col-span-3'}`}>
            <Card className="rounded-3xl overflow-hidden border-calm-gray/30 shadow-lg">
              <div className="bg-calm-lavender/30 p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <GamepadIcon className="h-6 w-6 mr-2 text-primary" />
                  <h3 className="text-xl font-semibold">{selectedGame.title}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setExpanded(!expanded)}
                  className="rounded-full"
                >
                  {expanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                </Button>
              </div>
              <CardContent className="p-0">
                <div className={`${selectedGame.cover} aspect-video w-full flex items-center justify-center p-12`}>
                  <div className="text-center bg-white/90 p-8 rounded-3xl max-w-md">
                    <GamepadIcon className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-2">Game Embed</h3>
                    <p className="text-lg mb-4">
                      Engage in this relaxing activity when you're ready.
                    </p>
                    {gameLoaded && selectedGame.embedUrl !== "#" && (
                      <iframe 
                        style={{ width: '100%', height: '400px', border: '0' }} 
                        src={selectedGame.embedUrl}
                        title={selectedGame.title}
                      />
                    )}
                    <Button 
                      className="rounded-full"
                      onClick={() => setGameLoaded(true)} 
                    >
                      Load Game
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameEmbed;
