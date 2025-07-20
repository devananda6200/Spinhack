import React, { useState, useEffect } from 'react';
import { useToast } from '../hooks/use-toast';

const EasterEggs = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Netflix logo click easter egg
    const handleNetflixClick = () => {
      toast({
        title: "Ta-dum! 🎵",
        description: "Netflix intro sound played! *bubble pop*",
        duration: 3000,
      });
    };

    // KonMari search easter egg
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        const input = e.target;
        if (input.value.toLowerCase().includes('konmari')) {
          toast({
            title: "Marie Kondo Approved! ✨",
            description: "Your laundry will spark joy... and freshness!",
            duration: 5000,
          });
          // Add folding animation effect
          document.body.style.animation = 'fold 2s ease-in-out';
          setTimeout(() => {
            document.body.style.animation = '';
          }, 2000);
        }
      }
    };

    // Scroll detection for "Are you still rinsing?" popup
    const handleScroll = () => {
      setIsScrolling(true);
      
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      const timeout = setTimeout(() => {
        setIsScrolling(false);
        
        // Check if user is at the bottom
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
          setTimeout(() => {
            toast({
              title: "Are you still rinsing? 🧼",
              description: "Your wash cycle ended 3 minutes ago...",
              duration: 8000,
            });
          }, 3000);
        }
      }, 2000);
      
      setScrollTimeout(timeout);
    };

    // Add event listeners
    document.addEventListener('click', (e) => {
      if (e.target.textContent && e.target.textContent.includes('NETFLIX')) {
        handleNetflixClick();
      }
    });
    
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout, toast]);

  // Hidden search input for easter eggs
  return (
    <>
      {/* Hidden search input for KonMari easter egg */}
      <div className="fixed top-4 right-4 z-50 opacity-0 hover:opacity-100 transition-opacity">
        <input
          type="text"
          placeholder="Search easter eggs..."
          className="px-3 py-1 bg-gray-800 border border-gray-600 text-white text-sm rounded focus:outline-none focus:border-red-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.toLowerCase().includes('konmari')) {
              toast({
                title: "Marie Kondo Approved! ✨",
                description: "Your digital laundry is now perfectly organized!",
                duration: 5000,
              });
              e.target.value = '';
            }
          }}
        />
      </div>

      {/* Custom CSS for folding animation */}
      <style jsx global>{`
        @keyframes fold {
          0% { transform: scale(1) rotateY(0deg); }
          25% { transform: scale(0.8) rotateY(15deg); }
          50% { transform: scale(0.6) rotateY(30deg); }
          75% { transform: scale(0.8) rotateY(15deg); }
          100% { transform: scale(1) rotateY(0deg); }
        }
        
        @keyframes bubble-burst {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(0); opacity: 0; }
        }
        
        .bubble-burst {
          animation: bubble-burst 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default EasterEggs;