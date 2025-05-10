/**
 * Console visual enhancements
 * Provides animated and visually enhanced console logging capabilities
 */

interface AnimatedTextOptions {
  text: string;
  color?: string;
  delay?: number;
  charDelay?: number;
  prefix?: string;
  style?: string;
}

/**
 * Creates an animated typing effect in the console
 */
export const animateConsoleText = (options: AnimatedTextOptions): Promise<void> => {
  const {
    text,
    color = '#0ea5e9',
    delay = 0,
    charDelay = 50,
    prefix = '',
    style = `color: ${color}; font-size: 16px;`
  } = options;

  return new Promise((resolve) => {
    setTimeout(() => {
      let currentText = '';
      
      // Clear any existing content
      console.clear();
      
      // Initialize with prefix
      if (prefix) {
        console.log(`%c${prefix}`, style);
      }
      
      // Start with empty string
      console.log('%c ', style);
      
      const intervalId = setInterval(() => {
        // Add one character at a time
        if (currentText.length < text.length) {
          currentText += text[currentText.length];
          // Clear previous line and print updated text
          console.clear();
          if (prefix) {
            console.log(`%c${prefix}`, style);
          }
          console.log(`%c${currentText}`, style);
        } else {
          // Animation complete
          clearInterval(intervalId);
          resolve();
        }
      }, charDelay);
    }, delay);
  });
};

/**
 * Creates a stylized box in the console with a message
 */
export const showConsoleBox = (
  message: string,
  title = 'INFO',
  style = 'info' // 'info', 'success', 'warning', 'error'
): void => {
  // Define styles based on type
  const styles: Record<string, { bgColor: string; textColor: string; borderColor: string }> = {
    info: { bgColor: '#e0f2fe', textColor: '#0ea5e9', borderColor: '#7dd3fc' },
    success: { bgColor: '#dcfce7', textColor: '#16a34a', borderColor: '#86efac' },
    warning: { bgColor: '#fef3c7', textColor: '#d97706', borderColor: '#fcd34d' },
    error: { bgColor: '#fee2e2', textColor: '#dc2626', borderColor: '#fca5a5' }
  };
  
  const { bgColor, textColor, borderColor } = styles[style] || styles.info;
  
  // Calculate box width
  const boxWidth = Math.max(message.length, title.length + 6) + 4;
  
  // Create box elements
  const topBorder = `┌${'─'.repeat(boxWidth - 2)}┐`;
  const titleBar = `│ [${title}]${' '.repeat(boxWidth - title.length - 6)}│`;
  const emptyLine = `│${' '.repeat(boxWidth - 2)}│`;
  const messageLine = `│  ${message}${' '.repeat(Math.max(0, boxWidth - message.length - 4))}│`;
  const bottomBorder = `└${'─'.repeat(boxWidth - 2)}┘`;
  
  // Print the box
  console.log(
    `%c${topBorder}\n${titleBar}\n${emptyLine}\n${messageLine}\n${emptyLine}\n${bottomBorder}`,
    `background-color: ${bgColor}; color: ${textColor}; font-family: monospace; font-size: 14px; padding: 5px; border: 1px solid ${borderColor};`
  );
};

/**
 * Creates a progress bar in the console
 */
export const showConsoleProgressBar = (
  value: number,
  max = 100,
  title = 'Progress',
  barColor = '#0ea5e9'
): void => {
  // Normalize percentage
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const barLength = 40;
  const filledLength = Math.floor((percent * barLength) / 100);
  
  // Create progress bar
  const filledBar = '█'.repeat(filledLength);
  const emptyBar = '░'.repeat(barLength - filledLength);
  const progressBar = `${filledBar}${emptyBar}`;
  
  console.log(
    `%c${title}: %c${progressBar} %c${percent.toFixed(1)}%`,
    'color: #64748b; font-weight: bold;',
    `color: ${barColor}; font-family: monospace; letter-spacing: -1px;`,
    'color: #64748b; font-family: monospace;'
  );
};
