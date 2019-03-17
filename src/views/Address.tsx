import React, {useState, FormEvent} from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import FAButton from '../ui/Button';
import Label from '../ui/Label';
import Input from '../ui/Input';
import styled from 'styled-components/macro';

interface Props extends RouteComponentProps {}
const Address = (_: Props) => {
  const [houseNumber, setHouseNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const isFormValid = () => {
    let errors: string[] = [];
    if (houseNumber === '')
      errors = [...errors, 'Please provide a house number.'];

    if (streetName === '')
      errors = [...errors, 'Please provide a street name.'];

    if (postalCode === '')
      errors = [...errors, 'Please provide a postal code.'];

    const isValid = errors.length === 0;
    setErrors(errors);

    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Do not submit form if its invalid
    if (!isFormValid()) return;

    navigate('/checkout');
  };

  return (
    <AddressWrapper>
      <Title>Address</Title>

      {errors.map(error => (
        <Error>{error}</Error>
      ))}

      <form onSubmit={handleSubmit}>
        <Label htmlFor="houseNumber">House Number</Label>
        <AddressInput
          id="houseNumber"
          type="text"
          placeholder="House Number"
          name="houseNumber"
          value={houseNumber}
          onChange={e => setHouseNumber(e.currentTarget.value)}
        />

        <Label htmlFor="streetName">Street Name</Label>
        <AddressInput
          id="streetName"
          type="text"
          placeholder="Street Name"
          name="streetName"
          value={streetName}
          onChange={e => setStreetName(e.currentTarget.value)}
        />

        <Label htmlFor="postalCode">Postal Code</Label>
        <AddressInput
          id="postalCode"
          type="postalCode"
          placeholder="Postal Code"
          name="postalCode"
          value={postalCode}
          onChange={e => setPostalCode(e.currentTarget.value)}
        />

        <Label htmlFor="city">City</Label>
        <AddressInput
          id="city"
          type="city"
          name="city"
          value={'London'}
          disabled
        />

        <Label htmlFor="address">Delivery Address</Label>
        <AddressInput
          id="address"
          type="text"
          name="address"
          value={'United Kingdom'}
          disabled
        />

        <div>
          <CancelButton secondary onClick={() => window.history.back()} />
          <SaveButton type="submit" />
        </div>
      </form>
    </AddressWrapper>
  );
};

export default Address;

/* Styled Components
============================================================================= */
const AddressWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: var(--white);
  overflow-y: auto;
  padding: 20px;
  z-index: 1;
`;

const Title = styled.header`
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const AddressInput = styled(Input)`
  margin-bottom: 15px;

  & :disabled {
    font-weight: 400;
    cursor: not-allowed;
  }
`;

const Error = styled.p`
  color: var(--stiletto);
  margin: 5px 0 20px;
`;

const CancelButton = styled(FAButton)`
  margin-top: 10px;
  width: 27.5%;
  margin-right: 2.5%;
  &::before {
    content: 'Cancel';
  }
`;

const SaveButton = styled(FAButton)`
  margin-top: 10px;
  width: 70%;
  &::before {
    content: 'Save Address';
  }
`;
