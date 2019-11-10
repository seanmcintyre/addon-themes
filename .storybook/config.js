import { configure, addDecorator } from '@storybook/react';
// import { addThemes, withThemes } from '@nox/addon-themes';
import { addThemes, withThemes } from '../src/index';

import { themes } from './themes';

addThemes(themes);
addDecorator(withThemes);

configure(require.context('../src', true, /\.stories\.tsx$/), module);
