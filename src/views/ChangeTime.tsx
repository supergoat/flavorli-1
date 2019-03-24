import React, {useState, useEffect} from 'react';
import styled from 'styled-components/macro';
import Select from '../ui/Select';
import Label from '../ui/Label';
import Modal from '../templates/ModalPage';
import Button from '../ui/Button';

interface Props {
  openingTime: number;
  closingTime: number;
  onCancel: () => void;
}
const ChangeTime = ({openingTime, closingTime, onCancel}: Props) => {
  const [day, setDay] = useState('Today');
  const [time, setTime] = useState('ASAP');
  const [deliveryTimes, setDeliveryTimes] = useState<string[]>([]);
  const [deliveryDays, setDeliveryDays] = useState(['Today', 'Tomorrow']);

  useEffect(() => {
    getDeliveryDays();
  }, []);

  useEffect(() => {
    getDeliveryTimes();
  }, [day]);

  const getDeliveryTimes = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let deliveryTimes: string[] = [];

    let initialTime = minutes >= 30 ? hours + 1 : hours;

    if (day === 'Tomorrow' || hours < openingTime) {
      initialTime = openingTime - 1;
    } else {
      deliveryTimes.push('ASAP');
    }

    for (let i = initialTime; i < closingTime; i++) {
      deliveryTimes.push(`${i + 1}:00`);
    }

    setDeliveryTimes(deliveryTimes);
    setTime(deliveryTimes[0]);
  };

  const getDeliveryDays = () => {
    const date = new Date();
    const hours = date.getHours();

    if (hours > closingTime) {
      setDeliveryDays(['Tomorrow']);
      setDay('Tomorrow');
    } else {
      setDeliveryDays(['Today', 'Tomorrow']);
      setDay('Today');
    }
  };

  return (
    <Modal>
      <ChangeTimeWrapper>
        <Heading>Select Delivery Time:</Heading>

        <Label>Day</Label>

        {deliveryDays.map(deliveryDay => (
          <Select
            key={deliveryDay}
            onChange={() => setDay(deliveryDay)}
            checked={day === deliveryDay}
            name="day"
            type="radio"
          >
            {deliveryDay}
          </Select>
        ))}

        <Label>Time</Label>

        {deliveryTimes.map(deliveryTime => (
          <Select
            key={deliveryTime}
            onChange={() => setTime(deliveryTime)}
            checked={time === deliveryTime}
            name="time"
            type="radio"
          >
            {deliveryTime}
          </Select>
        ))}

        <div>
          <CancelButton secondary onClick={onCancel} />
          <SaveButton onClick={onCancel} />
        </div>
      </ChangeTimeWrapper>
    </Modal>
  );
};

/* Export
============================================================================= */
export default ChangeTime;

/* Styled Components
============================================================================= */
const ChangeTimeWrapper = styled.div`
  background: var(--white);
  height: auto;
  padding: 15px;
  width: 95%;
  max-width: 450px;
  border-radius: 3px;
  margin: 0 auto;
`;

const Heading = styled.header`
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const CancelButton = styled(Button)`
  margin-top: 10px;
  width: 27.5%;
  margin-right: 2.5%;
  &::before {
    content: 'Cancel';
  }
`;

const SaveButton = styled(Button)`
  margin-top: 10px;
  width: 70%;
  &::before {
    content: 'Set Time';
  }
`;
