import React from 'react';
import {
  makeDecorator,
  StoryContext,
  StoryGetter,
} from '@storybook/addons';
import { ThemeProvider } from 'styled-components';
import { getCurrentTheme } from './ThemeSwitcher';

export const withThemes = makeDecorator({
  name: 'themes',
  parameterName: 'themes',
  skipIfNoParametersOrOptions: false,
  allowDeprecatedUsage: false,
  wrapper: (getStory: StoryGetter, context: StoryContext) => {
    const theme = getCurrentTheme();
    return (
      <ThemeProvider theme={theme}>{getStory(context)}</ThemeProvider>
    );
  },
});

export { addThemes } from './ThemeSwitcher';
