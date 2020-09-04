import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Accordion, Radio, Form } from 'semantic-ui-react';
import { FormattedDate, useIntl } from 'react-intl';
import { EventType } from '@/pages/Game';
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

const defaultEvent: Array<EventType> = [
  {
    game_type: 'default',
    answer: 'a',
    choices: [],
    responses: [],
    name: 'default',
    key: -1
  }
];

const EventList: React.FC<EventType> = ({ gameId }: EventType) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [userMail, setUserMail] = useState('');
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };
  const [events, setEvents] = useState(defaultEvent);

  const { state, dispatch } = useContext(GlobalContext);
  const { mail } = state.user || { mail: '' };
  useEffect(() => {
    setUserMail(mail);
  }, [mail]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data }: { data: Array<EventType> } = await axios.get(
        '/api/events/' + gameId
      );
      console.log(data);
      setEvents(data);
    };

    fetchEvents();
  }, []);

  const judgeAbleBetting = event => {
    const bettinginfo = event.responses.filter(res => res.key === mail);
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
                mail={mail}
              ></EventForm>
            </Accordion.Content>
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default EventList;
