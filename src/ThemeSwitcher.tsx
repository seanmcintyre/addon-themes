import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  IconButton,
  WithTooltip,
  TooltipLinkList,
  // @ts-ignore
} from '@storybook/components';
import { theme, bindThemeOverride, setTheme } from './themeStore';
import { themes, SharedTheme } from './themes';
import styled from 'styled-components';

export const ThemeSwitcher = ({ api }: any) => {
  const [t, setT] = useState(theme()); // render hack
  const [expanded, setExpanded] = useState(false);
  useEffect(() => bindThemeOverride(api), [api]);

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltipShown={expanded}
      closeOnClick
      onVisibilityChange={(expanded: boolean) =>
        setExpanded(expanded)
      }
      tooltip={
        <TooltipLinkList
          links={themes.map((theme: SharedTheme) => ({
            id: theme.name,
            title: theme.name,
            right: (
              <Icon
                theme={t.name}
                dangerouslySetInnerHTML={{ __html: theme.icon }}
              />
            ),
            onClick: () => {
              setT(theme);
              setTheme({ api, newTheme: theme, rerender: true });
              setExpanded(expanded);
            },
          }))}
        />
      }
    >
      <IconButton key="theme-switcher">
        <Icon
          theme={t.name}
          dangerouslySetInnerHTML={{ __html: theme().icon }}
        />
      </IconButton>
    </WithTooltip>
  );
};

const Icon = styled.span`
  height: 1rem;
  width: 1rem;
  display: block;

  svg {
    stroke: ${props =>
      props.theme === 'light' ? '#000' : '#FFF'} !important;
    fill: ${props =>
      props.theme === 'light' ? '#000' : '#FFF'} !important;
  }
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
