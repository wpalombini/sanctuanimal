import { css, keyframes } from '@emotion/react';

const animloader = keyframes`
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const mainBallCss = css({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  transform: 'scale(0.6)',
  width: '70px',
});

const ballCss = css({
  color: 'black',
  animation: `${animloader} 1.4s infinite ease-in-out both`,
  borderRadius: '100%',
  flex: '1',
  height: '18px',
  margin: '0 2px',
  width: '18px',
});

const ballOne = css([ballCss, { animationDelay: '-0.32s' }]);
const ballTwo = css([ballCss, { animationDelay: '-0.16s' }]);
const ballThree = css([ballCss, { animationDelay: '0s' }]);

export type SpinnerProps = {
  color?: string;
};

export const Spinner = ({ color = 'white' }: SpinnerProps) => {
  return (
    <div css={mainBallCss}>
      <div css={[ballOne, { background: color }]}></div>
      <div css={[ballTwo, { background: color }]}></div>
      <div css={[ballThree, { background: color }]}></div>
    </div>
  );
};
