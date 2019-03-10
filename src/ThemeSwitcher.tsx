import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  IconButton,
  WithTooltip,
  TooltipLinkList,
  // @ts-ignore
} from '@storybook/components';
import styled from 'styled-components';
import {
  getLocalTheme,
  bindThemeOverride,
  setLocalTheme,
} from './themeStore';

export const ThemeSwitcher = ({ api }: any) => {
  const [activeTheme, setTheme] = useState(getLocalTheme()[0]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => bindThemeOverride(api), []);

  const themes: any = JSON.parse(
    window.localStorage.getItem('iris-sb-themes') || '',
  );

  const themeList =
    themes &&
    themes.map((i: any) => ({
      id: i,
      title: i,
      onClick: () => {
        setTheme(i);
        setLocalTheme({ api, theme: i, rerender: true });
      },
      right: <ThemeIcon />,
    }));

  return themes ? (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltipShown={expanded}
      onVisibilityChange={(expanded: boolean) =>
        setExpanded(expanded)
      }
      tooltip={<TooltipLinkList links={themeList} />}
      closeOnClick
    >
      <IconButton key="theme-switcher">{activeTheme}</IconButton>
    </WithTooltip>
  ) : (
    <></>
  );
};

const ThemeIcon = styled.span`
  height: 1rem;
  width: 1rem;
  display: block;
  background: red;
`;

// CHANNEL_CREATED = "channelCreated",
// GET_CURRENT_STORY = "getCurrentStory",
// SET_CURRENT_STORY = "setCurrentStory",
// GET_STORIES = "getStories",
// SET_STORIES = "setStories",
// STORIES_CONFIGURED = "storiesConfigured",
// SELECT_STORY = "selectStory",
// PREVIEW_KEYDOWN = "previewKeydown",
// STORY_ADDED = "storyAdded",
// STORY_CHANGED = "storyChanged",
// STORY_UNCHANGED = "storyUnchanged",
// FORCE_RE_RENDER = "forceReRender",
// REGISTER_SUBSCRIPTION = "registerSubscription",
// STORY_INIT = "storyInit",
// STORY_RENDER = "storyRender",
// STORY_RENDERED = "storyRendered",
// STORY_MISSING = "storyMissing",
// STORY_ERRORED = "storyErrored",
// STORY_THREW_EXCEPTION = "storyThrewException"
