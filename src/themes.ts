import { themes as sbThemes } from '@storybook/theming';
// import { addThemes } from './themeStore';

interface Themes {
  [theme: string]: SharedTheme;
}

export interface SharedTheme {
  name?: string;
  icon: string;
}

export const defaultThemes: Themes = {
  light: {
    name: 'light',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="m7,25a18,18 0 1,1 0,.1zm3,0a15,15 0 1,0 0-.1zm11,0a4,4 0 1,0 0-.1z" /></svg>`,
    ...sbThemes.light,
  },
  dark: {
    name: 'dark',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="none" strokeLinejoin="round" d="M37,4a22,22 0 1,0 0,42a22,22 0 0,1 0-42z" /></svg>`,
    ...sbThemes.dark,
  },
};

const getThemes = (themes: Themes = defaultThemes) =>
  Object.keys(themes).map(name => ({
    name,
    ...themes[name],
  }));

// import user's themes
// cosnt userThemes = require('../../../.storybook/themes);
// addThemes(userThemes);
// export const themes = getThemes(userThemes);

export const themes = getThemes();
