import addons from '@storybook/addons';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { themes } from '@storybook/theming';

export function bindThemeOverride(api: any) {
  const channel = api.getChannel();

  channel.on('storiesConfigured', (id: any) => {
    setLocalTheme({ api });
  });

  channel.on('storyChanged', (id: any) => {
    setLocalTheme({ api });
  });
}

export function setLocalTheme({
  api,
  theme = getLocalTheme()[0],
  rerender = false,
}: any) {
  window.localStorage.setItem('iris-sb-theme', theme);
  api.setOptions({
    theme: getLocalTheme()[1],
  });

  if (rerender) {
    addons.getChannel().emit(FORCE_RE_RENDER);
  }
}

export function getLocalTheme() {
  const savedTheme: any = window.localStorage.getItem(
    'iris-sb-theme',
  );
  const theme: any =
    typeof (themes as any)[savedTheme] === 'object'
      ? (themes as any)[savedTheme]
      : themes.light;
  return [savedTheme, theme];
}
