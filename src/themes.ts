import { themes as defaults, themes } from '@storybook/theming';

export function addThemes(themes: any) {
  const dark = (themes && themes.dark) || {};
  const light = (themes && themes.light) || {};

  const themesJSON = JSON.stringify({
    dark: { ...defaults.dark, ...dark },
    light: { ...defaults.light, ...light },
  });

  localStorage.setItem('nox-addon-themes', themesJSON);
}

export function readThemes() {
  const themesJSON = localStorage.getItem('nox-addon-themes');
  return themesJSON ? JSON.parse(themesJSON) : defaults;
}
