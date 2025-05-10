import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Expertise from './components/Expertise'
import Showcase from './components/Showcase'
import Podcast from './components/Podcast'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PodcastNotification from './components/PodcastNotification'
import { showConsoleGreeting, showEasterEgg } from './utils/consoleGreeting'
import { detectDevTools } from './utils/detectDevTools'
import { detectKeySequence } from './utils/keySequence'
import { consoleInterface } from './utils/consoleInterface'

function App() {
  const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);  const [podcastCurrentTime, setPodcastCurrentTime] = useState(0);
  const [podcastDuration, setPodcastDuration] = useState(0);
  const [isPodcastLoading, setIsPodcastLoading] = useState(false);
  
  // Function to handle skipping in podcast
  const handlePodcastSkip = (seconds: number) => {
    document.dispatchEvent(new CustomEvent('podcast-skip', { detail: { seconds } }));
  }
    // Listen for podcast state changes
  useEffect(() => {
    const handlePodcastPlay = () => setIsPodcastPlaying(true);
    const handlePodcastPause = () => setIsPodcastPlaying(false);
    const handlePodcastTimeUpdate = (e: CustomEvent) => {
      const { currentTime, duration } = e.detail;
      setPodcastCurrentTime(currentTime);
      setPodcastDuration(duration);
    }
    const handlePodcastLoadingStart = () => setIsPodcastLoading(true);
    const handlePodcastLoadingEnd = () => setIsPodcastLoading(false);
    
    document.addEventListener('podcast-playing', handlePodcastPlay);
    document.addEventListener('podcast-paused', handlePodcastPause);
    document.addEventListener('podcast-time-update', handlePodcastTimeUpdate as EventListener);
    document.addEventListener('podcast-loading', handlePodcastLoadingStart);
    document.addEventListener('podcast-loaded', handlePodcastLoadingEnd);
    
    return () => {
      document.removeEventListener('podcast-playing', handlePodcastPlay);
      document.removeEventListener('podcast-paused', handlePodcastPause);
      document.removeEventListener('podcast-time-update', handlePodcastTimeUpdate as EventListener);
      document.removeEventListener('podcast-loading', handlePodcastLoadingStart);
      document.removeEventListener('podcast-loaded', handlePodcastLoadingEnd);
    };
  }, []);

  useEffect(() => {
    // Initialize the console interface
    consoleInterface.init();    // Show the console greeting on page load after a short delay
    const timer = setTimeout(() => {
      showConsoleGreeting();
      // Don't show help info automatically
    }, 1500);

    // Set up the dev tools detector
    const devToolsCleanup = detectDevTools({
      onDevToolsOpen: () => {
        showConsoleGreeting();
        // Don't show help information when dev tools are opened
      }
    });

    // Set up the secret key sequence for easter egg
    const keySequenceCleanup = detectKeySequence({
      sequence: ['h', 'i', 'r', 'e'],
      callback: () => {
        showEasterEgg();
      }
    });

    // Clean up both detectors when component unmounts
    return () => {
      clearTimeout(timer);
      devToolsCleanup();
      keySequenceCleanup();
    };
  }, []);

  return (
    <div className="bg-slate-50">
      <Helmet>
        <title>Emils Samoilovs | Front-End Architect</title>
        <meta name="description" content="Front-End Architect with 15+ years of experience in front-end and full-stack development, specializing in JavaScript, HTML5, CSS3/SCSS and modern web technologies." />
        <meta name="keywords" content="Front-End Architect, JavaScript, TypeScript, React, AI Technologies, E-Commerce, Web Development" />
        <meta property="og:title" content="Emils Samoilovs | Front-End Architect" />
        <meta property="og:description" content="Portfolio of Emils Samoilovs, specializing in front-end architecture, AI technologies, and e-commerce solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://emilssamoilovs.com" />
        <meta property="og:image" content="/profile.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Emils Samoilovs | Front-End Architect" />
        <meta name="twitter:description" content="Front-End Architect with expertise in AI technologies and e-commerce solutions." />
        <meta name="twitter:image" content="/profile.webp" />
        <link rel="canonical" href="https://emilssamoilovs.com" />
      </Helmet>      <Header />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Expertise />      <Showcase />      <div id="contact-podcast-section" className={`contact-podcast-wrapper py-10 md:py-20 bg-gradient-to-br from-slate-100 to-sky-50 shadow-inner ${isPodcastPlaying ? 'highlight' : ''}`}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-stretch gap-8">
          <div className="w-full md:w-1/2 contact-side bg-white rounded-lg shadow-md p-6 mb-8 md:mb-0">
            <Contact />
          </div>
          <div className={`podcast-player w-full md:w-1/2 bg-white rounded-lg shadow-md p-6 ${isPodcastPlaying ? 'podcast-playing' : ''}`}>
            <Podcast />
          </div>
        </div>
      </div><Footer />      <PodcastNotification 
        isPlaying={isPodcastPlaying} 
        isLoading={isPodcastLoading}
        currentTime={podcastCurrentTime}
        duration={podcastDuration}
        togglePlay={() => {
          document.dispatchEvent(new CustomEvent(isPodcastPlaying ? 'pause-podcast' : 'play-podcast'));
        }}
        onSkip={handlePodcastSkip}
      />
    </div>
  )
}

export default App
