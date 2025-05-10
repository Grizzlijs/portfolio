import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FaCode, FaSync, FaList, FaSignal, FaPhoneVolume, FaCopy, FaCheck, FaLightbulb } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

type ShowcaseItem = {
  id: string;
  title: string;
  description: string;
  code: string;
  icon: React.ReactNode;
  demoComponent?: React.ReactNode;
};

// Demo components for showcase items
const RestApiDemo = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% chance of success
      
      if (success) {
        setData({
          id: 'user-123',
          name: 'Emily Johnson',
          role: 'Senior Developer',
          projects: 12,
          lastActive: new Date().toLocaleDateString()
        });
        setLoading(false);
      } else {
        setError('Failed to fetch user data');
        setLoading(false);
        setData(null);
      }
    }, 1500);
  };

  return (
    <div className="p-4 border rounded-lg bg-slate-50">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-medium text-slate-800">REST API Simulation</h4>
        <button 
          onClick={fetchData} 
          disabled={loading}
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
      </div>
      
      {loading && (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-md">
          Error: {error}
        </div>
      )}
      
      {data && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-md shadow-sm"
        >
          <h5 className="text-xl font-bold mb-2">{data.name}</h5>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-slate-500">ID:</span> {data.id}
            </div>
            <div>
              <span className="text-slate-500">Role:</span> {data.role}
            </div>
            <div>
              <span className="text-slate-500">Projects:</span> {data.projects}
            </div>
            <div>
              <span className="text-slate-500">Last Active:</span> {data.lastActive}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const AsyncProgrammingDemo = () => {
  const [status, setStatus] = useState<'idle' | 'running' | 'complete'>('idle');
  const [progress, setProgress] = useState<number[]>([0, 0, 0]);
  
  const runAsyncDemo = () => {
    setStatus('running');
    setProgress([0, 0, 0]);
      // Simulate three concurrent async operations
    const updateProgress = (index: number, value: number | ((prev: number) => number)) => {
      setProgress(prev => {
        const newProgress = [...prev];
        if (typeof value === 'function') {
          newProgress[index] = value(prev[index]);
        } else {
          newProgress[index] = value;
        }
        return newProgress;
      });
    };
    
    // Simulate async task 1 - fast but starts with delay
    setTimeout(() => {
      const interval1 = setInterval(() => {
        updateProgress(0, prev => {
          const newValue = prev + 10;
          if (newValue >= 100) {
            clearInterval(interval1);
            return 100;
          }
          return newValue;
        });
      }, 200);
    }, 500);
    
    // Simulate async task 2 - slower
    const interval2 = setInterval(() => {
      updateProgress(1, prev => {
        const newValue = prev + 5;
        if (newValue >= 100) {
          clearInterval(interval2);
          return 100;
        }
        return newValue;
      });
    }, 300);
    
    // Simulate async task 3 - medium speed
    const interval3 = setInterval(() => {
      updateProgress(2, prev => {
        const newValue = prev + 7;
        if (newValue >= 100) {
          clearInterval(interval3);
          return 100;
        }
        return newValue;
      });
    }, 250);
    
    // Check if all tasks are complete
    const completionCheck = setInterval(() => {
      if (progress.every(p => p >= 100)) {
        clearInterval(completionCheck);
        setStatus('complete');
      }
    }, 100);
  };
  
  const resetDemo = () => {
    setStatus('idle');
    setProgress([0, 0, 0]);
  };
  
  return (
    <div className="p-4 border rounded-lg bg-slate-50">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-medium text-slate-800">Concurrent Tasks Demo</h4>
        <div className="space-x-2">
          {status === 'idle' && (
            <button 
              onClick={runAsyncDemo}
              className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              Run Demo
            </button>
          )}
          {(status === 'running' || status === 'complete') && (
            <button 
              onClick={resetDemo}
              className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600"
            >
              Reset
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {['User Data', 'Statistics', 'Notifications'].map((task, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{task}</span>
              <span className={progress[index] === 100 ? 'text-green-600 font-medium' : ''}>
                {progress[index]}%
              </span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress[index]}%` }}
                className="h-full bg-blue-500 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
      
      {status === 'complete' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-green-100 text-green-700 rounded-md"
        >
          All tasks completed successfully! Data ready.
        </motion.div>
      )}
    </div>
  );
};

const PromisesDemo = () => {
  const [chain, setChain] = useState<{id: number, status: 'pending' | 'resolved' | 'rejected', message: string}[]>([
    { id: 1, status: 'pending', message: 'Primary API request' },
    { id: 2, status: 'pending', message: 'Fallback API (if needed)' },
    { id: 3, status: 'pending', message: 'Enrich with user preferences' },
    { id: 4, status: 'pending', message: 'Fetch activity data' },
    { id: 5, status: 'pending', message: 'Combine all data' }
  ]);
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);
  
  const runDemo = () => {
    setRunning(true);
    setComplete(false);
    // Reset
    setChain([
      { id: 1, status: 'pending', message: 'Primary API request' },
      { id: 2, status: 'pending', message: 'Fallback API (if needed)' },
      { id: 3, status: 'pending', message: 'Enrich with user preferences' },
      { id: 4, status: 'pending', message: 'Fetch activity data' },
      { id: 5, status: 'pending', message: 'Combine all data' }
    ]);
    
    // Randomly decide if primary API fails
    const primaryFails = Math.random() > 0.6;
    
    // Step 1: Primary API
    setTimeout(() => {
      if (primaryFails) {
        setChain(prev => prev.map(item => 
          item.id === 1 ? { ...item, status: 'rejected', message: 'Primary API failed' } : item
        ));
        
        // Step 2: Fallback API (only if primary fails)
        setTimeout(() => {
          setChain(prev => prev.map(item => 
            item.id === 2 ? { ...item, status: 'resolved', message: 'Fallback API success' } : item
          ));
          
          proceedWithData();
        }, 800);
      } else {
        setChain(prev => prev.map(item => 
          item.id === 1 ? { ...item, status: 'resolved', message: 'Primary API success' } : item
        ));
        
        proceedWithData();
      }
    }, 1000);
    
    const proceedWithData = () => {
      // Skip step 2 in the chain if primary didn't fail
      if (!primaryFails) {
        setChain(prev => prev.map(item => 
          item.id === 2 ? { ...item, status: 'pending', message: 'Fallback not needed' } : item
        ));
      }
      
      // Steps 3 & 4: Parallel data fetching
      setTimeout(() => {
        setChain(prev => prev.map(item => 
          item.id === 3 ? { ...item, status: 'resolved', message: 'User preferences loaded' } : item
        ));
      }, 700);
      
      setTimeout(() => {
        setChain(prev => prev.map(item => 
          item.id === 4 ? { ...item, status: 'resolved', message: 'Activity data loaded' } : item
        ));
      }, 1200);
      
      // Step 5: Final combination
      setTimeout(() => {
        setChain(prev => prev.map(item => 
          item.id === 5 ? { ...item, status: 'resolved', message: 'All data combined' } : item
        ));
        setRunning(false);
        setComplete(true);
      }, 2000);
    };
  };
  
  return (
    <div className="p-4 border rounded-lg bg-slate-50">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-medium text-slate-800">Promise Chain Visualization</h4>
        <button 
          onClick={runDemo} 
          disabled={running}
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50"
        >
          {running ? 'Running...' : 'Run Demo'}
        </button>
      </div>        <div className="space-y-4">
        {chain.map((step) => (
          <div key={step.id} className="flex items-center space-x-3">
            <div 
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step.status === 'pending' ? 'bg-slate-200' :
                step.status === 'resolved' ? 'bg-green-500' : 'bg-red-500'
              } text-white`}
            >
              {step.id}
            </div>
            <div className={`flex-1 p-2 rounded-md ${
              step.status === 'pending' ? 'bg-slate-100 text-slate-600' :
              step.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {step.message}
            </div>
          </div>
        ))}
      </div>
      
      {complete && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-blue-100 text-blue-700 rounded-md flex items-center"
        >
          <FaLightbulb className="mr-2" /> 
          Notice how the promise chain handled the error and continued execution!
        </motion.div>
      )}
    </div>
  );
};

const EventEmitterDemo = () => {
  const [events, setEvents] = useState<{type: string, message: string, time: string}[]>([]);
  const [subscribers, setSubscribers] = useState({
    notifications: true,
    userActivity: false,
    systemUpdates: false
  });
  
  const publishEvent = (type: string) => {
    const newEvent = {
      type,
      message: getEventMessage(type),
      time: new Date().toLocaleTimeString()
    };
    
    // Add the event to the list
    setEvents(prev => [newEvent, ...prev].slice(0, 5));
  };
  
  const getEventMessage = (type: string): string => {
    switch(type) {
      case 'notifications':
        return ['New message received', 'Friend request accepted', 'Comment on your post'][Math.floor(Math.random() * 3)];
      case 'userActivity':
        return ['User logged in', 'Profile updated', 'Password changed'][Math.floor(Math.random() * 3)];
      case 'systemUpdates':
        return ['System update available', 'Security patch installed', 'Cache cleared'][Math.floor(Math.random() * 3)];
      default:
        return 'Event triggered';
    }
  };
  
  const toggleSubscription = (type: string) => {
    setSubscribers(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };
  
  return (
    <div className="p-4 border rounded-lg bg-slate-50">
      <h4 className="text-lg font-medium text-slate-800 mb-3">Event Publisher/Subscriber</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 className="text-md font-medium mb-2">Publish Events</h5>
          <div className="space-y-2">
            <button 
              onClick={() => publishEvent('notifications')}
              className="w-full px-3 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              Publish Notification
            </button>
            <button 
              onClick={() => publishEvent('userActivity')}
              className="w-full px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Publish User Activity
            </button>
            <button 
              onClick={() => publishEvent('systemUpdates')}
              className="w-full px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Publish System Update
            </button>
          </div>
        </div>
        
        <div>
          <h5 className="text-md font-medium mb-2">Active Subscribers</h5>
          <div className="space-y-2">
            {Object.entries(subscribers).map(([type, active]) => (
              <div key={type} className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm">
                <span className="capitalize">{type.replace(/([A-Z])/g, ' $1')}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={active} 
                    onChange={() => toggleSubscription(type)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h5 className="text-md font-medium mb-2">Event Log (Subscribed Only)</h5>
        <div className="bg-white rounded-md shadow-sm p-2 max-h-40 overflow-y-auto">
          {events.length > 0 ? (
            <div className="space-y-2">
              {events.map((event, i) => (
                subscribers[event.type as keyof typeof subscribers] ? (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={`p-2 rounded-md text-sm ${
                      event.type === 'notifications' ? 'bg-blue-50 text-blue-700' :
                      event.type === 'userActivity' ? 'bg-green-50 text-green-700' :
                      'bg-purple-50 text-purple-700'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{event.message}</span>
                      <span className="text-xs opacity-70">{event.time}</span>
                    </div>
                    <div className="text-xs opacity-80 capitalize">{event.type.replace(/([A-Z])/g, ' $1')}</div>
                  </motion.div>
                ) : null
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 p-4">No events published yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

const CallbackPatternDemo = () => {
  const [callstack, setCallstack] = useState<string[]>([]);
  const [retries, setRetries] = useState(0);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  
  const runDemo = () => {
    setStatus('running');
    setCallstack([]);
    setRetries(0);
    
    addToCallstack('Starting operation with retry logic...');
    
    // Simulate the retry pattern
    const attemptOperation = (attempt: number) => {
      addToCallstack(`Attempt #${attempt + 1}...`);
      
      // Simulate random failures
      const success = Math.random() > 0.6;
      
      setTimeout(() => {
        if (success) {
          addToCallstack(`✓ Operation succeeded on attempt #${attempt + 1}`);
          setStatus('success');
        } else {
          setRetries(prev => prev + 1);
          addToCallstack(`✗ Attempt #${attempt + 1} failed`);
          
          if (attempt < 2) {
            const nextDelay = 1000 * Math.pow(2, attempt);
            addToCallstack(`Retrying in ${nextDelay/1000}s...`);
            
            setTimeout(() => {
              attemptOperation(attempt + 1);
            }, nextDelay);
          } else {
            addToCallstack('All retry attempts exhausted');
            setStatus('failed');
          }
        }
      }, 1000);
    };
    
    attemptOperation(0);
  };
  
  const addToCallstack = (message: string) => {
    setCallstack(prev => [...prev, message]);
  };
  
  return (
    <div className="p-4 border rounded-lg bg-slate-50">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-medium text-slate-800">Callback Retry Pattern</h4>
        <button 
          onClick={runDemo} 
          disabled={status === 'running'}
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50"
        >
          {status === 'running' ? 'Running...' : 'Run Demo'}
        </button>
      </div>
      
      <div className="flex items-center mb-3 space-x-4">
        <div className="flex items-center">
          <span className="text-sm text-slate-600 mr-2">Retries:</span>
          <div className="flex">
            {[0, 1, 2].map(i => (
              <div 
                key={i}
                className={`w-3 h-3 rounded-full mx-0.5 ${
                  retries > i ? 'bg-red-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-sm">
          Status: 
          <span className={`ml-1 font-medium ${
            status === 'idle' ? 'text-slate-600' :
            status === 'running' ? 'text-blue-600' :
            status === 'success' ? 'text-green-600' : 'text-red-600'
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="bg-black rounded-md p-3 font-mono text-sm text-green-400 h-48 overflow-y-auto">
        {callstack.length > 0 ? (
          callstack.map((entry, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="leading-relaxed"
            >
              &gt; {entry}
            </motion.div>
          ))
        ) : (
          <div className="text-slate-500">// Console output will appear here</div>
        )}
      </div>
    </div>
  );
};

const Showcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('rest-api');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const showcaseItems: ShowcaseItem[] = [
    {
      id: 'rest-api',
      title: 'REST API Integration',
      description: 'Modern API integration using React Query for efficient data fetching, caching, and state management.',
      icon: <FaCode className="text-blue-500 text-2xl" />,
      code: `// Using React Query for API calls
import { useQuery } from 'react-query';

const fetchUserData = async () => {
  const response = await fetch('https://api.example.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
};

function UserProfile() {
  const { 
    data, 
    isLoading, 
    error 
  } = useQuery('userData', fetchUserData, {
    staleTime: 300000, // 5 minutes
    cacheTime: 3600000, // 1 hour
    retry: 3,
    onSuccess: (data) => console.log('Data fetched successfully', data),
    onError: (error) => console.error('Error fetching data', error)
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <UserCard user={data} />;
}`,
      demoComponent: <RestApiDemo />
    },
    {
      id: 'async',
      title: 'Asynchronous Programming',
      description: 'Modern asynchronous patterns with async/await for readable, maintainable code.',
      icon: <FaSync className="text-green-500 text-2xl" />,
      code: `// Handling concurrent API requests efficiently
async function fetchDashboardData() {
  try {
    console.time('dashboardLoad');
    
    // Parallel API calls with Promise.all
    const [userData, statsData, notificationsData] = await Promise.all([
      fetch('/api/user').then(res => res.json()),
      fetch('/api/stats').then(res => res.json()),
      fetch('/api/notifications').then(res => res.json())
    ]);
    
    console.timeEnd('dashboardLoad');
    
    return {
      user: userData,
      stats: statsData,
      notifications: notificationsData
    };
  } catch (error) {
    console.error('Dashboard data fetch failed:', error);
    throw new Error('Failed to load dashboard data');
  }
}

// Using the async function with error handling
function DashboardComponent() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    (async () => {
      try {
        const result = await fetchDashboardData();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  
  // Component rendering logic...
}`,
      demoComponent: <AsyncProgrammingDemo />
    },
    {
      id: 'promises',
      title: 'Promise Patterns',
      description: 'Advanced promise patterns for handling complex asynchronous flows.',
      icon: <FaList className="text-purple-500 text-2xl" />,
      code: `// Advanced Promise chaining with error recovery
function fetchUserWithRecovery(userId) {
  // Primary data source
  return fetchFromMainAPI(userId)
    .catch(error => {
      console.warn('Main API failed, trying backup', error);
      // Fallback to backup API
      return fetchFromBackupAPI(userId);
    })
    .then(userData => {
      // Enrich with additional data
      return Promise.all([
        userData,
        fetchUserPreferences(userData.preferencesId),
        fetchUserActivity(userData.id)
      ]);
    })
    .then(([userData, preferences, activity]) => {
      // Combine all data
      return {
        ...userData,
        preferences,
        recentActivity: activity
      };
    })
    .catch(error => {
      // Last resort fallback
      console.error('All data fetching attempts failed', error);
      return getLocalUserData(userId) || getDefaultUserProfile();
    });
}

// Using with timeout protection
function fetchWithTimeout(promise, timeoutMs = 5000) {
  let timeoutId;
  
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(\`Operation timed out after \${timeoutMs}ms\`));
    }, timeoutMs);
  });
  
  return Promise.race([
    promise,
    timeoutPromise
  ]).finally(() => clearTimeout(timeoutId));
}

// Usage example
fetchWithTimeout(fetchUserWithRecovery(userId), 3000)
  .then(userData => updateUserInterface(userData))
  .catch(error => showErrorNotification(error));`,
      demoComponent: <PromisesDemo />
    },
    {
      id: 'eventemitters',
      title: 'Event Emitters',
      description: 'Custom event handling for decoupled component communication.',
      icon: <FaSignal className="text-yellow-500 text-2xl" />,
      code: `// Custom Event Emitter implementation for React
class EventBus {
  private events: Map<string, Function[]> = new Map();

  subscribe(event: string, callback: Function): () => void {
    // Add callback to event subscribers
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    
    this.events.get(event)?.push(callback);
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.events.get(event) || [];
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    };
  }

  publish(event: string, data?: any): void {
    // Call all subscribers
    if (this.events.has(event)) {
      this.events.get(event)?.forEach(callback => {
        callback(data);
      });
    }
  }
}

// Create singleton instance
export const eventBus = new EventBus();

// Usage in components
function NotificationSender() {
  const sendNotification = () => {
    // Publish event with data
    eventBus.publish('notification', {
      type: 'success',
      message: 'Operation completed successfully',
      timestamp: new Date()
    });
  };
  
  return <button onClick={sendNotification}>Send Notification</button>;
}

function NotificationListener() {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    // Subscribe to event
    const unsubscribe = eventBus.subscribe('notification', (data) => {
      setNotifications(prev => [...prev, data]);
    });
    
    // Cleanup subscription
    return unsubscribe;
  }, []);
  
  return (
    <div className="notifications-panel">
      {notifications.map((n, i) => (
        <div key={i} className={n.type}>
          {n.message} - {n.timestamp.toLocaleTimeString()}
        </div>
      ))}
    </div>
  );
}`,
      demoComponent: <EventEmitterDemo />
    },
    {
      id: 'callbacks',
      title: 'Callback Patterns',
      description: 'Handling callback-oriented async flow in modern JavaScript.',
      icon: <FaPhoneVolume className="text-red-500 text-2xl" />,
      code: `// Modern callback patterns with functional approach
// Higher-order function for retry logic
function withRetry(fn, maxRetries = 3, delay = 1000) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      function attempt(retryCount) {
        fn(...args, (err, result) => {
          if (!err) {
            return resolve(result);
          }
          
          console.warn(\`Attempt \${retryCount} failed\`, err);
          
          if (retryCount >= maxRetries) {
            return reject(new Error(\`All \${maxRetries} attempts failed\`));
          }
          
          // Exponential backoff
          const nextDelay = delay * Math.pow(2, retryCount);
          console.log(\`Retrying in \${nextDelay}ms...\`);
          
          setTimeout(() => {
            attempt(retryCount + 1);
          }, nextDelay);
        });
      }
      
      attempt(0);
    });
  };
}

// Example callback-based API
function loadUserData(userId, callback) {
  // Simulate API call with random failures
  setTimeout(() => {
    if (Math.random() < 0.3) {
      callback(new Error('Network error'));
    } else {
      callback(null, { id: userId, name: 'John Doe', role: 'Admin' });
    }
  }, 500);
}

// Convert to promise-based with retry
const loadUserWithRetry = withRetry(loadUserData);

// Usage
async function initializeUser(userId) {
  try {
    const userData = await loadUserWithRetry(userId);
    console.log('User data loaded successfully', userData);
    return userData;
  } catch (error) {
    console.error('Failed to load user after multiple attempts', error);
    return null;
  }
}`,
      demoComponent: <CallbackPatternDemo />
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <div id="showcase" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <Helmet>
        <title>Technical Showcase | Emils Samoilovs</title>
        <meta name="description" content="Explore technical showcases of REST API integration, asynchronous programming, promises, event emitters, and callback patterns by Emils Samoilovs." />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Technical Showcase</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore examples of my technical expertise across various JavaScript and React paradigms,
            illustrating clean, performant, and maintainable code practices.
          </p>
        </motion.div>

        <div ref={ref} className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with tabs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="lg:w-1/4"
          >
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-24">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Examples</h3>
              <ul className="space-y-2">
                {showcaseItems.map((item) => (
                  <motion.li
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="transition-all duration-200"
                  >
                    <button
                      className={`flex items-center w-full text-left p-3 rounded-md ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="font-medium">{item.title}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Main content area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:w-3/4"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {showcaseItems.map((item) => (
                <div
                  key={item.id}
                  className={`transition-opacity duration-300 ${
                    activeTab === item.id ? 'block' : 'hidden'
                  }`}
                >
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center mb-4">
                      <span className="mr-3">{item.icon}</span>
                      <h3 className="text-2xl font-bold text-slate-800">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 mb-4">{item.description}</p>
                  </div>
                  
                  <div className="relative bg-slate-900 p-6 overflow-auto">
                    <div className="absolute top-4 right-4">
                      <button 
                        onClick={() => copyToClipboard(item.code, item.id)}
                        className="p-2 text-slate-400 hover:text-white rounded-md transition-colors"
                        title="Copy code"
                      >
                        {copiedId === item.id ? <FaCheck /> : <FaCopy />}
                      </button>
                    </div>
                    <pre className="text-slate-200 font-mono text-sm whitespace-pre overflow-x-auto code-example" style={{ maxHeight: '500px' }}>
                      <code>{item.code}</code>
                    </pre>
                  </div>
                  
                  {/* Interactive Demo Section */}
                  {item.demoComponent && (
                    <div className="p-6 border-t border-slate-200">
                      <h4 className="text-lg font-semibold text-slate-700 mb-4">Interactive Demo</h4>
                      {item.demoComponent}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
