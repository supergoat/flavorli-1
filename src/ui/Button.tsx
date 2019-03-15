import styled from 'styled-components/macro';

interface Props {
  secondary?: boolean;
  width?: string;
}
const Button = styled.button`
  font-size: 16px;
  padding: 15px;
  border-radius: 3px;
  border: 1px solid var(--oxfordBlue);
  background: ${(props: Props) =>
    props.secondary ? 'var(--white)' : 'var(--oxfordBlue)'};
  color: ${(props: Props) =>
    props.secondary ? 'var(--oxfordBlue)' : 'var(--white)'};
  width: ${(props: Props) => props.width || 'auto'};
`;

export default Button;
