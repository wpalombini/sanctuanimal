import { Box, Card, Link as LinkMUI } from '@sanctuanimal/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useAuthContext } from '@/components/providers';
import { ResidentItem } from '@/components/residents/resident-item';
import {
  NewResidentBtnContainer,
  PageBodyContainer,
  SearchField,
  SpinnerPage,
} from '@/components/ui';
import { trpc } from '@/lib/http/client/trpc';

const ResidentsPage = () => {
  const { pathname, query, push } = useRouter();

  const sanctuaryId = query.slug as string;

  const [searchTerm, setSearchTerm] = useState<string | undefined>(
    query.q ? (query.q as string) : undefined,
  );

  const { user, loading: userIsLoading } = useAuthContext();

  const { data: residents, isLoading: residentDataIsLoading } = trpc.getResidents.useQuery(
    { sanctuaryId, searchTerm },
    {
      enabled: !!user,
      staleTime: Infinity,
    },
  );

  const dataIsLoading = userIsLoading || residentDataIsLoading;

  const onSearchTermUpdated = async (query?: string) => {
    const queryParams = query ? `?q=${query}` : '';
    const href = `${pathname.replace('[slug]', sanctuaryId)}${queryParams}`;

    // update url query string without reloading the page
    push(href, href, { shallow: true });

    // update state to trigger refetch
    setSearchTerm(query);
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
      <NewResidentBtnContainer sanctuaryId={sanctuaryId} />

      {/* Search resident field */}
      <Card elevation={0}>
        <SearchField
          defaultSearchTerm={searchTerm}
          onSearch={onSearchTermUpdated}
          placeholder="Search by name, species or breed"
        />
      </Card>

      {/* List of residents */}
      {residents?.map(resident => (
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
