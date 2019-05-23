import React, {useState, FormEvent} from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import Button from '../ui/Button';
import Label from '../ui/Label';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import styled from 'styled-components/macro';
import Page from '../templates/Page';

interface Props extends RouteComponentProps {}
const Address = (_: Props) => {
  const [houseNumber, setHouseNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');
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

    navigate('/basket');
  };

  return (
    <Page heading="Address">
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

        <Label htmlFor="country">Country</Label>
        <AddressInput
          id="country"
          type="text"
          name="country"
          value={'United Kingdom'}
          disabled
        />

        <Label htmlFor="notes">Notes</Label>
        <Notes
          rows={4}
          id="notes"
          placeholder="Additional notes..."
          name="notes"
          value={notes}
          onChange={e => setNotes(e.currentTarget.value)}
        />

        <div>
          <CancelButton secondary onClick={() => window.history.back()} />
          <SaveButton type="submit" />
        </div>
      </form>
    </Page>
  );
};

export default Address;

/* Styled Components
============================================================================= */
const AddressInput = styled(Input)`
  margin-bottom: 15px;

  & :disabled {
    font-weight: 400;
    cursor: not-allowed;
  }
`;

const Notes = styled(TextArea)`
  margin-bottom: 15px;
`;

const Error = styled.p`
  color: var(--stiletto);
  margin: 5px 0 20px;
`;

const CancelButton = styled(Button)`
  margin-top: 10px;
  width: 27.5%;
  margin-right: 2.5%;
  &::before {
    content: 'Cancel';
  }
`;

const SaveButton = styled(Button)`
  margin-top: 10px;
  width: 70%;
  &::before {
    content: 'Save Address';
  }
`;
