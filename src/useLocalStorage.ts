import addons from '@storybook/addons';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { useState } from 'react';

type useLocalStorage = [string, (payload: string) => void];
const { getChannel } = addons;

export function useLocalStorage(): useLocalStorage {
  const [_, renderHack] = useState();
  const local = localStorage.getItem('nox-addon-theme') || 'light';

  const setLocal = (payload: string) => {
    const aaa = payload + `${Math.random()}`.substring(5, 10);
    console.log('setLocal', { aaa });
    renderHack(aaa);
    getChannel().emit(FORCE_RE_RENDER);
    localStorage.setItem('nox-addon-theme', payload);
  };

  return [local, setLocal];
}
