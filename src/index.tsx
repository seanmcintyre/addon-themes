import React from 'react';
import {
  makeDecorator,
  StoryContext,
  StoryGetter,
} from '@storybook/addons';
import { ThemeProvider } from 'styled-components';
import { getLocalTheme } from './themeStore';

export const withThemes = makeDecorator({
  name: 'themes',
  parameterName: 'themes',
  skipIfNoParametersOrOptions: false,
  allowDeprecatedUsage: false,
  wrapper: (getStory: StoryGetter, context: StoryContext) => (
    <ThemeProvider theme={getLocalTheme()[1]}>
      {getStory(context)}
    </ThemeProvider>
  ),
});

export const addThemes = (themes: string[]) => {
  window.localStorage.setItem(
    'iris-sb-themes',
    JSON.stringify(themes),
  );
};
