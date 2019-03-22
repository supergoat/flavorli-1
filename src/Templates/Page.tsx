import React from 'react';
import styled, {css} from 'styled-components/macro';
import {RouteComponentProps} from '@reach/router';

interface Props extends RouteComponentProps {
  onClose?: () => void;
  showNavbar?: boolean;
  heading?: string;
  children: any;
}
const Page = ({onClose, showNavbar = false, heading, children}: Props) => {
  return (
    <PageWrapper showNavbar={showNavbar}>
      {onClose && <CloseButton onClick={onClose} />}
      {heading && <Heading>{heading}</Heading>}
      {children}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  ${(props: {showNavbar: boolean}) =>
    !props.showNavbar &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100vw;
      height: 100vh;
      background: var(--white);
    `}
  overflow-y: auto;
  padding: 20px;
  z-index: 1;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 25px;
  cursor: pointer;
  &:before {
    content: 'X';
  }
`;

const Heading = styled.header`
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 20px;
`;

export default Page;
