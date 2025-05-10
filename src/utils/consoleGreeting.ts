/**
 * Console greeting utility for developers
 * Displays a stylized welcome message and project overview in the browser console
 */
// import { showPerformanceStats } from './performanceStats'; 
// Performance stats are available via window.ESA.stats()

let hasGreeted = false;

export const showConsoleGreeting = (): void => {
  // Only show the greeting once per session
  if (hasGreeted) return;
  hasGreeted = true;
  // Main title styling with updated color scheme
  const titleStyle = 'font-size: 24px; font-weight: bold; color: #0ea5e9; text-shadow: 1px 1px 1px rgba(0,0,0,0.2); padding: 20px 0;';
  const subtitleStyle = 'font-size: 16px; color: #0369a1; font-weight: bold;';
  const categoryStyle = 'font-size: 14px; color: #334155; font-weight: bold;';
  const itemStyle = 'font-size: 13px; color: #64748b;';
  const noteStyle = 'font-style: italic; color: #94a3b8; font-size: 12px;';
  const highlightStyle = 'color: #0ea5e9; font-weight: bold;';
  const dateStyle = 'color: #6366f1; font-size: 12px; font-style: italic;';

  // Clear console for a clean slate
  console.clear();

  // ASCII Art Logo
  console.log(`%c
  ███████╗███╗   ███╗██╗██╗     ███████╗    ███████╗
  ██╔════╝████╗ ████║██║██║     ██╔════╝    ██╔════╝
  █████╗  ██╔████╔██║██║██║     ███████╗    ███████╗
  ██╔══╝  ██║╚██╔╝██║██║██║     ╚════██║    ╚════██║
  ███████╗██║ ╚═╝ ██║██║███████╗███████║    ███████║
  ╚══════╝╚═╝     ╚═╝╚═╝╚══════╝╚══════╝    ╚══════╝
  `, 'color: #0ea5e9; font-weight: bold;');  // Main greeting
  console.log('%cWelcome to Emils Samoilovs Portfolio!', titleStyle);
  console.log('%cHey there, Developer! 👋 Great to see you exploring under the hood.', subtitleStyle);
  // Removed the ESA.help() message to keep only the ASCII art and greeting  console.log('\n%cProject Overview:', categoryStyle);
  console.log('%c• Modern React 18 application built with TypeScript and Vite 5', itemStyle);
  console.log('%c• Responsive design using Tailwind CSS 3.3', itemStyle);
  console.log('%c• Interactive code showcase with Framer Motion animations', itemStyle);
  console.log('%c• SEO optimized with React Helmet Async', itemStyle);
  console.log('%c• Clean and minimal contact information display', itemStyle);
  console.log('%c• Last updated: May 2025', dateStyle);  // Architecture highlights
  console.log('\n%cArchitecture Highlights:', categoryStyle);
  console.log('%c• Component-based architecture with TypeScript 5.2', itemStyle);
  console.log('%c• React Router 6.20 for navigation', itemStyle);
  console.log('%c• Framer Motion for smooth animations', itemStyle);
  console.log('%c• Custom hooks for state management', itemStyle);
  console.log('%c• Tailwind CSS for responsive styling', itemStyle);
    // Key files to explore
  console.log('\n%cKey Files Worth Exploring:', categoryStyle);
  console.log('%c• src/components/ - React UI components', itemStyle);
  console.log('%c• src/data/index.ts - Portfolio content structure', itemStyle);
  console.log('%c• src/utils/ - Utility functions including this console interface', itemStyle);
  console.log('%c• src/types/index.ts - TypeScript type definitions', itemStyle);

  // Developer tools
  console.log('\n%cDeveloper Tools:', categoryStyle);
  console.log('%c• ESA.help() - Show available console commands', itemStyle);
  console.log('%c• ESA.stats() - View performance statistics', itemStyle);
  console.log('%c• ESA.components() - List rendered React components', itemStyle);
  // Fun note
  console.log('\n%cInterested in collaboration? Feel free to reach out through the Get In Touch section!', noteStyle);
  console.log('%cBuilt with %c♥ %cby Emils Samoilovs', noteStyle, 'color: red; font-size: 14px;', noteStyle);
  
  // Job opportunities section
  console.log('\n%cPsst! Looking for a Front-End Architect with TypeScript expertise? Let\'s talk!', `${highlightStyle} font-size: 14px;`);
  
  // Easter egg hint - keep this one as it's important for discovery
  console.log('\n%cTip: Try typing "HIRE" while on page to see something special...', 'color: #cbd5e1; font-size: 10px;');
  console.log('%cTip: Or type "ESA.help()" in console to see available commands', 'color: #cbd5e1; font-size: 10px;');
  
  // Don't show performance statistics by default
  // showPerformanceStats();
};

/**
 * Shows a special Easter egg message when triggered
 */
export const showEasterEgg = (): void => {
  console.clear();
  
  // Fun animated typing effect with a more impressive visual style
  console.log('%c🔥 GREAT CHOICE! 🔥', 'color: #ff9500; font-size: 28px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%c', 'font-size: 10px;');  // Add a little space
  
  const message = "Emils Samoilovs would be an outstanding addition to your team as a Front-End Developer!";
  console.log('%c' + message, 'color: #0ea5e9; font-size: 18px; font-weight: bold; line-height: 1.5;');

  console.log('%c', 'font-size: 10px;');  // Add a little space
  
  console.log('%cSkills that set him apart:', 'color: #0c4a6e; font-size: 16px; font-weight: bold;');
    const skills = [
    '16+ years of front-end development experience',
    'Deep expertise in TypeScript and modern React',
    'Front-End Architecture leadership experience',
    'Passion for performant, accessible code'
  ];
    // Display skills with a slight delay for visual effect
  setTimeout(() => {
    skills.forEach((skill) => {
      console.log(
        '%c• %c' + skill, 
        'color: #22c55e; font-size: 16px; font-weight: bold;',
        'color: #0ea5e9; font-size: 15px;'
      );
    });
      console.log('%c', 'font-size: 10px;');  // Add a little space
    console.log('%cLooking for Front-End architecture expertise? Reach out via the contact section. Let\'s build something amazing together!', 'color: #475569; font-size: 15px; font-style: italic;');
    
    // Visual fireworks animation
    setTimeout(() => {
      console.log('%c💥 💥 💥 BOOM! 💥 💥 💥', 'color: orange; font-size: 24px; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);');
    }, 500);
  }, 300);  
};
