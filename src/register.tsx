import React, { useLayoutEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import addons, { types } from '@storybook/addons';

import { Icon, Wrapper } from './Icon';
import { toggle, useLocal } from './useLocal';

const { TOOL } = types;

addons.register('nox/addon-themes', api =>
  addons.add('nox/addon-themes', {
    title: 'nox/addon-themes',
    type: TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <ThemeToggle api={api} />,
  }),
);

function ThemeToggle({ api, ...props }: any) {
  const [theme, themeSet] = useLocal();

  // Toggle light/dark theme on click.
  function onClick() {
    const next = toggle(theme.name);
    api.setOptions({ theme: next });
    themeSet(next.name);
  }

  // Hacky. Set the theme once on load.
  useLayoutEffect(() => api.setOptions({ theme }), []);

  if (!theme.icon) {
    theme.icon = '<div>toggle</div>';
  }

  return (
    <ThemeProvider theme={theme}>
      <Wrapper onClick={onClick} {...props}>
        <Icon svg={{ __html: theme.icon }} theme={theme} />
      </Wrapper>
    </ThemeProvider>
  );
}
