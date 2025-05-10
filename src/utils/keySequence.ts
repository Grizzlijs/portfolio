/**
 * Utility for implementing a Konami code-like Easter egg
 * Shows a special message when a specific key sequence is entered
 */

export interface KeySequenceOptions {
  sequence: string[];
  callback: () => void;
  resetDelay?: number;
}

export const detectKeySequence = ({
  sequence,
  callback,
  resetDelay = 1500,
}: KeySequenceOptions): (() => void) => {
  let progress: number = 0;
  let lastKeyTime: number = 0;
  
  const keyHandler = (event: KeyboardEvent) => {
    const currentTime = new Date().getTime();
    
    // Reset progress if too much time has passed since last key press
    if (currentTime - lastKeyTime > resetDelay) {
      progress = 0;
    }
    
    // Update the last key timestamp
    lastKeyTime = currentTime;
    
    // Check if the pressed key matches the next expected key in the sequence
    if (event.key.toLowerCase() === sequence[progress].toLowerCase()) {
      progress++;
      
      // If we've completed the sequence, call the callback
      if (progress === sequence.length) {
        callback();
        progress = 0; // Reset progress after successful sequence
      }
    } else {
      // Key doesn't match, reset progress
      progress = 0;
      
      // If the pressed key matches the first key in sequence, start a new sequence
      if (event.key.toLowerCase() === sequence[0].toLowerCase()) {
        progress = 1;
      }
    }
  };
  
  // Add event listener
  window.addEventListener('keydown', keyHandler);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('keydown', keyHandler);
  };
};
