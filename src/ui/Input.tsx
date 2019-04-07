import styled from 'styled-components/macro';

interface InputProps {
  hasError?: boolean;
}
const Input = styled.input.attrs({
  autoComplete: 'off',
})`
  width: 100%;
  font-weight: 300;
  font-size: 16px;
  border: ${(props: InputProps) =>
    props.hasError ? '1px solid var(--darkRed)' : '1px solid var(--gallery)'};
  padding: 15px 10px;
  border-radius: 1px;
  font-family: 'Lato';
  &::placeholder {
    color: ${(props: InputProps) =>
      props.hasError ? 'var(--darkRed)' : 'var(--osloGrey)'};
  }
`;
export default Input;
