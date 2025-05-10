/**
 * React component rendering tracker
 * Tracks render counts and performance metrics for React components
 */
import React from 'react';

interface ComponentStats {
  name: string;
  renderCount: number;
  renderTime: number; // Average render time in ms
  lastRenderTimestamp: number;
  totalRenderTime: number;
}

// Store stats for each component
const componentStats: Record<string, ComponentStats> = {};

// Memoize components that shouldn't be tracked (e.g. from libraries)
const ignoredComponents = new Set([
  'Helmet',
  'HelmetProvider',
  'Router',
  'Provider',
  'Fragment'
]);

/**
 * Track a component render
 * @param componentName The name of the component being rendered
 * @param renderTime Time taken to render the component in ms
 */
export const trackComponentRender = (componentName: string, renderTime: number): void => {
  // Skip tracking for ignored components
  if (ignoredComponents.has(componentName)) {
    return;
  }

  const now = performance.now();
  
  if (!componentStats[componentName]) {
    componentStats[componentName] = {
      name: componentName,
      renderCount: 1,
      renderTime: renderTime,
      lastRenderTimestamp: now,
      totalRenderTime: renderTime
    };
  } else {
    const stats = componentStats[componentName];
    stats.renderCount++;
    stats.totalRenderTime += renderTime;
    stats.renderTime = stats.totalRenderTime / stats.renderCount;
    stats.lastRenderTimestamp = now;
  }
};

/**
 * Get a sorted array of component stats
 */
export const getComponentStats = (): ComponentStats[] => {
  return Object.values(componentStats).sort((a, b) => {
    // Sort by render count (descending)
    return b.renderCount - a.renderCount;
  });
};

/**
 * Display component render statistics in the console
 */
export const showComponentStats = (): void => {
  const stats = getComponentStats();
  
  if (stats.length === 0) {
    console.log('%cNo component render data available yet.', 'color: #94a3b8; font-style: italic;');
    return;
  }

  console.log('\n%cComponent Render Statistics:', 'font-size: 16px; color: #334155; font-weight: bold;');
  console.log('%cComponent Name | Render Count | Avg. Time (ms)', 'color: #64748b; font-weight: bold;');
  
  // Print a table of component statistics
  console.table(
    stats.map(stat => ({
      'Component': stat.name,
      'Renders': stat.renderCount,
      'Avg Time (ms)': stat.renderTime.toFixed(2),
      'Total Time (ms)': stat.totalRenderTime.toFixed(2)
    }))
  );
  
  // Overall stats
  const totalRenders = stats.reduce((sum, stat) => sum + stat.renderCount, 0);
  const avgRenderTime = stats.reduce((sum, stat) => sum + stat.totalRenderTime, 0) / totalRenders;
  
  console.log(
    `%cTotal Component Renders: %c${totalRenders}`, 
    'color: #64748b;', 
    'color: #0ea5e9; font-weight: bold;'
  );
  console.log(
    `%cAverage Render Time: %c${avgRenderTime.toFixed(2)} ms`, 
    'color: #64748b;', 
    'color: #0ea5e9; font-weight: bold;'
  );
};

/**
 * Create a Higher Order Component to track render times
 * This can be used to wrap components for tracking
 */
export const withRenderTracking = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName?: string
): React.FC<P> => {
  const displayName = componentName || WrappedComponent.displayName || WrappedComponent.name || 'Unknown';
  const WithRenderTracking: React.FC<P> = (props) => {
    const startTime = performance.now();
    const result = React.createElement(WrappedComponent, props);
    const endTime = performance.now();
    
    // Track the render time
    trackComponentRender(displayName, endTime - startTime);
    
    return result;
  };
  
  WithRenderTracking.displayName = `WithRenderTracking(${displayName})`;
  return WithRenderTracking;
};
