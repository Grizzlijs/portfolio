/**
 * Utility for displaying website performance statistics in the console
 */

interface PerformanceStats {
  loadTime: number;
  resourceCount: number;
  resourceSize: number;
  domNodes: number;
  memoryUsage?: {
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number;
  };
  browserInfo: string;
}

export const collectPerformanceStats = (): PerformanceStats => {
  // Calculate page load time
  const loadTime = window.performance.timing
    ? (window.performance.timing.loadEventEnd - window.performance.timing.navigationStart) / 1000
    : performance.now() / 1000;

  // Count resources
  const resources = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  const resourceCount = resources.length;
  
  // Calculate total resource size
  const resourceSize = resources.reduce((total, resource) => {
    return total + (resource.transferSize || 0);
  }, 0) / (1024 * 1024); // Convert to MB

  // Count DOM nodesa
  const domNodes = document.querySelectorAll('*').length;

  // Get memory info if available
  const memory = (performance as any).memory;
  const memoryUsage = memory ? {
    jsHeapSizeLimit: memory.jsHeapSizeLimit / (1024 * 1024),
    totalJSHeapSize: memory.totalJSHeapSize / (1024 * 1024),
    usedJSHeapSize: memory.usedJSHeapSize / (1024 * 1024)
  } : undefined;

  // Get browser info
  const browserInfo = navigator.userAgent;

  return {
    loadTime,
    resourceCount,
    resourceSize,
    domNodes,
    memoryUsage,
    browserInfo
  };
};

export const showPerformanceStats = (): void => {
  const stats = collectPerformanceStats();
  const statStyle = 'font-size: 13px; color: #64748b;';
  const valueStyle = 'font-size: 13px; color: #0ea5e9; font-weight: bold;';
  const headerStyle = 'font-size: 16px; color: #334155; font-weight: bold;';

  console.log('\n%cPerformance Statistics:', headerStyle);
  console.log(`%cPage Load Time: %c${stats.loadTime.toFixed(2)} seconds`, statStyle, valueStyle);
  console.log(`%cResources Loaded: %c${stats.resourceCount}`, statStyle, valueStyle);
  console.log(`%cTotal Resource Size: %c${stats.resourceSize.toFixed(2)} MB`, statStyle, valueStyle);
  console.log(`%cDOM Nodes: %c${stats.domNodes}`, statStyle, valueStyle);
  
  if (stats.memoryUsage) {
    console.log(`%cJS Heap Used: %c${stats.memoryUsage.usedJSHeapSize.toFixed(2)} MB / ${stats.memoryUsage.totalJSHeapSize.toFixed(2)} MB`, statStyle, valueStyle);
  }
  
  console.log(`%cBrowser: %c${stats.browserInfo}`, statStyle, 'font-size: 12px; color: #94a3b8;');
};
