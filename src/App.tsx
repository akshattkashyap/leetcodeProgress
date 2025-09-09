import { useState } from 'react';
import { Code2 } from 'lucide-react';
import { SearchForm } from '@/components/SearchForm';
import { ProgressCard } from '@/components/ProgressCard';
import { ErrorMessage } from '@/components/ErrorMessage';
import { UserProfile } from '@/components/UserProfile';
import { useLeetCodeData } from '@/hooks/useLeetCodeData';

function App() {
  const [username, setUsername] = useState('');
  const { loading, error, data, fetchUserData } = useLeetCodeData();

  const handleSearch = () => {
    fetchUserData(username);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="flex-1 flex flex-col px-4 py-4 pt-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            {/* <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
              <Code2 className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div> */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              LeetCode Progress Tracker
            </h1>
          </div>
          <p className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            Track your LeetCode journey and visualize your problem-solving progress across all difficulty levels.
          </p>
        </div>

        {/* Search Form */}
        <div className="mb-4 sm:mb-6">
          <SearchForm
            username={username}
            setUsername={setUsername}
            onSearch={handleSearch}
            loading={loading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 sm:mb-6">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Results */}
        {data && (
          <div className="flex-1 space-y-4 sm:space-y-6">
            {/* User Profile */}
            <UserProfile username={username} totalSolved={data.totalSolved} />

            {/* Progress Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <ProgressCard
                title="Easy"
                solved={data.easy.solved}
                total={data.easy.total}
                color="#22c55e"
                bgColor="#dcfce7"
                delay={200}
              />
              <ProgressCard
                title="Medium"
                solved={data.medium.solved}
                total={data.medium.total}
                color="#f97316"
                bgColor="#fed7aa"
                delay={400}
              />
              <ProgressCard
                title="Hard"
                solved={data.hard.solved}
                total={data.hard.total}
                color="#ef4444"
                bgColor="#fecaca"
                delay={600}
              />
            </div>

            {/* Summary */}
            <div className="text-center pt-4 sm:pt-6 border-t border-gray-200 mt-auto">
              <p className="text-sm sm:text-base text-muted-foreground px-4">
                Keep up the great work! Every problem solved is a step forward in your coding journey.
              </p>
            </div>
          </div>
        )}

        {/* Initial State Message */}
        {!data && !error && !loading && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-4 sm:py-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Code2 className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 px-4">
              Ready to Track Your Progress?
            </h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto px-4">
              Enter your LeetCode username above to see your solving statistics and progress across all difficulty levels.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;