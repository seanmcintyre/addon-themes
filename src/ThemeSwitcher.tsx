import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { themes as sbThemes } from '@storybook/theming';
import addons from '@storybook/addons';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import {
  IconButton,
  WithTooltip,
  TooltipLinkList,
  // @ts-ignore
} from '@storybook/components';

export const ThemeSwitcher = ({ api }: any) => {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => bindThemeOverride(api), [api]);

  const currentTheme = getCurrentTheme();
  const themesObj = getThemes();
  const themeNames = Object.keys(themesObj);
  const themes = themeNames
    .map(name => themesObj[name])
    .filter(theme => typeof theme === 'object');

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
          links={themes.map((theme: any, i: number) => ({
            id: theme.name,
            title: theme.name,
            right: (
              <Icon
                key={i}
                theme={theme.name}
                dangerouslySetInnerHTML={{ __html: theme.icon }}
              />
            ),
            onClick: () => {
              setTheme({
                api,
                newTheme: theme.name,
                rerender: true,
              });
              setExpanded(expanded);
            },
          }))}
        />
      }
    >
      <IconButton key="theme-switcher">
        <Icon
          theme={currentTheme.name}
          dangerouslySetInnerHTML={{
            __html: currentTheme.icon,
          }}
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
      props.theme === 'light'
        ? 'rgba(0,0,0,0.75)'
        : 'rgba(255,255,255,0.9)'} !important;
    fill: ${props =>
      props.theme === 'light'
        ? 'rgba(0,0,0,0.75)'
        : 'rgba(255,255,255,0.9)'} !important;
    stroke-width: 0.25rem;
  }
`;

export function bindThemeOverride(api: any) {
  const channel = api.getChannel();

  channel.on('storiesConfigured', () => {
    setTheme({ api });
  });

  channel.on('storyChanged', () => {
    setTheme({ api });
  });
}

export function getCurrentTheme() {
  const theme =
    window.localStorage.getItem('sb-addon-theme') || 'light';
  return getThemes()[theme];
}

export function getThemes() {
  return (
    JSON.parse(window.localStorage.getItem(
      'sb-addon-themes',
    ) as string) || defaultThemes
  );
}

export function setTheme({ api, newTheme, rerender = false }: any) {
  if (newTheme) {
    window.localStorage.setItem('sb-addon-theme', newTheme);
  }
  api.setOptions({ theme: getCurrentTheme() });

  if (rerender) {
    addons.getChannel().emit(FORCE_RE_RENDER);
  }
}

export function addThemes(themes: any) {
  console.log('Registering themes: ', themes);
  window.localStorage.setItem(
    'sb-addon-themes',
    JSON.stringify(themes),
  );
}

const defaultThemes = {
  light: {
    name: 'light',
    ...sbThemes.light,
  },
  dark: {
    name: 'dark',
    ...sbThemes.dark,
  },
};
