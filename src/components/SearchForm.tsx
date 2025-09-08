import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';

interface SearchFormProps {
  username: string;
  setUsername: (username: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  username,
  setUsername,
  onSearch,
  loading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
        <Input
          type="text"
          placeholder="Enter LeetCode username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 h-12 sm:h-10 text-base sm:text-sm"
          disabled={loading}
        />
        <Button 
          type="submit" 
          disabled={loading || !username.trim()}
          className="h-12 sm:h-10 px-6 sm:px-4 text-base sm:text-sm font-medium"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span className="hidden sm:inline">Searching...</span>
              <span className="sm:hidden">Loading</span>
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              <span>Search</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};