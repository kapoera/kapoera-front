import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import config from '@/config';
import axios from '@/utils/axios';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Container, Grid, Transition } from 'semantic-ui-react';
import { GameCard, GameCardProps } from '@/components/GameCard';

const MainHeader = styled.div`
  font-size: calc(2rem + 2.5vmin);
  margin-left: 30px;
`;

const Admin: React.FC = () => {
    const [gamesData, setGamesData] = useState([]);
    const { formatMessage: f } = useIntl();
    const history = useHistory();

    const clickEventInAdmin = (game_type) => {
        history.push(`/admin/${game_type}`);
    }

    useEffect(() => {
        const fetchGames = async () => {
            const { data }: { data: GameCardProps[] } = await axios.get('/api/games');
            setGamesData(data);
        };

        fetchGames();
    }, []);

    return (
        <Container>
            <div style={{ marginTop: '80px', marginBottom: '60px' }}>
                <MainHeader>{f({ id: 'main.games' })}</MainHeader>
                <Grid columns={3} doubling stackable style={{ marginTop: '1vmin' }}>
                    {gamesData.map(data => (
                        <Transition key={data.game_type} transitionOnMount duration={500}>
                            <Grid.Column>
                                <GameCard {...data} clickEvent={clickEventInAdmin} />
                            </Grid.Column>
                        </Transition>
                    ))}
                </Grid>
            </div>
        </Container>
    );
};

export default Admin;
