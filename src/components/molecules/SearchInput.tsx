import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../atoms/Input';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="max-w-md mx-auto mb-8">
      <Input
        icon={<Search size={20} />}
        placeholder={placeholder || 'Search...'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
