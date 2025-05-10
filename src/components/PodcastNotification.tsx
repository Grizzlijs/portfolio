import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaTimes, FaHeadphones, FaStepBackward, FaStepForward } from 'react-icons/fa';
import AudioWave from './AudioWave';
import LoadingSpinner from './LoadingSpinner';

interface PodcastNotificationProps {
  isPlaying: boolean;
  isLoading?: boolean;
  togglePlay: () => void;
  currentTime?: number;
  duration?: number;
  onSkip?: (seconds: number) => void;
}

const PodcastNotification = ({ 
  isPlaying, 
  isLoading = false,
  togglePlay, 
  currentTime = 0, 
  duration = 0,
  onSkip = () => {}
}: PodcastNotificationProps) => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  // Show notification automatically after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
    // Also make visible if playing state changes to true
  useEffect(() => {
    if (isPlaying) {
      setVisible(true);
      
      // Show expanded view when podcast starts playing
      if (!expanded) {
        setExpanded(true);
        
        // Auto-collapse after 5 seconds if still playing
        const timer = setTimeout(() => {
          if (isPlaying) {
            setExpanded(false);
          }
        }, 5000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isPlaying]);
  
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (!visible) return null;
    return (
    <div className={`fixed bottom-4 right-4 z-50 bg-gradient-to-r from-sky-500 to-sky-700 text-white rounded-lg shadow-lg transition-all duration-300 podcast-notification-enter ${expanded ? 'p-4 w-80' : 'p-3'}`}>      <div className="flex items-center">
        <div className="mr-3 flex items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <FaHeadphones className="mr-2 podcast-notification-icon" />
          <span className="text-sm font-medium">{expanded ? 'Podcast Controls' : 'Listen to podcast'}</span>
          {isPlaying && !expanded && (
            <div className="ml-2">
              <AudioWave isPlaying={isPlaying} />
            </div>
          )}
        </div>
        <div className="flex items-center ml-auto">          <button 
            onClick={togglePlay}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sky-600 mr-2 hover:bg-sky-100 transition-colors"
            disabled={isLoading}
            aria-label={isPlaying ? "Pause podcast" : "Play podcast"}
          >
            {isLoading ? (
              <LoadingSpinner size="small" color="#0ea5e9" />
            ) : isPlaying ? (
              <FaPause className="text-xs" />
            ) : (
              <FaPlay className="text-xs" />
            )}
          </button>
          <button 
            onClick={() => setVisible(false)}
            className="w-6 h-6 rounded-full flex items-center justify-center text-white opacity-70 hover:opacity-100"
            aria-label="Close podcast notification"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>
      </div>
        {expanded && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-white/80 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>          <div 
            className="h-2 bg-white/20 rounded-full mb-3 cursor-pointer relative" 
            onClick={(e) => {
              if (duration > 0) {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                const newTime = pos * duration;
                document.dispatchEvent(new CustomEvent('podcast-skip', { 
                  detail: { seconds: newTime - currentTime } 
                }));
              }
            }}
          >
            <div 
              className="h-2 bg-white rounded-full" 
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button 
                onClick={() => onSkip(-10)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
                aria-label="Skip backwards 10 seconds"
              >
                <FaStepBackward />
              </button>
              <button 
                onClick={() => onSkip(10)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
                aria-label="Skip forward 10 seconds"
              >
                <FaStepForward />
              </button>
            </div>
            <button
              onClick={() => {
                const podcastSection = document.getElementById('contact-podcast-section');
                if (podcastSection) {
                  podcastSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-xs text-white/80 hover:text-white border border-white/30 px-2 py-1 rounded hover:bg-white/20 transition"
            >
              Go to Player
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastNotification;
