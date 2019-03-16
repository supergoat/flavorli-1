import React, {useState, FormEvent} from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import FAButton from '../ui/Button';
import Label from '../ui/Label';
import Input from '../ui/Input';
import styled from 'styled-components/macro';

interface Props extends RouteComponentProps {}
const Account = (_: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const isFormValid = () => {
    let errors: string[] = [];
    if (name === '') errors = [...errors, 'Please provide a name.'];

    if (email === '') errors = [...errors, 'Please provide an email.'];

    if (tel === '') errors = [...errors, 'Please provide a mobile phone.'];

    if (address === '')
      errors = [...errors, 'Please provide a  delivery address.'];

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
    <AccountWrapper>
      <Title>Details</Title>

      {errors.map(error => (
        <Error>{error}</Error>
      ))}

      <form onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <DetailsInput
          id="name"
          type="text"
          placeholder="e.g. James"
          name="name"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
        />

        <Label htmlFor="email">Email</Label>
        <DetailsInput
          id="email"
          type="email"
          placeholder="email@example.com"
          name="email"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
        />

        <Label htmlFor="tel">Mobile phone</Label>
        <DetailsInput
          id="tel"
          type="tel"
          placeholder="e.g. +44 0000 000000"
          name="tel"
          value={tel}
          onChange={e => setTel(e.currentTarget.value)}
        />

        <Label htmlFor="address">Delivery Address</Label>
        <DetailsInput
          id="address"
          type="text"
          placeholder="e.g. flat no, street"
          name="address"
          value={address}
          onChange={e => setAddress(e.currentTarget.value)}
        />

        <div>
          <CancelButton secondary onClick={() => navigate('/')} />
          <SaveButton type="submit" />
        </div>
      </form>
    </AccountWrapper>
  );
};

export default Account;

/* Styled Components
============================================================================= */
const AccountWrapper = styled.div`
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

const DetailsInput = styled(Input)`
  margin-bottom: 15px;
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
    content: 'Save Details';
  }
`;
