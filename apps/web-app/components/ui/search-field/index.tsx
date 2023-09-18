import {
  Card,
  CloseIcon,
  IconButton,
  InputAdornment,
  SearchIcon,
  TextField,
} from '@sanctuanimal/ui';
import { useRef } from 'react';

import { onEnter } from '@/lib/utils';

const StartAdornment = () => {
  return (
    <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
  );
};

const EndAdornment = ({ resetSearchValue }: { resetSearchValue: () => void }) => {
  return (
    <InputAdornment position="end">
      <IconButton aria-label="Clear search" onClick={() => resetSearchValue()}>
        <CloseIcon />
      </IconButton>
    </InputAdornment>
  );
};

export const SearchField = ({
  onSearch,
  placeholder,
  defaultSearchTerm,
}: {
  defaultSearchTerm?: string;
  onSearch: (query?: string) => void;
  placeholder: string;
}) => {
  const searchFieldRef = useRef<HTMLInputElement>(null);

  const handleClearSearch = () => {
    if (searchFieldRef.current) {
      searchFieldRef.current.value = '';
      onSearch();
    }
  };

  const handleSearch = () => {
    const query = searchFieldRef.current?.value?.trim();
    onSearch(query);
  };

  return (
    <Card elevation={0}>
      <TextField
        defaultValue={defaultSearchTerm}
        inputRef={searchFieldRef}
        InputProps={{
          startAdornment: <StartAdornment />,
          endAdornment: <EndAdornment resetSearchValue={handleClearSearch} />,
          sx: { paddingRight: 0 },
        }}
        placeholder={placeholder}
        onKeyDown={event => onEnter(event, handleSearch)}
      />
    </Card>
  );
};
