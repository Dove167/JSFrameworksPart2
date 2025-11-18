"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * GitHub Calendar Component
 * Displays GitHub contribution graph using external widget
 * No GitHub token required - uses public API
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

  // Reset states when username changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [username]);

  const handleScriptLoad = () => {
    setIsLoaded(true);
  };

  const handleScriptError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <Card className={`w-full ${className}`}>
      {showHeader && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub Contributions
          </CardTitle>
          <CardDescription>
            Recent coding activity and contributions
          </CardDescription>
        </CardHeader>
      )}
      
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          {/* GitHub Profile Link */}
          {showProfileLink && (
            <div className="flex justify-end">
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs"
                >
                  View on GitHub →
                </a>
              </Button>
            </div>
          )}

          {/* Loading State */}
          {!isLoaded && !hasError && (
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <div className="overflow-x-auto">
                <div className="grid grid-cols-20 gap-1 min-w-[600px]">
                  {Array.from({ length: 140 }, (_, i) => (
                    <Skeleton key={i} className="h-3 w-3 rounded-sm" />
                  ))}
                </div>
              </div>
              <Skeleton className="h-3 w-1/2" />
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Unable to load GitHub contributions
              </p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub Profile
                </a>
              </Button>
            </div>
          )}

          {/* GitHub Calendar Widget Container */}
          <div className="w-full">
            <div
              id="calendar-component"
              username={username}
              className={`w-full ${isLoaded ? 'block' : 'hidden'}`}
              style={{
                overflowX: 'auto',
                overflowY: 'hidden',
                maxWidth: '100%'
              }}
            >
              <div
                className="min-w-full"
                style={{
                  minWidth: '600px',
                  width: '100%'
                }}
              >
                {/* This div will be populated by the external script */}
              </div>
            </div>
          </div>

          {/* External Script */}
          <Script
            src="https://cdn.jsdelivr.net/gh/imananoosheh/github-contributions-fetch@latest/github_calendar_widget.js"
            strategy="lazyOnload"
            onLoad={handleScriptLoad}
            onError={handleScriptError}
          />
        </div>
      </CardContent>
    </Card>
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