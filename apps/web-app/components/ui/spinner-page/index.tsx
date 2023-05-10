import { Spinner } from '@sanctuanimal/ui';

const SpinnerPage = ({ color }: { color?: string }) => {
  return (
    <div
      style={{
        display: 'flex',
        margin: 'calc(50vh - 70px) 0 0',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Spinner color={color} />
    </div>
  );
};

export default SpinnerPage;
