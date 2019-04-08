import React from 'react';
import styled from 'styled-components/macro';

interface Props {
  onClick: () => void;
  heading: any;
  subHeading?: any;
  cta: any;
  margin?: string;
}
const Tile = ({onClick, heading, subHeading, cta, margin}: Props) => {
  return (
    <TileWrapper onClick={onClick} margin={margin}>
      <Heading>{heading}</Heading>
      <SubHeading>{subHeading}</SubHeading>
      <CTA>{cta}</CTA>
    </TileWrapper>
  );
};

/* Export
============================================================================= */
export default Tile;

/* Styled Components 
============================================================================= */
interface TileWrapperProps {
  margin?: string;
}
const TileWrapper = styled.button`
  width: 100%;
  border: 1px solid var(--silver);
  text-align: left;
  font-size: 16px;
  padding: 15px;
  border-radius: 3px;
  background: var(--white);
  margin: ${(props: TileWrapperProps) => props.margin};
`;

const Heading = styled.h5`
  font-size: 15px;
  margin-bottom: 10px;
`;

const SubHeading = styled.div`
  font-size: 14px;
  color: var(--osloGrey);
`;

const CTA = styled.p`
  font-size: 14px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid var(--silver);
  font-weight: bold;
`;
