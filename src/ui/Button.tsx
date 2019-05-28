import styled from 'styled-components/macro';

interface Props {
  secondary?: boolean;
  success?: boolean;
  danger?: boolean;
  width?: string;
}
const Button = styled.button`
  font-size: 16px;
  font-weight: ${(props: Props) =>
    props.secondary || props.danger ? 'bold' : 'normal'};
  padding: 12px;
  border-radius: 4px;
  border: none;
  box-shadow: ${(props: Props) =>
    props.secondary
      ? '0 1px 4px rgba(0, 0, 0, 0.2)'
      : '1px 1px 3px rgba(0, 0, 0, 0.2)'};
  outline: none;
  background: ${(props: Props) => {
    if (props.secondary) return 'var(--white)';
    if (props.success) return 'darkgreen';
    if (props.danger) return 'var(--darkRed)';
    return 'var(--oxfordBlue)';
  }};
  color: ${(props: Props) =>
    props.secondary ? 'var(--oxfordBlue)' : 'var(--white)'};
  width: ${(props: Props) => props.width || 'auto'};
  align-self: flex-start;
  cursor: pointer;

  &:disabled {
    opacity: 0.8;
  }
`;

export default Button;
