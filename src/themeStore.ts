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

export const theme = ({ themes, current }: any = store()) =>
  themes[current];

export const addThemes = (themes: string[]) => {
  console.log('Registering themes: ', themes);
  // update({
  //   ...store(),
  //   themes: {},
  // });
};
