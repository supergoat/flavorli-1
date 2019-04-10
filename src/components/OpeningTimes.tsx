import React from 'react';
import InfoItem from './InfoItem';

const OpeningTimes = () => {
  return (
    <InfoItem icon={require('../assets/icons/time.svg')}>
      <p>11:30 - 22:30</p>
    </InfoItem>
  );
};

export default OpeningTimes;
