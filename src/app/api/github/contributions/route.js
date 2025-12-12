import { NextResponse } from 'next/server';

// GitHub API endpoint for contributions
const GITHUB_API_BASE = 'https://api.github.com';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'Dove167';
    
    // Fetch user contributions for the last year
    const contributionsResponse = await fetch(
      `${GITHUB_API_BASE}/users/${username}/contributions`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!contributionsResponse.ok) {
      throw new Error(`GitHub API error: ${contributionsResponse.status}`);
    }

    const contributionsData = await contributionsResponse.json();
    
    // Also fetch the user info to get basic profile data
    const userResponse = await fetch(
      `${GITHUB_API_BASE}/users/${username}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    let userData = {};
    if (userResponse.ok) {
      userData = await userResponse.json();
    }

    return NextResponse.json({
      success: true,
      username,
      contributions: contributionsData,
      user: userData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    
    // Return mock data as fallback
    const mockContributions = generateMockContributions();
    
    return NextResponse.json({
      success: false,
      username: searchParams.get('username') || 'Dove167',
      error: error.message,
      contributions: mockContributions,
      fallback: true,
      timestamp: new Date().toISOString()
    });
  }
}

// Generate realistic mock data as fallback
function generateMockContributions() {
  const contributions = [];
  const weeks = 53;
  const daysPerWeek = 7;
  
  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < daysPerWeek; day++) {
      // Generate realistic contribution patterns
      let intensity = 0;
      if (week > 0 && week < 52) {
        // More activity on weekdays
        if (day > 0 && day < 6) {
          intensity = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
        } else {
          // Less activity on weekends
          intensity = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0;
        }
      }
      
      const date = new Date(2024, 0, week * 7 + day + 1);
      contributions.push({
        week,
        day,
        intensity,
        date: date.toISOString().split('T')[0],
        color: getContributionColor(intensity)
      });
    }
  }
  
  return contributions;
}

function getContributionColor(intensity) {
  const colors = {
    0: 'bg-gray-200',
    1: 'bg-green-200',
    2: 'bg-green-400', 
    3: 'bg-green-500',
    4: 'bg-green-600'
  };
  return colors[intensity] || 'bg-gray-200';
}