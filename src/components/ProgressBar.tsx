import React from 'react';
import styled, {keyframes} from 'styled-components/macro';

const ProgressBarView = ({width}: {width: string}) => {
  return (
    <ProgressBarContainer>
      <ProgressBar width={width} />
    </ProgressBarContainer>
  );
};

export default ProgressBarView;

const progressBarShimmer = keyframes`
    0%{
        background-position: 100% 0
    }
    100%{
        background-position: -100% 0
    }
`;

interface ProgressBarProps {
  width?: string;
}

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 3px;
  background: var(--gallery);
`;

const ProgressBar = styled.div`
  width: ${({width}: ProgressBarProps) => width};
  height: 30px;
  border-radius: 3px;
  background: linear-gradient(to right, #b8b8b8 3%, #c8c8c8 20%, #b8b8b8 30%);
  background-size: 200% 30px;
  animation: ${progressBarShimmer} 1.5s linear forwards infinite;
`;
