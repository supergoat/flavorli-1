import React, {useState, FormEvent} from 'react';
import gql from 'graphql-tag';
import {navigate, RouteComponentProps} from '@reach/router';
import {Query} from 'react-apollo';
import Button from '../ui/Button';
import Label from '../ui/Label';
import Input from '../ui/Input';
import styled from 'styled-components/macro';
import Page from '../templates/Page';

export const GET_VIEWER = gql`
  query getViewer {
    me {
      id
      name
      email
      tel
    }
  }
`;

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
    <Query query={GET_VIEWER}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const viewer = data.me;

        setName(viewer.name);
        setEmail(viewer.email);
        setTel(viewer.tel);

        return (
          <Page heading="Details">
            {errors.map((error, index) => (
              <Error key={index}>{error}</Error>
            ))}

            <form onSubmit={handleSubmit}>
              <DetailsLabel htmlFor="name">Change name</DetailsLabel>
              <DetailsInput
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={e => setName(e.currentTarget.value)}
              />

              <DetailsLabel htmlFor="email">Change Email</DetailsLabel>
              <DetailsInput
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={e => setEmail(e.currentTarget.value)}
              />

              <DetailsLabel htmlFor="tel">Change Mobile Phone</DetailsLabel>
              <DetailsInput
                id="tel"
                type="tel"
                placeholder="Mobile Phone"
                name="tel"
                value={tel}
                onChange={e => setTel(e.currentTarget.value)}
              />

              <div>
                <CancelButton secondary onClick={() => window.history.back()} />
                <UpdateDetailsButton type="submit" />
              </div>
            </form>
          </Page>
        );
      }}
    </Query>
  );
};

export default Details;

/* Styled Components
============================================================================= */
const DetailsLabel = styled(Label)`
  font-size: 15px;
`;

const DetailsInput = styled(Input)`
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

const UpdateDetailsButton = styled(Button)`
  margin-top: 10px;
  width: 70%;
  &::before {
    content: 'Update Details';
  }
`;
