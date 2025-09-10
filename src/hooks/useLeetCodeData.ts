import { useState } from 'react';
import { LeetCodeStats, ProcessedStats } from '@/types/leetcode';

export const useLeetCodeData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ProcessedStats | null>(null);

  const fetchUserData = async (username: string) => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(
        `https://alfa-leetcode-api.onrender.com/${username}/solved`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found. Please check the username.');
        }
        throw new Error('Failed to fetch data. Please try again.');
      }

      const result: LeetCodeStats = await response.json();
      
      // Process the data to extract totals for each difficulty
      const processedData: ProcessedStats = {
        easy: {
          solved: result.easySolved,
          total: 0
        },
        medium: {
          solved: result.mediumSolved,
          total: 0
        },
        hard: {
          solved: result.hardSolved,
          total: 0
        },
        totalSolved: result.solvedProblem
      };

      processedData.easy.total = 896 
      processedData.medium.total = 1914
      processedData.hard.total = 867 

      setData(processedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, fetchUserData };
};