import React from 'react';
import addons, { types } from '@storybook/addons';
import { ThemeSwitcher } from './ThemeSwitcher';

addons.register('storybook/themes', api => {
  addons.add('storybook/themes', {
    title: 'themes',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <ThemeSwitcher api={api} />,
  });
});
