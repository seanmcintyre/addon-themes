import React from 'react';
import { ThemeProvider } from 'styled-components';

import { themes } from '@storybook/theming';
import { makeDecorator } from '@storybook/addons';

import { useLocalStorage } from './useLocalStorage';

export const withThemes = makeDecorator({
  name: 'withThemes',
  parameterName: 'themes',
  wrapper: (storyFn, context) => (
    <ThemeProvider theme={themes[useLocalStorage()[0]]}>
      {storyFn(context)}
    </ThemeProvider>
  ),
});
