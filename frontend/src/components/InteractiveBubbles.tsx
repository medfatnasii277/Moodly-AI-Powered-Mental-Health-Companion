import React, { useEffect, useRef, useState } from 'react';

const InteractiveBubbles = () => {
  const containerRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 }); // Start at center
  const requestRef = useRef();
  const bubbleCount = 12; // Number of bubbles to render
  const maxDistance = 200; // Max distance for bubble movement

  // Initialize bubbles on component mount
  useEffect(() => {
    const initialBubbles = Array.from({ length: bubbleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage of container width
      y: Math.random() * 100, // percentage of container height
      size: 15 + Math.random() * 40, // size in pixels
      color: getRandomColor(),
      baseX: Math.random() * 100, // Original position to float around
      baseY: Math.random() * 100,
      speedX: (Math.random() - 0.5) * 0.05, // Slow floating motion
      speedY: (Math.random() - 0.5) * 0.05,
      movementFactor: 0.3 + Math.random() * 0.7, // How much it moves with mouse
    }));

    setBubbles(initialBubbles);

    // Clean up animation frame on unmount
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position as percentage of container
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
    };

    // Add listener to window instead of just the container for better tracking
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const animateBubbles = () => {
      setBubbles(currentBubbles => 
        currentBubbles.map(bubble => {
          // Calculate base floating movement
          let newX = bubble.x + bubble.speedX;
          let newY = bubble.y + bubble.speedY;
          
          // Bounce off invisible walls
          if (newX < 0 || newX > 100) {
            bubble.speedX *= -1;
            newX = bubble.x + bubble.speedX; // Apply corrected speed
          }
          
          if (newY < 0 || newY > 100) {
            bubble.speedY *= -1;
            newY = bubble.y + bubble.speedY; // Apply corrected speed
          }
          
          // Apply mouse influence - pull bubbles toward mouse
          const distX = mousePosition.x - bubble.x;
          const distY = mousePosition.y - bubble.y;
          const distance = Math.sqrt(distX * distX + distY * distY);
          
          // If mouse is within influence range
          if (distance < maxDistance) {
            // Move bubble toward mouse based on distance and movement factor
            const influence = (1 - distance / maxDistance) * bubble.movementFactor;
            newX += distX * influence * 0.05;
            newY += distY * influence * 0.05;
          }
          
          return {
            ...bubble,
            x: newX,
            y: newY
          };
        })
      );
      
      requestRef.current = requestAnimationFrame(animateBubbles);
    };
    
    requestRef.current = requestAnimationFrame(animateBubbles);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mousePosition]);

  // Helper function to generate pastel colors
  function getRandomColor() {
    const calmColors = [
      'rgba(173, 216, 230, 0.6)', // Light blue
      'rgba(173, 230, 185, 0.5)', // Light green
      'rgba(230, 173, 216, 0.5)', // Light purple
      'rgba(230, 216, 173, 0.5)', // Light yellow
      'rgba(216, 173, 230, 0.5)'  // Light violet
    ];
    return calmColors[Math.floor(Math.random() * calmColors.length)];
  }

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden z-0"
      // Remove pointer-events-none to allow interaction
    >
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            backgroundColor: bubble.color,
            transition: 'transform 0.1s ease-out',
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveBubbles;