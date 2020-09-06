import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedDate, useIntl } from 'react-intl';
import { Grid, Image, Label, Progress, Segment } from 'semantic-ui-react';
import io from 'socket.io-client';
import styled from 'styled-components';
import { GameCardProps, University, GameStatus } from '@/components/GameCard';
import EventList from '@/components/EventList';
import MainEventPopup from '@/components/MainEventPopup';
import config from '@/config';
import KaistLogo from '@/public/kaist.png';
import PostechLogo from '@/public/postech.png';
import { GlobalContext } from '@/context';
import axios from '@/utils/axios';

const AdminGame: React.FC = () => {
    return (
        <div>hello</div>
    )
}

export default AdminGame;