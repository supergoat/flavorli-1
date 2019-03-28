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
  const [takeAwayTimes, setTakeAwayTimes] = useState<string[]>([]);
  const [takeAwayDays, setTakeAwayDays] = useState(['Today', 'Tomorrow']);

  useEffect(() => {
    getTakeAwayDays();
  }, []);

  useEffect(() => {
    getTakeAwayTimes();
  }, [day]);

  const getTakeAwayTimes = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let takeAwayTimes: string[] = [];

    let initialTime = minutes >= 30 ? hours + 1 : hours;

    if (day === 'Tomorrow' || hours < openingTime) {
      initialTime = openingTime - 1;
    } else {
      takeAwayTimes.push('ASAP');
    }

    for (let i = initialTime; i < closingTime; i++) {
      takeAwayTimes.push(`${i + 1}:00`);
    }

    setTakeAwayTimes(takeAwayTimes);
    setTime(takeAwayTimes[0]);
  };

  const getTakeAwayDays = () => {
    const date = new Date();
    const hours = date.getHours();

    if (hours > closingTime) {
      setTakeAwayDays(['Tomorrow']);
      setDay('Tomorrow');
    } else {
      setTakeAwayDays(['Today', 'Tomorrow']);
      setDay('Today');
    }
  };

  return (
    <Modal>
      <ChangeTimeWrapper>
        {time && takeAwayDays.length > 0 && takeAwayTimes.length > 0 && (
          <>
            <Heading>Select Take Away Time:</Heading>

            <Label>Day</Label>

            {takeAwayDays.map(takeAwayDay => (
              <Select
                key={takeAwayDay}
                onChange={() => setDay(takeAwayDay)}
                checked={day === takeAwayDay}
                name="day"
                type="radio"
              >
                {takeAwayDay}
              </Select>
            ))}

            <Label>Time</Label>

            {takeAwayTimes.map(takeAwayTime => (
              <Select
                key={takeAwayTime}
                onChange={() => setTime(takeAwayTime)}
                checked={time === takeAwayTime}
                name="time"
                type="radio"
              >
                {takeAwayTime}
              </Select>
            ))}

            <div>
              <CancelButton secondary onClick={onCancel} />
              <SaveButton onClick={onCancel} />
            </div>
          </>
        )}
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
