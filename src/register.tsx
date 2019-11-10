import React from 'react';
import styled from 'styled-components';

import { themes } from '@storybook/theming';
import addons, { types } from '@storybook/addons';

import { useLocalStorage } from './useLocalStorage';

addons.register('nox/addon-themes', api =>
  addons.add('nox/addon-themes', {
    title: 'nox/addon-themes',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <ThemeToggle api={api}>nox</ThemeToggle>,
  }),
);

function ThemeToggle({ api, ...props }: any) {
  const [state, setState] = useLocalStorage();
  const next = state === 'light' ? 'dark' : 'light';

  function doClick() {
    setState(next);
    api.setOptions({ theme: themes[next] });
  }

  return (
    <Styled onClick={doClick} {...props}>
      {state}
    </Styled>
  );
}

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  user-select: none;

  color: ${({ theme }) => theme.textColor};
  font-size: 0.667rem;
  font-weight: 800;
  letter-spacing: 0.1rem;
  line-height: 0.667rem;
  text-transform: uppercase;
`;
