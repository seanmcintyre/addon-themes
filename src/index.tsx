import React from 'react';
import { ThemeProvider } from 'styled-components';
import { makeDecorator } from '@storybook/addons';

import { readThemes } from './themes';
import { useLocalStorage } from './useLocalStorage';

export const withThemes = makeDecorator({
  name: 'withThemes',
  parameterName: 'themes',
  wrapper: (story, ctx) => <ThemedStory>{story(ctx)}</ThemedStory>,
});

export { addThemes } from './themes';

function ThemedStory(props: any) {
  const [name] = useLocalStorage();
  const theme = readThemes()[name];
  return <ThemeProvider theme={theme} {...props} />;
}
