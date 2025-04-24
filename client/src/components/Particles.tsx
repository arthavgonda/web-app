import { useEffect, useRef } from "react";

const Particles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Clear any existing particles
    container.innerHTML = '';
    
    // Create particles
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Generate random size between 3px and 12px
      const size = Math.random() * 9 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Position randomly on screen
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      // Random animation delay
      const delay = Math.random() * 5;
      particle.style.animationDelay = `${delay}s`;
      
      // Random opacity
      const opacity = Math.random() * 0.3 + 0.1;
      particle.style.opacity = opacity.toString();
      
      // Add particle to container
      container.appendChild(particle);
    }
    
    // Clean up function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default Particles;
