import React, { useState } from 'react';
import { Radio, Form, Button, Progress } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { EventType } from './EventList';
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
}

const EventForm: React.FC<EventFormProps> = ({
  isLoggedIn,
  event,
  betAble,
  setEvents,
  _id,
  game_type
}: EventFormProps) => {
  const [eventChoice, setEventChoice] = useState<string | null>(betAble);

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
      ))}

      <Button
        content="Submit"
        onClick={handleSubmit}
        disabled={betAble != null}
      />
    </Form>
  );
};

export default EventForm;
