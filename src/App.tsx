import React from 'react';
import Root from './root';
import Navbar from './components/Navbar';
import styled from 'styled-components/macro';

const App = () => {
  return (
    <Main>
      <Navbar />
      <Root />
    </Main>
  );
};
export default App;

const Main = styled.div`
  max-width: 500px;
`;
