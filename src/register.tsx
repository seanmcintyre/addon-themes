import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import addons, { types } from '@storybook/addons';

import { readThemes } from './themes';
import { useLocalStorage } from './useLocalStorage';

const { TOOL } = types;

addons.register('nox/addon-themes', api =>
  addons.add('nox/addon-themes', {
    title: 'nox/addon-themes',
    type: TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <ThemeToggle api={api}>nox</ThemeToggle>,
  }),
);

function ThemeToggle({ api, ...props }: any) {
  const [local, setLocal] = useLocalStorage();
  const name = local === 'light' ? 'dark' : 'light';

  const { setOptions } = api;
  const themes = readThemes();
  const theme = themes[name];
  const current = themes[local];

  const { icon } = current;
  const HTML = { __html: icon };

  function doClick() {
    setOptions({ theme });
    setLocal(name);
  }

  useEffect(() => {
    if (!icon) setTimeout(() => setLocal(local), 1000);
  }, []);

  return icon ? (
    <ThemeProvider theme={current}>
      <Styled onClick={doClick} {...props}>
        {icon ? <IconStyled dangerouslySetInnerHTML={HTML} /> : local}
      </Styled>
    </ThemeProvider>
  ) : (
    <Styled>loading themes...</Styled>
  );
}

const IconStyled = styled.div`
  svg {
    width: 1.25rem;
    height: 1.25rem;
    opacity: 0.75;

    * {
      fill: ${({ theme }) => theme.textColor};
    }
  }
`;

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.667rem;
  font-weight: 800;
  line-height: 0.667rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
`;
