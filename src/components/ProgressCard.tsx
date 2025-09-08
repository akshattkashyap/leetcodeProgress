import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressCardProps {
  title: string;
  solved: number;
  total: number;
  color: string;
  bgColor: string;
  delay: number;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  solved,
  total,
  color,
  bgColor,
  delay
}) => {
  const [animatedProgress, setAnimatedProgress] = React.useState(0);
  const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(percentage);
    }, delay);

    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg h-full">
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle className="text-base sm:text-lg font-semibold flex items-center justify-between">
          <span>{title}</span>
          <span className="text-xl sm:text-2xl font-bold" style={{ color }}>
            {percentage}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3">
        <div className="relative">
          <Progress 
            value={animatedProgress} 
            className="h-2 sm:h-3 transition-all duration-1000 ease-out"
            style={{ 
              backgroundColor: '#f1f5f9',
            }}
          />
          <div 
            className="absolute inset-0 h-2 sm:h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${animatedProgress}%`,
              backgroundColor: color,
              borderRadius: '0.375rem'
            }}
          />
        </div>
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <span className="font-medium">Solved: {solved} / {total}</span>
          <span className="text-muted-foreground">
            {total - solved} remaining
          </span>
        </div>
      </CardContent>
    </Card>
  );
};