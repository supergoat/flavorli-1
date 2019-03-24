import React, {useState, FormEvent} from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import FAButton from '../ui/Button';
import Label from '../ui/Label';
import Input from '../ui/Input';
import styled from 'styled-components/macro';
import Page from '../templates/Page';

interface Props extends RouteComponentProps {}
const Details = (_: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const isFormValid = () => {
    let errors: string[] = [];
    if (name === '') errors = [...errors, 'Please provide a name.'];

    if (email === '') errors = [...errors, 'Please provide an email.'];

    if (tel === '') errors = [...errors, 'Please provide a mobile phone.'];

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
    <Page heading="Details">
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

        <div>
          <CancelButton secondary onClick={() => window.history.back()} />
          <SaveButton type="submit" />
        </div>
      </form>
    </Page>
  );
};

export default Details;

/* Styled Components
============================================================================= */
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
