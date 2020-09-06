import React from 'react';
import { Button } from 'semantic-ui-react';
import { useIntl } from 'react-intl';
import axios from '@/utils/axios';

const GameBettingEnd = ({ game_type }) => {
    const { formatMessage: f } = useIntl();
    return (
        <Button
            circular
            color="grey"
            content={f({ id: 'betting.end' })}
        ></Button>
    );
};

export default GameBettingEnd;

