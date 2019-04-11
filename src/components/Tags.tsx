import React from 'react';
import styled from 'styled-components/macro';

import InfoItem from './InfoItem';

interface Props {
  tags: string[];
  margin?: string;
}
const Tags = ({tags, margin}: Props) => {
  return (
    <>
      {tags.length > 0 && (
        <InfoItem icon={require('../assets/icons/tag.svg')} margin={margin}>
          {tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </InfoItem>
      )}
    </>
  );
};

export default Tags;

const Tag = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  margin-right: 5px;

  :after {
    content: ',';
  }

  :last-of-type:after {
    content: '';
  }
`;
