import { Box, Link as LinkMUI } from '@sanctuanimal/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const LinkComponent = ({
  children,
  href,
  isActive,
}: {
  children: React.ReactNode;
  href: string;
  isActive: boolean;
}) => {
  return (
    <LinkMUI
      color={'inherit'}
      sx={{ textDecoration: isActive ? 'underline' : 'none', textUnderlineOffset: 5 }}
      component={Link}
      href={href}
    >
      {children}
    </LinkMUI>
  );
};

const AccountNavBar = ({ currentPath }: { currentPath: string }) => {
  const accountHref = '/account';
  const sanctuariesHref = '/sanctuaries';
  return (
    <>
      <LinkComponent href={sanctuariesHref} isActive={currentPath === sanctuariesHref}>
        Sanctuaries
      </LinkComponent>
      <LinkComponent href={accountHref} isActive={currentPath === accountHref}>
        Account
      </LinkComponent>
    </>
  );
};

const SanctuaryNavBar = ({
  currentPath,
  sanctuaryId,
}: {
  currentPath: string;
  sanctuaryId: string;
}) => {
  const overviewHref = `/sanctuaries/${sanctuaryId}`;
  const residentsHref = `/sanctuaries/${sanctuaryId}/residents`;
  const volunteersHref = `/sanctuaries/${sanctuaryId}/volunteers`;

  return (
    <>
      <Box>
        <LinkComponent href={overviewHref} isActive={currentPath === overviewHref}>
          Overview
        </LinkComponent>
      </Box>
      <Box>
        <LinkComponent href={residentsHref} isActive={currentPath.startsWith(residentsHref)}>
          Residents
        </LinkComponent>
      </Box>
      <LinkComponent href={volunteersHref} isActive={currentPath.startsWith(volunteersHref)}>
        Volunteers
      </LinkComponent>
    </>
  );
};

export const SubNavBar = () => {
  const { asPath, query } = useRouter();

  const sanctuaryId = query.slug ? (query.slug as string) : undefined;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, paddingY: 2 }}>
      {sanctuaryId && <SanctuaryNavBar currentPath={asPath} sanctuaryId={sanctuaryId} />}
      {!sanctuaryId && <AccountNavBar currentPath={asPath} />}
    </Box>
  );
};
