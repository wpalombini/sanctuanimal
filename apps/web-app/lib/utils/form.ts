import { KeyboardEvent } from 'react';

export const onEnter = <T>(event: KeyboardEvent<T>, callback: () => void) => {
  if (event.key === 'Enter') {
    callback();
  }
};
