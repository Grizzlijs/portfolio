/**
 * Utility for detecting when developer tools are open
 * Provides mechanisms to detect console opening in different browsers
 */

interface DevToolsDetectorOptions {
  onDevToolsOpen: () => void;
  checkInterval?: number;
}

export const detectDevTools = ({ onDevToolsOpen, checkInterval = 1000 }: DevToolsDetectorOptions): (() => void) => {
  let isDevToolsOpen = false;
  let interval: number | null = null;

  const checkDevTools = () => {
    // Method 1: Size differential detection (works in many browsers)
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    
    // Method 2: Firefox & Chrome specific detection
    const isFirebugOpen = 
      window.console && 
      (window.console as any).firebug && 
      (window.console as any).firebug.version;
    
    const isConsoleOpen = widthThreshold || heightThreshold || isFirebugOpen;

    // Only call the callback the first time we detect dev tools
    if (isConsoleOpen && !isDevToolsOpen) {
      isDevToolsOpen = true;
      onDevToolsOpen();
    }
  };

  // Set up event listeners
  const devToolsToggleHandler = (e: KeyboardEvent) => {
    // F12 key or Ctrl+Shift+I/J (standard shortcuts for dev tools)
    if (
      e.key === 'F12' || 
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
    ) {
      setTimeout(() => {
        checkDevTools();
      }, 100);
    }
  };

  window.addEventListener('keydown', devToolsToggleHandler);
  
  // Set interval for passive checking
  if (typeof window !== 'undefined') {
    interval = window.setInterval(checkDevTools, checkInterval);
  }

  // Also check on page load to catch already-open dev tools
  checkDevTools();

  // Return a cleanup function
  return () => {
    window.removeEventListener('keydown', devToolsToggleHandler);
    if (interval !== null) {
      clearInterval(interval);
    }
  };
};
