import addons from '@storybook/addons';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { useState } from 'react';

export function useLocalStorage(): [
  string,
  (payload: string) => void,
] {
  const [_, renderHack] = useState();

  const localState =
    (window.localStorage.getItem('nox-addon-theme') as string) ||
    'light';

  const setLocalStorage = (payload: string) => {
    renderHack(payload);
    addons.getChannel().emit(FORCE_RE_RENDER);
    window.localStorage.setItem('nox-addon-theme', payload);
  };

  return [localState, setLocalStorage];
}
