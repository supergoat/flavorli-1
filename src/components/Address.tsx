import React from 'react';
import InfoItem from './InfoItem';

interface Props {
  address: {
    number: string;
    streetName: string;
    city: string;
    postalCode: string;
  };
}

const Address = ({address}: Props) => {
  return (
    <InfoItem icon={require('../assets/icons/location.svg')}>
      <p>
        {address.number} {address.streetName}, {address.city},{' '}
        {address.postalCode}
      </p>
    </InfoItem>
  );
};

export default Address;
