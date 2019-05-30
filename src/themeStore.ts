import addons from '@storybook/addons';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { defaultThemes } from './themes';

export function bindThemeOverride(api: any) {
  const channel = api.getChannel();

  channel.on('storiesConfigured', () => {
    setTheme({ api });
  });

  channel.on('storyChanged', () => {
    setTheme({ api });
  });
}

const defaultStore = {
  current: 'light',
  themes: {
    ...defaultThemes,
  },
};

const store = () => {
  const result = window.localStorage.getItem('sb-addon-themes')
    ? JSON.parse(window.localStorage.getItem(
        'sb-addon-themes',
      ) as string)
    : defaultStore;

  return result;
};

const update = (newStore: any) => {
  window.localStorage.setItem(
    'sb-addon-themes',
    JSON.stringify(newStore),
  );
};

export function setTheme({
  api,
  newTheme = theme(),
  rerender = false,
}: any) {
  update({
    ...store(),
    current: newTheme.name || newTheme.base,
  });

  api.setOptions({ theme: theme() });

  if (rerender) {
    addons.getChannel().emit(FORCE_RE_RENDER);
  }
}

export function themeName() {
  return store().current;
}

export const theme = ({ themes, current }: any = store()) =>
  themes[current];

export const addThemes = (themes: any = {}) => {
  console.log('Registering themes: ', themes);
  themes.light.icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="m7,25a18,18 0 1,1 0,.1zm3,0a15,15 0 1,0 0-.1zm11,0a4,4 0 1,0 0-.1z" /></svg>`;
  themes.dark.icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path style="stroke-width: 3; stroke-color: red;" fill="none" strokeLinejoin="round" d="M37,4a22,22 0 1,0 0,42a22,22 0 0,1 0-42z" /></svg>`;
  update({
    ...store(),
    themes,
  });
};
