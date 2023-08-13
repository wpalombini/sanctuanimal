import {
  Box,
  Card,
  CardContent,
  CloseIcon,
  IconButton,
  InputAdornment,
  Link as LinkMUI,
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

const ResidentsPage = () => {
  const { query, pathname, push } = useRouter();

  const { user, loading: userIsLoading } = useAuthContext();

  const { data: sanctuariesData } = trpc.getSanctuariesForAccount.useQuery(undefined, {
    enabled: !!user,
    staleTime: Infinity,
  });

  const { data: residents, isLoading: residentDataIsLoading } = trpc.getResidents.useQuery(
    undefined,
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
      pathname,
      query: query ? { q: query } : undefined,
    });
  };

  const EndAdornment = () => {
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

  if (dataIsLoading) {
    return (
      <PageBodyContainer>
        <SpinnerPage />
      </PageBodyContainer>
    );
  }

  return (
    <PageBodyContainer>
      {!isEmpty(sanctuariesData?.sanctuaries) && <NewResidentBtnContainer />}

      <Card>
        <CardContent>
          <TextField
            defaultValue={query['q']}
            inputRef={searchFieldRef}
            InputProps={{
              endAdornment: <EndAdornment />,
            }}
            placeholder="Search by name, species or breed"
            sx={{ paddingRight: 0 }}
            onKeyDown={event => onEnter(event, handleSearch)}
          />
        </CardContent>
      </Card>

      {filteredResidents?.map(resident => (
        <Box key={resident.id}>
          <LinkMUI href={`/residents/${resident.id}`} component={Link}>
            <ResidentItem resident={resident} />
          </LinkMUI>
        </Box>
      ))}
    </PageBodyContainer>
  );
};

export default ResidentsPage;
