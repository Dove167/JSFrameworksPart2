"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

/**
 * GitHub Calendar Component
 * Fetches REAL GitHub data for Dove167's profile
 */
export default function GitHubCalendar({ 
  username = "Dove167", 
  theme = "default",
  showHeader = true,
  showProfileLink = true,
  loadingText = "Loading GitHub contributions...",
  className = ""
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [contributionsData, setContributionsData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');

  // Fetch REAL GitHub data
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setIsLoaded(false);
        setHasError(false);
        setDebugInfo('Fetching real GitHub data...');
        
        console.log('🔍 Attempting to fetch real GitHub data for:', username);
        
        // Step 1: Get REAL user stats from GitHub API
        let realUserData = null;
        let userSuccess = false;
        
        try {
          setDebugInfo('Fetching user stats from GitHub API...');
          const userResponse = await fetch(
            `https://api.github.com/users/${username}`,
            {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
              },
            }
          );
          
          if (userResponse.ok) {
            const userInfo = await userResponse.json();
            realUserData = {
              name: userInfo.name || userInfo.login || username,
              publicRepos: userInfo.public_repos || 0,
              followers: userInfo.followers || 0,
              following: userInfo.following || 0,
              totalContributions: 0, // Will be calculated from contributions
            };
            userSuccess = true;
            setDebugInfo(`✅ Got real user data: ${userInfo.public_repos} repos, ${userInfo.followers} followers`);
            console.log('✅ Real user data:', realUserData);
          } else {
            throw new Error(`User API failed: ${userResponse.status}`);
          }
        } catch (error) {
          console.log('❌ GitHub user API failed:', error.message);
          setDebugInfo('❌ User API failed');
        }
        
        // Step 2: Get REAL contributions data
        let contributions = [];
        let contributionsSuccess = false;
        
        try {
          setDebugInfo('Fetching contributions from GitHub API...');
          console.log('🔍 Trying grubersjoe API for contributions...');
          
          const contribResponse = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
            {
              headers: {
                'Accept': 'application/json',
              },
            }
          );
          
          if (contribResponse.ok) {
            const contribData = await contribResponse.json();
            console.log('✅ Got contributions data:', contribData);
            
            // ✅ REAL DATA PROCESSING - Handle the actual API response structure
            if (contribData.contributions && Array.isArray(contribData.contributions)) {
              contributions = contribData.contributions.map(contribution => ({
                date: contribution.date,
                count: contribution.count || 0,
                intensity: contribution.level || (contribution.count > 0 ? Math.min(Math.ceil((contribution.count || 1) / 4), 4) : 0)
              }));
              contributionsSuccess = true;
              
              // ✅ USE REAL TOTAL FROM API - This is your actual GitHub contributions!
              const realTotal = contribData.total?.lastYear || contributions.reduce((sum, item) => sum + item.count, 0);
              setDebugInfo(`✅ Got REAL contributions: ${contributions.length} days, ${realTotal} total contributions`);
              console.log('✅ Processed contributions:', contributions.slice(0, 5));
              console.log('✅ Using REAL total:', realTotal);
              
              // Update user data with real total immediately
              if (realUserData) {
                realUserData.totalContributions = realTotal;
              }
            }
          } else {
            throw new Error(`Contributions API failed: ${contribResponse.status}`);
          }
        } catch (error) {
          console.log('❌ Contributions API failed:', error.message);
          setDebugInfo('❌ Contributions API failed');
        }
        
        // Step 3: Process and combine the data
        if (userSuccess) {
          let totalContributions = 0;
          
          if (contributionsSuccess && contributions.length > 0) {
            // Use real contributions data (already calculated above)
            totalContributions = realUserData?.totalContributions || contributions.reduce((sum, item) => sum + item.count, 0);
            setDebugInfo(`✅ Using REAL GitHub data: ${totalContributions} total contributions`);
          } else {
            // Generate mock data but mark it clearly
            setDebugInfo('⚠️ Using mock data - API unavailable');
            contributions = generateRealisticContributions();
            totalContributions = contributions.reduce((sum, item) => sum + item.count, 0);
          }
          
          // Set the final user data
          setUserData({
            ...realUserData,
            totalContributions: totalContributions
          });
          
          setContributionsData(contributions);
          setIsLoaded(true);
          setHasError(!contributionsSuccess); // Only show error if contributions failed
          
        } else {
          throw new Error('Could not get user data from GitHub API');
        }
        
      } catch (error) {
        console.error('❌ Error fetching GitHub data:', error);
        setDebugInfo(`❌ Error: ${error.message}`);
        
        // Final fallback - show mock data
        const mockContributions = generateRealisticContributions();
        setContributionsData(mockContributions);
        
        setUserData({
          name: username,
          totalContributions: mockContributions.reduce((sum, item) => sum + item.count, 0),
          publicRepos: 42, // Mock numbers
          followers: 185
        });
        
        setHasError(true);
        setIsLoaded(true);
      }
    };

    fetchGitHubData();
  }, [username]);

  // Generate high-quality realistic mock data
  const generateRealisticContributions = () => {
    const contributions = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      
      const dayOfWeek = currentDate.getDay();
      let count = 0;
      
      if (dayOfWeek > 0 && dayOfWeek < 6) { // Weekdays
        const dayNumber = currentDate.getDate();
        const isEndOfWeek = dayOfWeek === 5;
        const isBeginning = dayNumber <= 7;
        const isEnd = dayNumber >= 25;
        
        if (isEndOfWeek) {
          count = Math.random() > 0.6 ? Math.floor(Math.random() * 6) + 1 : 0;
        } else if (isBeginning || isEnd) {
          count = Math.random() > 0.3 ? Math.floor(Math.random() * 8) + 2 : 0;
        } else {
          count = Math.random() > 0.4 ? Math.floor(Math.random() * 5) + 1 : 0;
        }
      } else { // Weekends
        count = Math.random() > 0.8 ? Math.floor(Math.random() * 3) + 1 : 0;
      }
      
      if (Math.random() > 0.98) {
        count = Math.floor(Math.random() * 15) + 10;
      }
      
      contributions.push({
        date: dateString,
        count: count,
        intensity: count > 0 ? Math.min(Math.ceil(count / 4), 4) : 0
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return contributions;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const classForValue = (value) => {
    if (!value || value.count === 0) {
      return 'color-empty';
    }
    return `color-github-${Math.min(value.count, 4)}`;
  };

  const tooltipDataAttrs = (value) => {
    if (!value || !value.date) {
      return {
        'data-tip': 'No contributions',
      };
    }
    return {
      'data-tip': `${value.count} contribution${value.count !== 1 ? 's' : ''} on ${new Date(value.date).toLocaleDateString()}`,
    };
  };

  // Generate date range for the heatmap
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient-blue opacity-5 rounded-lg" />
      
      <Card className={`w-full modern-card glow-blue hover-scale-color relative overflow-hidden ${className}`}>
        {/* Animated background overlay */}
        <motion.div
          className="absolute inset-0 animated-gradient-purple opacity-0"
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />
        
        {showHeader && (
          <motion.div variants={headerVariants}>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-gradient">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.div>
                GitHub Contributions
              </CardTitle>
              <CardDescription className="text-gray-600">
                {userData ? (
                  <>
                    {userData.totalContributions} contributions • {userData.publicRepos} repositories • {userData.followers} followers
                  </>
                ) : (
                  'Recent coding activity and contributions'
                )}
              </CardDescription>
            </CardHeader>
          </motion.div>
        )}
        
        <CardContent className="p-4 sm:p-6 relative z-10">
          <motion.div 
            className="space-y-4"
            variants={contentVariants}
          >
            {/* Debug Info - Shows what's happening */}
            {process.env.NODE_ENV === 'development' && (
              <motion.div 
                className="text-xs bg-gray-100 p-2 rounded text-gray-600 font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {debugInfo}
              </motion.div>
            )}
            
            {/* GitHub Profile Link */}
            {showProfileLink && (
              <motion.div 
                className="flex justify-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button variant="outline" size="sm" asChild className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                  <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1"
                  >
                    <motion.span
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      View on GitHub →
                    </motion.span>
                  </a>
                </Button>
              </motion.div>
            )}

            {/* Status Message */}
            <AnimatePresence>
              {hasError && (
                <motion.div 
                  className="text-center py-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Using mock data - live GitHub API unavailable
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading State */}
            <AnimatePresence>
              {!isLoaded && (
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="h-4 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"
                    animate={{ 
                      background: ["linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)", 
                                 "linear-gradient(90deg, #f0f0f0 75%, #e0e0e0 50%, #f0f0f0 25%)"] 
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* GitHub Contributions Calendar */}
            <AnimatePresence>
              {isLoaded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="w-full overflow-x-auto"
                >
                  <div className="react-calendar-heatmap">
                    <CalendarHeatmap
                      startDate={startDate}
                      endDate={endDate}
                      values={contributionsData}
                      classForValue={classForValue}
                      tooltipDataAttrs={tooltipDataAttrs}
                      showWeekdayLabels={true}
                      horizontal={true}
                      gutterSize={3}
                      style={{
                        width: '100%',
                        minWidth: '600px',
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </CardContent>
        
        {/* Decorative elements */}
        <motion.div
          className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-60"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </Card>
    </motion.div>
  );
}

/**
 * Compact version for sidebars or smaller spaces
 */
export function CompactGitHubCalendar({ username = "Dove167", className = "" }) {
  return (
    <GitHubCalendar 
      username={username}
      showHeader={true}
      showProfileLink={false}
      className={`max-w-sm ${className}`}
    />
  );
}

/**
 * Full version for main content areas
 */
export function FullGitHubCalendar({ username = "Dove167", className = "" }) {
  return (
    <GitHubCalendar 
      username={username}
      showHeader={true}
      showProfileLink={true}
      className={className}
    />
  );
}