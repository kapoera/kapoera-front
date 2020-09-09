import React, { useContext, useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import {
    Container,
    Segment,
    Grid,
    List,
    Header,
    Image
} from 'semantic-ui-react';
import styled from 'styled-components';
import Logo from '@/public/logo.png';


const StyledSegment = styled(Segment)`
    @media only screen and (max-width: 768px){
        position: absolute !important;
        bottom: -50rem !important;
    }
`;

const Footer: React.FC = () => {
    const { formatMessage: f } = useIntl();
    return (
        <StyledSegment inverted vertical color="black" style={{ margin: '10rem 0rem 0rem 0rem', padding: '2rem 0rem', position: "absolute", bottom: "-15rem", width: "100%" }}>
            <Container textAlign='center'>
                <Grid divided inverted stackable>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Organization' />
                        <List link inverted>
                            <List.Item as='a' href="https://www.facebook.com/imgeffect.kaist/">상상효과</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Game' />
                        <List link inverted>
                            <List.Item as='a'>Link One</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Development' />
                        <List horizontal link inverted>
                            <List.Item as='a' href="https://github.com/Kalogon">Kalogon</List.Item>
                            <List.Item>/</List.Item>
                            <List.Item as='a' href="https://github.com/pacokwon">Paco</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={7} verticalAlign="middle">
                        <div>
                            <div style={{ display: "inline-block" }}>
                                <Header inverted as='h4' content='Cyber Kaist-Postech Science War' />
                                <p>
                                    Welcome! Bet freely and receive prizes!
                                </p>
                            </div>
                            <Image src={Logo} size="mini" verticalAlign="middle" style={{ display: "inline", position: "relative", right: "-5rem", bottom: "1rem" }}></Image>
                        </div>
                    </Grid.Column>
                </Grid>

                {/* <Divider inverted section />
                <List horizontal inverted divided link size='small'>
                    <List.Item as='a' href='#'>
                        Site Map
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Contact Us
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Terms and Conditions
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Privacy Policy
                    </List.Item>
                </List> */}
            </Container>
        </StyledSegment >
    );
};

export default styled(Footer)`
  padding: 5px 20px !important;
`;
