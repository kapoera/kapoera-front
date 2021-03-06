import React, { useState, useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Accordion, AccordionTitleProps } from 'semantic-ui-react';
import EventForm from '@/components/EventForm';
import { GlobalContext } from '@/context';
import { GameStatus } from '@/types';
import axios from '@/utils/axios';

export interface Response {
  choice: string;
  key: string;
}

export interface EventType {
  game_type: string;
  answer: string;
  choices: Array<string>;
  responses: Array<Response>;
  name_ko: string;
  name_en: string;
  dividend: number;
  key: number;
}

export interface EventListProps {
  gameId: string;
  playing: GameStatus;
}

const defaultEvent: EventType[] = [
  {
    game_type: 'default',
    answer: 'a',
    choices: [],
    responses: [],
    name_ko: 'default',
    name_en: 'default',
    dividend: 500,
    key: -1
  }
];

const EventList: React.FC<EventListProps> = ({
  gameId,
  playing
}: EventListProps) => {
  const { locale } = useIntl();

  const [activeIndex, setActiveIndex] = useState(-1);
  const handleClick = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    titleProps: AccordionTitleProps
  ) => {
    const { index } = titleProps;
    const newIndex = (activeIndex === index ? -1 : index) as number;
    setActiveIndex(newIndex);
  };
  const [events, setEvents] = useState(defaultEvent);
  const { state } = useContext(GlobalContext);
  const { _id } = state.user || { _id: '' };

  useEffect(() => {
    const fetchEvents = async () => {
      const { data }: { data: EventType[] } = await axios.get(
        `/api/events/${gameId}`
      );
      setEvents(data);
    };

    fetchEvents();
  }, []);

  const judgeAbleBetting = (event: EventType) => {
    const bettinginfo = event.responses.filter(res => res.key === _id);
    if (bettinginfo.length === 0) {
      return null;
    } else return bettinginfo[0].choice;
  };

  return (
    <div>
      <Accordion styled fluid>
        {events.map((event, key) => (
          <div key={key}>
            <Accordion.Title
              active={activeIndex === key}
              index={key}
              onClick={handleClick}
              style={{
                fontWeight: 'lighter',
                fontSize: '1.2rem',
                fontFamily: 'Jua, sans-serif'
              }}
            >
              {event[`name_${locale}`]}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === key}>
              <EventForm
                isLoggedIn={state.isLoggedIn}
                event={event}
                betAble={judgeAbleBetting(event)}
                setEvents={setEvents}
                _id={_id}
                game_type={gameId}
                playing={playing}
              />
            </Accordion.Content>
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default EventList;
