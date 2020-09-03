import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Accordion, Radio, Form } from 'semantic-ui-react';
import { FormattedDate, useIntl } from 'react-intl';
import { EventType } from '@/pages/Game';

const EventList: React.FC<Array<EventType>> = ({events}: Array<EventType>) => {
  const [ activeIndex, setActiveIndex ] = useState(-1);

  const handleClick = (e, titleProps) => {
    const {index} = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
  }
  return (
    <div>
    <Accordion styled fluid style={{ position: "relative", top: "5rem" }}>
      {events.map((event, key) => (
        <div>
          <Accordion.Title active={activeIndex === key} index={key} onClick={handleClick}>
            {event.name}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === key}>
            {event.game_type}
          </Accordion.Content>
        </div>
      ))}
    </Accordion>
    </div>
  )
}

export default EventList;
