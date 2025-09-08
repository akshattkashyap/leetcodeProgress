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
          total: result.totalSubmissionNum.find(item => item.difficulty === 'All')?.count || 0
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

      // Calculate approximate totals based on typical LeetCode distribution
      // This is an approximation since the API doesn't provide exact totals per difficulty
      const totalProblems = 3000; // Approximate total LeetCode problems
      processedData.easy.total = Math.round(totalProblems * 0.5); // ~50% easy
      processedData.medium.total = Math.round(totalProblems * 0.35); // ~35% medium
      processedData.hard.total = Math.round(totalProblems * 0.15); // ~15% hard

      setData(processedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, fetchUserData };
};