import { Link as LinkMUI } from '@sanctuanimal/ui';
import { useRouter } from 'next/router';

export const BackComponent = () => {
  const { back } = useRouter();

  return (
    <LinkMUI
      color="primary"
      href="#"
      onClick={() => back()}
      sx={{ fontSize: 'small', marginBottom: 1, textDecoration: 'underline' }}
    >
      Back
    </LinkMUI>
  );
};
