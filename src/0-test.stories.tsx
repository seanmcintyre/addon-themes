import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

export default { title: 'Test' };

export const theme = () => <ThemeJSON />;

function ThemeJSON() {
  const theme = useContext(ThemeContext);
  return <Pre>{JSON.stringify(theme, null, 2)}</Pre>;
}

const Pre = styled.pre`
  color: ${({ theme }) => theme.textColor};
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.5rem;
`;
