/**
 * Console command interface for developers
 * Registers commands that can be executed from the browser console
 */
import React from 'react';
import { showConsoleGreeting, showEasterEgg } from './consoleGreeting';
import { showPerformanceStats } from './performanceStats';
import { showComponentStats } from './componentTracker';
import { showConsoleBox, showConsoleProgressBar, animateConsoleText } from './consoleVisuals';

interface Command {
  name: string;
  description: string;
  execute: (...args: any[]) => void;
  usage?: string;
}

class ConsoleInterface {
  private commands: Record<string, Command> = {};
  private namespace = 'ESA';

  constructor() {
    this.registerDefaultCommands();
  }

  /**
   * Register a new console command
   */
  register(command: Command): void {
    this.commands[command.name] = command;
  }
  /**
   * Initialize the console interface
   */
  init(): void {
    // Create a namespace in the global window object
    (window as any)[this.namespace] = {};

    // Register all commands as methods in the namespace
    Object.entries(this.commands).forEach(([name, command]) => {
      (window as any)[this.namespace][name] = (...args: any[]) => {
        command.execute(...args);
      };
    });

    // Add a help function that must be explicitly called
    (window as any)[this.namespace].help = () => this.showHelp();
    
    // Don't automatically show help on initialization
  }

  /**
   * Show help information in the console
   */
  showHelp(): void {
    console.clear();
    console.log('%cEmils Samoilovs Portfolio - Console Commands', 'font-size: 20px; font-weight: bold; color: #0ea5e9;');
    console.log('%cUse these commands to explore the application:', 'font-size: 14px; color: #334155;');
    console.log('\n');

    // Display command list with descriptions
    Object.entries(this.commands).forEach(([name, command]) => {
      console.log(
        `%c${this.namespace}.${name}%c - ${command.description}`, 
        'color: #0ea5e9; font-weight: bold; font-family: monospace;', 
        'color: #64748b;'
      );
      
      if (command.usage) {
        console.log(`   %cUsage: %c${command.usage}`, 'color: #94a3b8; font-style: italic;', 'color: #94a3b8; font-family: monospace;');
      }
    });

    console.log('\n%cExample: %cESA.stats()', 'color: #0ea5e9;', 'color: #64748b; font-family: monospace;');
    console.log('%cFor help, type: %cESA.help()', 'color: #0ea5e9;', 'color: #64748b; font-family: monospace;');
  }
  /**
   * Register default commands
   */
  private registerDefaultCommands(): void {
    this.register({
      name: 'welcome',
      description: 'Show the welcome message',
      execute: () => showConsoleGreeting()
    });

    this.register({
      name: 'stats',
      description: 'Show performance statistics',
      execute: () => showPerformanceStats()
    });

    this.register({
      name: 'components',
      description: 'Show component render statistics',
      execute: () => showComponentStats()
    });

    this.register({
      name: 'theme',
      description: 'Show the color palette and theme information',
      execute: () => this.showThemeInfo()
    });

    this.register({
      name: 'contact',
      description: 'Get contact information',
      execute: () => this.showContactInfo()
    });

    this.register({
      name: 'easterEgg',
      description: 'Show the easter egg',
      execute: () => showEasterEgg()
    });
    
    this.register({
      name: 'version',
      description: 'Show the current version and build information',
      execute: () => this.showVersionInfo()
    });

    // New visual commands
    this.register({
      name: 'alert',
      description: 'Show a styled alert box in the console',
      execute: (message = 'Hello, developer!', title = 'ALERT', style = 'info') => {
        showConsoleBox(message, title, style);
      },
      usage: 'ESA.alert("Custom message", "TITLE", "info|success|warning|error")'
    });

    this.register({
      name: 'progress',
      description: 'Show a progress bar in the console',
      execute: (value = 75, max = 100, title = 'Progress') => {
        showConsoleProgressBar(value, max, title);
      },
      usage: 'ESA.progress(75, 100, "Loading...")'
    });

    this.register({
      name: 'animate',
      description: 'Show animated text in the console',
      execute: (text = 'This is an animated text message in the console!') => {
        animateConsoleText({ text });
      },
      usage: 'ESA.animate("Your animated message here")'
    });

    this.register({
      name: 'credits',
      description: 'Show the portfolio credits with animation',
      execute: () => this.showCredits()
    });
  }

