import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Button,
  Form,
  Icon,
  Modal,
  Popup,
  Progress,
  Radio
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { EventType } from './EventList';
import { GameStatus } from '@/types';
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
  playing: GameStatus;
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
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  const handleChange = (_, { value }) => {
    setEventChoice(value);
  };
  const history = useHistory();
  const { formatMessage: f } = useIntl();
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
          setEventChoice(null);
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
  const calculateDividend = (choice: string) => {
    const denom = event.responses.filter(res => res.choice === choice).length;
    return Math.round(event.dividend / (denom + 1));
  };
  return (
    <Form>
      <Form.Field style={{ color: 'grey' }}>
        {f({ id: 'event.helper' })}
      </Form.Field>

      {event.choices.map((choice, key) =>
        choice === event.answer && event.answer !== undefined ? (
          <Form.Field
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <Radio
              label={`${choice} (${f({ id: 'correct' })})`}
              value={choice}
              name="radioGroup"
              checked={choice === eventChoice || choice === betAble}
              onChange={handleChange}
              style={{ flex: 2, fontSize: 'calc(0.7rem + 0.6vmin)' }}
            />
            <Popup
              on="click"
              content={`${f({ id: 'game.winning' })}: ${calculateDividend(
                choice
              )}`}
              trigger={
                <Progress
                  percent={calculatePercent(choice)}
                  color="green"
                  style={{
                    flex: 3,
                    margin: '0.2rem 1rem',
                    justifySelf: 'flex-end'
                  }}
                />
              }
            />
          </Form.Field>
        ) : choice !== event.answer && event.answer != undefined ? (
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
              style={{ flex: 2, fontSize: 'calc(0.7rem + 0.6vmin)' }}
            />
            <Popup
              on="click"
              content={`${f({ id: 'game.winning' })}: ${calculateDividend(
                choice
              )}`}
              trigger={
                <Progress
                  percent={calculatePercent(choice)}
                  style={{
                    flex: 3,
                    margin: '0.2rem 1rem',
                    justifySelf: 'flex-end'
                  }}
                />
              }
            />
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
              style={{ flex: 2, fontSize: 'calc(0.7rem + 0.6vmin)' }}
            />
            <Popup
              on="click"
              content={`${f({ id: 'game.winning' })}: ${calculateDividend(
                choice
              )}`}
              trigger={
                <Progress
                  percent={calculatePercent(choice)}
                  color="yellow"
                  style={{
                    flex: 3,
                    margin: '0.2rem 1rem',
                    justifySelf: 'flex-end'
                  }}
                />
              }
            />
          </Form.Field>
        )
      )}
      {playing !== GameStatus.Waiting ? (
        <Popup
          content="베팅이 종료되었습니다."
          trigger={
            <div style={{ display: 'inline-block' }}>
              <Button content="Submit" onClick={handleSubmit} disabled />
            </div>
          }
        />
      ) : betAble !== null ? (
        <Popup
          content="이미 베팅하셨습니다."
          trigger={
            <div style={{ display: 'inline-block' }}>
              <Button content="Submit" onClick={handleSubmit} disabled />
            </div>
          }
        />
      ) : eventChoice === null ? (
        <Popup
          content="선택후 제출해주세요."
          trigger={
            <div style={{ display: 'inline-block' }}>
              <Button content="Submit" onClick={handleSubmit} disabled />
            </div>
          }
        />
      ) : (
        <Modal
          size="small"
          onClose={() => setConfirmModalOpen(false)}
          onOpen={() => setConfirmModalOpen(true)}
          open={confirmModalOpen}
          trigger={<Button content="Submit" />}
        >
          <Modal.Content style={{ fontSize: 'calc(0.8rem + 1vmin)' }}>
            {f({ id: 'mainpopup.betwarning' })}
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setConfirmModalOpen(false)}>
              <Icon name="remove" /> {f({ id: 'cancel' })}
            </Button>
            <Button
              color="vk"
              onClick={() => {
                setConfirmModalOpen(false);
                handleSubmit();
              }}
            >
              <Icon name="checkmark" /> {f({ id: 'yes' })}
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </Form>
  );
};

export default EventForm;
