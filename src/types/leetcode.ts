export interface LeetCodeStats {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissionNum: Array<{
    difficulty: string;
    count: number;
    submissions: number;
  }>;
}

export interface ProcessedStats {
  easy: {
    solved: number;
    total: number;
  };
  medium: {
    solved: number;
    total: number;
  };
  hard: {
    solved: number;
    total: number;
  };
  totalSolved: number;
}