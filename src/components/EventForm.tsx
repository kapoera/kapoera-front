import React, { useState, useContext } from 'react';
import { Radio, Form, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '@/context';
import { EventType } from '@/pages/Game';

const EventForm: React.FC<EventType> = ({event}: EventType) => {
  const [ eventChoice, setEventChoice ] = useState<string | null>(null)
  const handleChange = (e, {value}) => setEventChoice(value)
  const history = useHistory();

  const {
    state: {isLoggedIn}
  } = useContext (GlobalContext)
  const handleSubmit = () => {
    if(isLoggedIn){
      if(eventChoice){
        console.log(eventChoice)
      }
      else console.log(eventChoice)
    }
    else history.push('/')
  }
  return (
    <Form>
      <Form.Field>
        Selected value: <b>{eventChoice}</b>
      </Form.Field>
      {event.choices.map(choice => (
        <Form.Field>
          <Radio
            label={choice}
            value={choice}
            name='radioGroup'
            checked={ eventChoice === choice }
            onChange={handleChange}
          />
        </Form.Field>
      ))}

      <Button content='Submit' onClick={handleSubmit}/>
    </Form>
  )
}

export default EventForm
