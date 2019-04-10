import React from 'react';
import InfoItem from './InfoItem';

interface Props {
  tel: string;
}

const Tel = ({tel}: Props) => {
  return (
    <InfoItem icon={require('../assets/icons/tel.svg')}>
      <a href={`tel:${tel}`}>{tel}</a>
    </InfoItem>
  );
};

export default Tel;
