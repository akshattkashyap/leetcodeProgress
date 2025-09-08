import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Trophy } from 'lucide-react';

interface UserProfileProps {
  username: string;
  totalSolved: number;
}

export const UserProfile: React.FC<UserProfileProps> = ({ username, totalSolved }) => {
  return (
    <Card className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="text-center pb-3 sm:pb-4">
        <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
          <User className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
        </div>
        <CardTitle className="text-lg sm:text-xl font-bold text-blue-900 break-all">
          {username}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-semibold text-blue-700">
          <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>{totalSolved} Problems Solved</span>
        </div>
      </CardContent>
    </Card>
  );
};