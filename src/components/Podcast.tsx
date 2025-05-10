import { useState, useRef, useEffect } from 'react'
import { FaPodcast, FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp } from 'react-icons/fa'
import { PodcastContext } from '../contexts/PodcastContext'
import AudioWave from './AudioWave'
import LoadingSpinner from './LoadingSpinner'

const Podcast = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.75)
  const [isLoading, setIsLoading] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const volumeRef = useRef<HTMLDivElement>(null)

  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }  // Handle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        document.dispatchEvent(new CustomEvent('podcast-paused'));
      } else {
        setIsLoading(true)
        document.dispatchEvent(new CustomEvent('podcast-loading'));
        audioRef.current.play()
          .then(() => {
            document.dispatchEvent(new CustomEvent('podcast-playing'));
            setIsPlaying(true)
          })
          .catch(error => {
            console.error("Error playing audio:", error)
          })
          .finally(() => {
            setIsLoading(false)
            document.dispatchEvent(new CustomEvent('podcast-loaded'));
          })
      }
    }
  }
  // Function to explicitly play podcast (for external trigger)
  const playPodcast = () => {
    if (audioRef.current && !isPlaying) {
      setIsLoading(true)
      document.dispatchEvent(new CustomEvent('podcast-loading'));
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
          document.dispatchEvent(new CustomEvent('podcast-playing'));
          
          // Scroll to podcast section
          const podcastSection = document.getElementById('contact-podcast-section')
          if (podcastSection) {
            podcastSection.scrollIntoView({ behavior: 'smooth' })
          }
        })
        .catch(error => {
          console.error("Error playing audio:", error)
        })
        .finally(() => {
          setIsLoading(false)
          document.dispatchEvent(new CustomEvent('podcast-loaded'));
        })
    }
  }

  // Handle time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      
      // Update progress bar
      if (progressRef.current && !isNaN(audioRef.current.duration)) {
        const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100
        progressRef.current.style.width = `${progress}%`
      }
    }
  }
  // Handle audio loaded
  const handleAudioLoaded = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      setIsLoading(false)
    }
  }
  
  // Handle loading
  const handleAudioLoading = () => {
    setIsLoading(true)
  }
  
  // Handle error
  const handleAudioError = () => {
    setIsLoading(false)
    setIsPlaying(false)
    console.error("Error loading audio file")
  }

  // Handle skip
  const handleSkip = (amount: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += amount
    }
  }

  // Handle volume change
  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (volumeRef.current) {
      const rect = volumeRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const newVolume = Math.max(0, Math.min(1, x / rect.width))
      
      setVolume(newVolume)
      if (audioRef.current) {
        audioRef.current.volume = newVolume
      }
    }
  }

  // Handle audio ended
  const handleAudioEnded = () => {
    setIsPlaying(false)
    document.dispatchEvent(new CustomEvent('podcast-paused'));
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }
    // Set initial volume and listen for play/pause events
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    
    // Listen for the custom play/pause events
    const playEventListener = () => {
      if (audioRef.current && !isPlaying) {
        setIsLoading(true);
        document.dispatchEvent(new CustomEvent('podcast-loading'));
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            document.dispatchEvent(new CustomEvent('podcast-playing'));
          })
          .catch(error => {
            console.error("Error playing audio:", error);
          })
          .finally(() => {
            setIsLoading(false);
            document.dispatchEvent(new CustomEvent('podcast-loaded'));
          });
      }
    };
    
    const pauseEventListener = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        document.dispatchEvent(new CustomEvent('podcast-paused'));
      }
    };
    
    document.addEventListener('play-podcast', playEventListener);
    document.addEventListener('pause-podcast', pauseEventListener);
    
    return () => {
      document.removeEventListener('play-podcast', playEventListener);
      document.removeEventListener('pause-podcast', pauseEventListener);
    };
  }, [isPlaying, volume]);

  return (
    <PodcastContext.Provider value={{ playPodcast, audioRef }}>
      <div className={`h-full flex flex-col justify-center ${isPlaying ? 'podcast-playing' : ''}`}>
        <div className="p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left flex items-center">
            Listen to My Podcast
            {isPlaying && (
              <span className="ml-3 text-sm bg-white/20 px-2 py-1 rounded-full flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                Now Playing
              </span>
            )}
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-24 h-24 bg-white rounded-lg mb-6 md:mb-0 md:mr-6 overflow-hidden flex-shrink-0">
              {/* Podcast cover image placeholder */}
              <div className="w-full h-full bg-primary-300 flex items-center justify-center">
                <FaPodcast className="text-primary-600 text-4xl" />
              </div>
            </div>            <div className="flex-1 w-full">
              <h3 className="text-xl font-semibold mb-2">Tech Insights about Emils</h3>
              <div className="flex items-center mb-4">
                <p className="text-primary-100">Exploring front-end architecture, AI integration, and modern web development</p>
                {isPlaying && (
                  <div className="ml-3">
                    <AudioWave isPlaying={isPlaying} />
                  </div>
                )}
              </div>              <audio 
                ref={audioRef} 
                className="hidden" 
                src="/emils-samoilovs-podcast.wav"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleAudioLoaded}
                onEnded={handleAudioEnded}
                onLoadStart={handleAudioLoading}
                onError={handleAudioError}
                preload="metadata"
              /><div className="flex items-center">
                <button 
                  onClick={togglePlay}
                  className="play-btn w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-600 mr-4"
                  aria-label={isPlaying ? "Pause" : "Play"}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoadingSpinner size="small" color="#0ea5e9" />
                  ) : isPlaying ? (
                    <FaPause className="text-lg" />
                  ) : (
                    <FaPlay className="text-lg" />
                  )}
                </button>                <div 
                  className="flex-1 bg-white bg-opacity-20 rounded-full h-2 cursor-pointer relative"
                  onClick={(e) => {
                    if (audioRef.current && progressRef.current) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      audioRef.current.currentTime = pos * audioRef.current.duration;
                    }
                  }}
                >
                  <div ref={progressRef} className="bg-white h-2 rounded-full w-0"></div>
                </div>
                <span className="ml-4 text-sm text-primary-100">{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="flex space-x-4">
              <button 
                onClick={() => handleSkip(-10)}
                className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition"
                aria-label="Skip backwards 10 seconds"
              >
                <FaStepBackward />
              </button>
              <button 
                onClick={() => handleSkip(10)}
                className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition"
                aria-label="Skip forward 10 seconds"
              >
                <FaStepForward />
              </button>
            </div>            <div className="flex items-center">
              <FaVolumeUp className="mr-2 text-primary-100" />
              <div 
                ref={volumeRef}
                onClick={handleVolumeClick}
                className="w-24 bg-white bg-opacity-20 rounded-full h-2 cursor-pointer relative"
              >
                <div 
                  className="volume-slider bg-white h-2 rounded-full" 
                  style={{ width: `${volume * 100}%` }}
                ></div>
                <div 
                  className="absolute w-4 h-4 bg-white rounded-full -top-1" 
                  style={{ 
                    left: `calc(${volume * 100}% - 8px)`,
                    boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PodcastContext.Provider>
  )
}

export default Podcast
