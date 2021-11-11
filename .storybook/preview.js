import { themes } from './themes';
import { ThemedStory, addThemes } from '../dist/utilities';

addThemes(themes);

export const decorators = [
  Story => <ThemedStory>{Story()}</ThemedStory>,
];
