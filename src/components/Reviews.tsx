import React from 'react';
import styled from 'styled-components';

const Reviews = () => {
  return (
    <ReviewsWrapper>
      <Rating>
        <h1>4.1</h1>
        <p>203 reviews</p>
      </Rating>
      <Review>
        <Avatar />
        <Text>
          "Very tasty food, friendly staff, sizeable portions and Greek
          products."
        </Text>
      </Review>
      <Review>
        <Avatar />
        <Text>"Good priced souvlaki - pita, fries and sauces are superb."</Text>
      </Review>
      <Review>
        <Avatar />
        <Text>
          "Very friendly service and good location within Boxpark next to
          Beatbox bar."
        </Text>
      </Review>
    </ReviewsWrapper>
  );
};

export default Reviews;

const ReviewsWrapper = styled.div`
  padding: 30px 10px;
  border-bottom: 1px solid var(--gallery);
  margin-bottom: 20px;
`;

const Rating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 40px;
  }
`;

const Review = styled.div`
  display: flex;
  margin: 20px 0;
  align-items: center;
`;

const Avatar = styled.div`
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  background: lightgrey;
  border-radius: 15px;
  margin-right: 10px;
`;

const Text = styled.p`
  font-weight: 300;
`;
