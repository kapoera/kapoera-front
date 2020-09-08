import React, { useState } from 'react';
import { Radio, Form, Button, Progress } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { EventType } from './EventList';
import { GameStatus } from '@/components/GameCard';
import axios from '@/utils/axios';

interface BettingResponse {
    success: boolean;
}

interface AdminEventFormProps {
    isLoggedIn: boolean;
    event: EventType;
    setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
    game_type: string;
    playing: GameStatus
}

const AdminEventForm: React.FC<AdminEventFormProps> = ({
    isLoggedIn,
    event,
    setEvents,
    game_type,
    playing
}: AdminEventFormProps) => {
    const [answer, setAnswer] = useState<string | null>(null);
    const handleChange = (_, { value }) => {
        setAnswer(value);
    };
    const history = useHistory();

    const handleSubmit = async () => {
        if (isLoggedIn) {
            if (answer) {
                const {
                    data
                }: { data: BettingResponse } = await axios.post(
                    '/api/private/admin/end-event',
                    { answer: answer, key: event.key }
                );
                if (data.success) {
                    console.log(data.success)
                    setEvents(prevState => {
                        const targetEvent = prevState.filter(
                            each => each.key === event.key
                        )[0];
                        return prevState
                            .filter(each => each.key !== event.key)
                            .concat({
                                ...targetEvent,
                                answer: answer
                            });
                    });
                    setAnswer(null)
                }
            }
        } else {
            history.push('/');
        }
    };
    return (
        <Form>
            <Form.Field>
                Selected value: <b>{event.answer || answer}</b>
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
                        checked={choice === answer || choice === event.answer}
                        onChange={handleChange}
                        disabled={event.answer != null}
                        style={{ marginRight: 'auto' }}
                    />
                </Form.Field>
            ))}

            <Button
                content="Submit"
                onClick={handleSubmit}
                disabled={playing != GameStatus.Waiting || event.answer != null}
            />
        </Form>
    );
};

export default AdminEventForm;
