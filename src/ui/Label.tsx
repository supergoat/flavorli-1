import styled from 'styled-components/macro';

interface LabelProps {
  side?: 'left' | 'right';
  hasError?: boolean;
}
const Label = styled.label`
  text-align: ${(props: LabelProps) => props.side};
  color: ${(props: LabelProps) =>
    props.hasError ? 'var(--darkRed)' : 'var(--oxfordBlue)'};
  display: block;
  margin-bottom: 8px;
`;

export default Label;