  /**
   * Show theme information
   */
  private showThemeInfo(): void {
    const colors = [
      { name: 'primary-50', hex: '#f0f9ff', tailwind: 'from-primary-50' },
      { name: 'primary-100', hex: '#e0f2fe', tailwind: 'to-primary-100' },
      { name: 'primary-200', hex: '#bae6fd', tailwind: 'text-primary-200' },
      { name: 'primary-300', hex: '#7dd3fc', tailwind: 'text-primary-300' },
      { name: 'primary-400', hex: '#38bdf8', tailwind: 'text-primary-400' },
      { name: 'primary-500', hex: '#0ea5e9', tailwind: 'text-primary-500' },
      { name: 'primary-600', hex: '#0284c7', tailwind: 'text-primary-600' },
      { name: 'primary-700', hex: '#0369a1', tailwind: 'text-primary-700' },
      { name: 'primary-800', hex: '#075985', tailwind: 'text-primary-800' },
      { name: 'primary-900', hex: '#0c4a6e', tailwind: 'text-primary-900' },
      { name: 'slate-50', hex: '#f8fafc', tailwind: 'bg-slate-50' },
      { name: 'slate-800', hex: '#1e293b', tailwind: 'text-slate-800' },
      { name: 'slate-600', hex: '#475569', tailwind: 'text-slate-600' }
    ];

    console.log('%cTheme Colors', 'font-size: 16px; color: #334155; font-weight: bold;');
    
    // Display color boxes
    console.log('\n');
    colors.forEach(color => {
      console.log(
        `%c   %c ${color.name} %c ${color.hex} %c ${color.tailwind}`, 
        `background-color: ${color.hex}; padding: 10px 20px; border: 1px solid #e2e8f0;`,
        'color: #0ea5e9; font-weight: bold;',
        'color: #64748b;',
        'color: #94a3b8; font-style: italic;'
      );
    });

    console.log('\n%cFont Stacks:', 'font-size: 14px; color: #334155; font-weight: bold;');
    console.log('%cMain Font: %cInter, sans-serif', 'color: #64748b;', 'color: #0ea5e9; font-family: Inter, sans-serif;');
  }

  /**
   * Show contact information
   */
  private showContactInfo(): void {
    console.log('%cContact Information', 'font-size: 16px; color: #334155; font-weight: bold;');
    console.log('%cName: %cEmils Samoilovs', 'color: #64748b;', 'color: #0ea5e9; font-weight: bold;');
    console.log('%cWebsite: %chttps://emilssamoilovs.com', 'color: #64748b;', 'color: #0ea5e9;');
    console.log('%cLinkedIn: %chttps://www.linkedin.com/in/emilssamoilovs/', 'color: #64748b;', 'color: #0ea5e9;');
    console.log('\n%cUse the contact section on the website to reach out directly!', 'color: #94a3b8; font-style: italic;');
  }
  /**
   * Show version information
   */
  private showVersionInfo(): void {
    // Get version from package.json or define manually
    const version = '1.0.0';
    const buildDate = 'May 10, 2025';
    
    console.log('%cVersion Information', 'font-size: 16px; color: #334155; font-weight: bold;');
    console.log('%cVersion: %c' + version, 'color: #64748b;', 'color: #0ea5e9; font-weight: bold;');
    console.log('%cBuild Date: %c' + buildDate, 'color: #64748b;', 'color: #0ea5e9;');
    console.log('%cEnvironment: %c' + (import.meta.env.MODE || 'development'), 'color: #64748b;', 'color: #0ea5e9;');
    
    // List tech stack
    console.log('\n%cTech Stack:', 'color: #64748b; font-weight: bold;');
    console.log('%c• React %c' + React.version, 'color: #64748b;', 'color: #0ea5e9;');
    console.log('%c• TypeScript', 'color: #64748b;');
    console.log('%c• Vite', 'color: #64748b;');
    console.log('%c• TailwindCSS', 'color: #64748b;');
    console.log('%c• React Router', 'color: #64748b;');
    console.log('%c• React Helmet Async', 'color: #64748b;');
  }
  
  /**
   * Show animated credits
   */
  private showCredits(): void {
    console.clear();
    
    const credits = [
      { title: '🌟 Emils Samoilovs Portfolio 🌟', style: 'font-size: 24px; color: #0ea5e9; font-weight: bold; text-align: center;' },
      { title: '- CREDITS -', style: 'font-size: 18px; color: #0369a1; font-weight: bold; text-align: center;' },
      { title: ' ', style: '' },
      { title: 'Design & Development', style: 'font-size: 16px; color: #334155; font-weight: bold;' },
      { title: 'Emils Samoilovs', style: 'font-size: 14px; color: #0ea5e9;' },
      { title: ' ', style: '' },
      { title: 'Technologies Used', style: 'font-size: 16px; color: #334155; font-weight: bold;' },
      { title: 'React, TypeScript, TailwindCSS, Vite', style: 'font-size: 14px; color: #0ea5e9;' },
      { title: 'React Router, React Helmet Async', style: 'font-size: 14px; color: #0ea5e9;' },
      { title: ' ', style: '' },
      { title: 'Special Thanks', style: 'font-size: 16px; color: #334155; font-weight: bold;' },
      { title: 'To all curious developers examining this site', style: 'font-size: 14px; color: #0ea5e9;' },
      { title: ' ', style: '' },
      { title: '© 2025 Emils Samoilovs', style: 'font-size: 14px; color: #94a3b8; font-style: italic;' },
      { title: 'Thanks for exploring!', style: 'font-size: 16px; color: #0ea5e9; font-weight: bold;' }
    ];
    
    // Display credits with a rolling effect
    let index = 0;
    
    const intervalId = setInterval(() => {
      if (index < credits.length) {
        const credit = credits[index];
        console.log(`%c${credit.title}`, credit.style);
        index++;
      } else {
        clearInterval(intervalId);
        
        // Show a final message after the credits
        setTimeout(() => {
          showConsoleBox(
            'Want to work together? Contact me through the contact section!',
            'OPPORTUNITY',
            'success'
          );
        }, 1000);
      }
    }, 300);
  }
}

// Create and export a singleton instance
export const consoleInterface = new ConsoleInterface();
