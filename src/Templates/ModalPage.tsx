import styled from 'styled-components/macro';

const ModalPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  padding: 5% 0;
  z-index: 1;
`;

export default ModalPage;
