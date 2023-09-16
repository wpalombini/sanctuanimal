import {
  Box,
  Card,
  CloseIcon,
  IconButton,
  InputAdornment,
  Link as LinkMUI,
  SearchIcon,
  TextField,
} from '@sanctuanimal/ui';
import isEmpty from 'lodash-es/isEmpty';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useAuthContext } from '@/components/providers';
import { ResidentItem } from '@/components/residents/resident-item';
import { NewResidentBtnContainer, PageBodyContainer, SpinnerPage } from '@/components/ui';
import { trpc } from '@/lib/http/client/trpc';
import { onEnter } from '@/lib/utils';

const StartAdornment = () => {
  return (
    <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
  );
};

const EndAdornment = ({
  handleSearch,
  resetSearchValue,
}: {
  handleSearch: () => void;
  resetSearchValue: () => void;
}) => {
  const handleClearSearch = () => {
    resetSearchValue();
    handleSearch();
  };
  return (
    <InputAdornment position="end">
      <IconButton aria-label="Clear search" onClick={() => handleClearSearch()}>
        <CloseIcon />
      </IconButton>
    </InputAdornment>
  );
};

const ResidentsPage = () => {
  const { pathname, query, push } = useRouter();
  const sanctuaryId = query.slug as string;

  const { user, loading: userIsLoading } = useAuthContext();

  const { data: sanctuariesData } = trpc.getSanctuariesForAccount.useQuery(undefined, {
    enabled: !!user,
    staleTime: Infinity,
  });

  const { data: residents, isLoading: residentDataIsLoading } = trpc.getResidents.useQuery(
    { sanctuaryId },
    {
      enabled: !!user,
      staleTime: Infinity,
    },
  );

  const dataIsLoading = userIsLoading || residentDataIsLoading;

  const searchFieldRef = useRef<HTMLInputElement>(null);

  const [filteredResidents, setFilteredResidents] = useState<typeof residents>();

  const getSearchValue = () => searchFieldRef.current?.value?.trim();
  const resetSearchValue = () => {
    if (searchFieldRef.current) {
      searchFieldRef.current.value = '';
    }
  };

  const applyFilter = () => {
    if (!residents?.length) return;
    const q = getSearchValue()?.toLowerCase();

    if (!q) {
      resetFilter();
      return;
    }

    setFilteredResidents(
      residents.filter(
        resident =>
          resident.name.toLocaleLowerCase().includes(q) ||
          resident.species.toLocaleLowerCase().includes(q) ||
          resident.breed.toLocaleLowerCase().includes(q),
      ),
    );
  };

  const resetFilter = () => {
    setFilteredResidents(residents?.length ? [...residents] : []);
  };

  // copy the residents array after loading the residents
  useEffect(() => {
    if (getSearchValue()) {
      applyFilter();
    } else {
      resetFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [residents, query]);

  const handleSearch = () => {
    const query = getSearchValue();
    push({
      pathname: pathname.replace('[slug]', sanctuaryId),
      query: query ? { q: query } : undefined,
    });
  };

  if (dataIsLoading) {
    return (
      <PageBodyContainer>
        <SpinnerPage />
      </PageBodyContainer>
    );
  }

  return (
    <PageBodyContainer>
      {/* New resident button */}
      {!isEmpty(sanctuariesData?.sanctuaries) && (
        <NewResidentBtnContainer sanctuaryId={sanctuaryId} />
      )}

      {/* Search resident field */}
      <Card elevation={0}>
        <TextField
          defaultValue={query['q']}
          inputRef={searchFieldRef}
          InputProps={{
            startAdornment: <StartAdornment />,
            endAdornment: (
              <EndAdornment handleSearch={handleSearch} resetSearchValue={resetSearchValue} />
            ),
            sx: { paddingRight: 0 },
          }}
          placeholder="Search by name, species or breed"
          onKeyDown={event => onEnter(event, handleSearch)}
        />
      </Card>

      {/* List of residents */}
      {filteredResidents?.map(resident => (
        <Box key={resident.id}>
          <LinkMUI href={`/sanctuaries/${sanctuaryId}/residents/${resident.id}`} component={Link}>
            <ResidentItem resident={resident} />
          </LinkMUI>
        </Box>
      ))}
    </PageBodyContainer>
  );
};

export default ResidentsPage;
