import React, { useState, useContext, useEffect } from 'react';
import { Accordion, AccordionTitleProps } from 'semantic-ui-react';
import EventForm from '@/components/EventForm';
import { GlobalContext } from '@/context';
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
  name: string;
  key: number;
}

interface EventListProps {
  isAdmin: boolean;
  gameId: string;
}

const defaultEvent: EventType[] = [
  {
    game_type: 'default',
    answer: 'a',
    choices: [],
    responses: [],
    name: 'default',
    key: -1
  }
];

const EventList: React.FC<EventListProps> = ({ gameId }: EventListProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
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
            >
              {event.name}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === key}>
              <EventForm
                isLoggedIn={state.isLoggedIn}
                event={event}
                betAble={judgeAbleBetting(event)}
                setEvents={setEvents}
                _id={_id}
                game_type={gameId}
              />
            </Accordion.Content>
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default EventList;
