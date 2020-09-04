import React, { useState, useContext, useEffect } from 'react';
import { Radio, Form, Button, Progress } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '@/context';
import { EventType } from '@/pages/Game';
import axios from '@/utils/axios';

interface BettingResponse {
  success: boolean;
}

const EventForm: React.FC<EventType> = ({isLoggedIn, event, betAble, setEvents, mail}) => {
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
            setEvents((prevState)=>{
              const targetEvent = prevState.filter(each => each.key === event.key)[0]
              return prevState.filter(each => each.key !== event.key).concat({ ...targetEvent, responses: targetEvent.responses.concat({ choice: eventChoice, key: mail }) })
            })
          }
          else{
            console.log(data.success)
          }
      }
      else console.log(eventChoice)
    }
    else history.push('/')
  }

  const calculatePercent = (choice) => {
    const denom: float = event.responses.length.toFixed()
    const numer = event.responses.filter(res => res.choice === choice).length.toFixed()
    return numer / denom * 100
  }
  return (
    <Form>
      <Form.Field>
        Selected value: <b>{betAble || eventChoice}</b>
      </Form.Field>
      {event.choices.map((choice, key) => (
        <Form.Field key={key} style={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
          <Radio
            label={choice}
            value={choice}
            name='radioGroup'
            checked={ choice === eventChoice || choice === betAble }
            onChange={handleChange}
            disabled={ betAble != null }
            style={{ marginRight: "auto" }}
          />
          <Progress percent={calculatePercent(choice)} indicating style={{ width: "60%", margin: "0.2rem 1rem", justifySelf: "flex-end" }}></Progress>
        </Form.Field>
      ))}

      <Button content='Submit' onClick={handleSubmit} disabled={betAble != null}/>
    </Form>
  )
}

export default EventForm
