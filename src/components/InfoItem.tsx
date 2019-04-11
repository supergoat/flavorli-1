import React from 'react';
import styled from 'styled-components/macro';

interface Props {
  icon: string;
  children: any;
  margin?: string;
}
const InfoItem = ({icon, children, margin}: Props) => {
  return (
    <InfoItemWrapper margin={margin}>
      <Icon src={icon} />

      {children}
    </InfoItemWrapper>
  );
};

export default InfoItem;

interface InfoItemWrapperProps {
  margin?: string;
}

const InfoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: ${(props: InfoItemWrapperProps) => props.margin};
  p,
  a {
    font-size: 11px;
    text-transform: uppercase;
  }
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;
