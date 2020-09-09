import React, { useState } from 'react';
import { Radio, Form, Button, Progress, Popup } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { EventType } from './EventList';
import { GameStatus } from '@/components/GameCard';
import axios from '@/utils/axios';

interface BettingResponse {
  success: boolean;
}

interface EventFormProps {
  isLoggedIn: boolean;
  event: EventType;
  betAble: string | null;
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
  _id: string;
  game_type: string;
  playing: GameStatus
}

const EventForm: React.FC<EventFormProps> = ({
  isLoggedIn,
  event,
  betAble,
  setEvents,
  _id,
  game_type,
  playing
}: EventFormProps) => {
  const [eventChoice, setEventChoice] = useState<string | null>(null);

  const handleChange = (_, { value }) => {
    setEventChoice(value);
  };
  const history = useHistory();

  const handleSubmit = async () => {
    if (isLoggedIn) {
      if (eventChoice) {
        const {
          data
        }: { data: BettingResponse } = await axios.post(
          '/api/private/betevent',
          { key: event.key, choice: eventChoice, game_type }
        );
        if (data.success) {
          setEvents(prevState => {
            const targetEvent = prevState.filter(
              each => each.key === event.key
            )[0];
            return prevState
              .filter(each => each.key !== event.key)
              .concat({
                ...targetEvent,
                responses: targetEvent.responses.concat({
                  choice: eventChoice,
                  key: _id
                })
              });
          });
          setEventChoice(null)
        }
      }
    } else {
      history.push('/');
    }
  };

  const calculatePercent = (choice: string) => {
    const denom = event.responses.length;
    const numer = event.responses.filter(res => res.choice === choice).length;
    return (numer / denom) * 100;
  };

  return (
    <Form>
      <Form.Field>
        Selected value: <b>{betAble || eventChoice}</b>
      </Form.Field>
      {event.choices.map((choice, key) => (
        (choice === event.answer && betAble === choice) ? (
          <Form.Field
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              outline: "3px solid green",
            }}
          >
            <Radio
              label={choice}
              value={choice}
              name="radioGroup"
              checked={choice === eventChoice || choice === betAble}
              onChange={handleChange}
              disabled={betAble != null}
              style={{ marginRight: 'auto' }}
            />
            <Progress
              percent={calculatePercent(choice)}
              indicating
              style={{
                width: '60%',
                margin: '0.2rem 1rem',
                justifySelf: 'flex-end'
              }}
            ></Progress>
          </Form.Field>
        ) : (choice === event.answer && betAble != choice) ? (
          <Form.Field
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              outline: "3px solid red",
              boxShadow: "0 0 0 2px #f00"
            }}
          >
            <Radio
              label={choice}
              value={choice}
              name="radioGroup"
              checked={choice === eventChoice || choice === betAble}
              onChange={handleChange}
              disabled={betAble != null}
              style={{ marginRight: 'auto' }}
            />
            <Progress
              percent={calculatePercent(choice)}
              indicating
              style={{
                width: '60%',
                margin: '0.2rem 1rem',
                justifySelf: 'flex-end'
              }}
            ></Progress>
          </Form.Field>
        ) : (
              <Form.Field
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}
              >
                <Radio
                  label={choice}
                  value={choice}
                  name="radioGroup"
                  checked={choice === eventChoice || choice === betAble}
                  onChange={handleChange}
                  disabled={betAble != null}
                  style={{ marginRight: 'auto' }}
                />
                <Progress
                  percent={calculatePercent(choice)}
                  indicating
                  style={{
                    width: '60%',
                    margin: '0.2rem 1rem',
                    justifySelf: 'flex-end'
                  }}
                ></Progress>
              </Form.Field>
            )
      ))}
      {
        (playing != GameStatus.Waiting) ? (
          <Popup content='베팅이 종료되었습니다.' trigger={<div style={{ display: "inline-block" }}><Button
            content="Submit"
            onClick={handleSubmit}
            disabled
          /></div>} />
        ) : (betAble != null) ? (
          <Popup content='이미 베팅하셨습니다.' trigger={<div style={{ display: "inline-block" }}><Button
            content="Submit"
            onClick={handleSubmit}
            disabled
          /></div>} />
        ) : (eventChoice === null) ? (
          <Popup content='선택후 제출해주세요.' trigger={<div style={{ display: "inline-block" }}><Button
            content="Submit"
            onClick={handleSubmit}
            disabled
          /></div>} />
        ) : (
                <Button
                  content="Submit"
                  onClick={handleSubmit}
                />
              )
      }

    </Form >
  );
};

export default EventForm;
