import React from 'react';
import styled from 'styled-components/macro';

interface Props {
  icon: string;
  children: any;
}
const InfoItem = ({icon, children}: Props) => {
  return (
    <InfoItemWrapper>
      <Icon src={icon} />

      {children}
    </InfoItemWrapper>
  );
};

export default InfoItem;

const InfoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px 0;

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
