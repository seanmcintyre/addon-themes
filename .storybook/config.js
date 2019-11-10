import { configure, addDecorator } from '@storybook/react';
import { withThemes } from '../src/index';

addDecorator(withThemes);

configure(require.context('../src', true, /\.stories\.tsx$/), module);
