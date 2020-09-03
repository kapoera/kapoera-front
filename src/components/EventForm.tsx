import React, { useState, useContext, useEffect } from 'react';
import { Radio, Form, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '@/context';
import { EventType } from '@/pages/Game';
import axios from '@/utils/axios';

interface BettingResponse {
  success: boolean;
}

const EventForm: React.FC<EventType> = ({isLoggedIn, event, betAble}) => {
  const [ eventChoice, setEventChoice ] = useState<string | null>(betAble)

  const handleChange = (e, {value}) => { setEventChoice(value) }
  const history = useHistory();
  //console.log(betAble)
  const handleSubmit = async() => {
    if(isLoggedIn){
      if(eventChoice){
        console.log(eventChoice)
          const {data}: {data: BettingResponse} = await axios.post (
           '/api/private/betevent',
           {key: event.key, choice: eventChoice}
          )
          if(data.success){
            console.log(data.success)
            history.go(0)
          }
          else{
            console.log(data.success)
          }
      }
      else console.log(eventChoice)
    }
    else history.push('/')
  }
  return (
    <Form>
      <Form.Field>
        Selected value: <b>{betAble || eventChoice}</b>
      </Form.Field>
      {event.choices.map((choice, key) => (
        <Form.Field key={key}>
          <Radio
            label={choice}
            value={choice}
            name='radioGroup'
            checked={ choice === eventChoice || choice === betAble }
            onChange={handleChange}
            disabled={ betAble != null }
          />
        </Form.Field>
      ))}

      <Button content='Submit' onClick={handleSubmit} disabled={betAble != null}/>
    </Form>
  )
}

export default EventForm
