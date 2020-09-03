import React, { useState, useContext, useEffect } from 'react';
import { Radio, Form, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '@/context';
import { EventType } from '@/pages/Game';
import axios from '@/utils/axios';

interface BettingResponse {
  success: boolean;
}

const EventForm: React.FC<EventType> = ({event, mail}) => {
  const [ eventChoice, setEventChoice ] = useState<string | null>(null)
  const handleChange = (e, {value}) => setEventChoice(value)
  const history = useHistory();
  const [ ableBetted, setAbleBetted ] = useState<boolean>(false)

  useEffect(()=>{
      console.log(mail)
      console.log(event.key)
      console.log(event.responses)
      const betinfo = event.responses.filter(res=>res.key === mail)
      console.log(betinfo)
      if(betinfo.length === 0){
        setAbleBetted(true)
      }
      else{
        setAbleBetted(false)
        setEventChoice(betinfo[0].choice)
      }
  }, [])


  const handleSubmit = async() => {
    if(state.isLoggedIn){
      if(eventChoice){
        console.log(eventChoice)
          const {data}: {data: BettingResponse} = await axios.post (
           '/api/private/betevent',
           {key: event.key, choice: eventChoice}
          )
          if(data.success){
            console.log(data.success)
            setAbleBetted(false)
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

      <Button content='Submit' onClick={handleSubmit} disabled={ableBetted === false}/>
    </Form>
  )
}

export default EventForm
