import React, { useReducer, useContext } from 'react';
import { Button, Header, Modal, Popup } from 'semantic-ui-react';
import styled from 'styled-components';
import KaistEmblem from '@/public/kaist_emblem.png';
import PostechEmblem from '@/public/postech_emblem.png';
import { GameStatus } from '@/components/GameCard';
import PopupButton from '@/components/PopupButton';
import { GlobalContext } from '@/context';
import { useHistory } from 'react-router-dom';
import axios from '@/utils/axios';
import { LogoState } from '@/pages/Game';

interface LogoWrapperProps {
  checked?: boolean;
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const LogoWrapper = styled.img`
  cursor: pointer;
  max-height: 150px;
  max-width: 150px;
  object-fit: contain;
  ${({ checked }: LogoWrapperProps) =>
    checked &&
    `
    border: 3px solid #32cd32;
    border-radius: 50%;
  `};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

enum MainEventAction {
  ToggleOpen = 'TOGGLE_OPEN',
  SelectLogo = 'SELECT_LOGO'
}

const reducer = (
  state: { open: boolean; selected: LogoState },
  action: { type: MainEventAction; payload?: LogoState }
) => {
  switch (action.type) {
    case MainEventAction.ToggleOpen:
      return { ...state, open: !state.open };
    case MainEventAction.SelectLogo:
      if (state.selected === LogoState.None)
        return { ...state, selected: action.payload };
      else
        return {
          ...state,
          selected:
            state.selected === action.payload ? LogoState.None : action.payload
        };
  }
};

interface MainEventPopupProps {
  currentBetting: LogoState;
  setCurrentBetting: (value: React.SetStateAction<LogoState>) => void;
  game_type: string;
  playing: GameStatus;
}

interface BettingResponse {
  success: boolean;
}
const MainEventPopup: React.FC<MainEventPopupProps> = ({
  currentBetting,
  setCurrentBetting,
  game_type,
  playing
}: MainEventPopupProps) => {
  const inititalBetting = currentBetting;
  const [{ open, selected }, dispatch] = useReducer(reducer, {
    open: false,
    selected: currentBetting
  });
  const {
    state: { isLoggedIn }
  } = useContext(GlobalContext);
  const history = useHistory();
  const bettingHandler = async () => {
    if (isLoggedIn) {
      if (selected !== LogoState.None) {
        const { data }: { data: BettingResponse } = await axios.post(
          '/api/private/bet',
          {
            game_type: game_type,
            choice: selected
          }
        );
        if (data.success) {
          setCurrentBetting(selected);
          dispatch({ type: MainEventAction.ToggleOpen });
        } else {
          dispatch({ type: MainEventAction.ToggleOpen });
        }
      }
    } else history.push('/login');
  };
  return (
    <Modal
      onClose={() => dispatch({ type: MainEventAction.ToggleOpen })}
      onOpen={() => dispatch({ type: MainEventAction.ToggleOpen })}
      open={open}
      trigger={<PopupButton disabled={playing !== GameStatus.Waiting} />}
    >
      <Header as="h2" className="centered">
        Who will win the {game_type} game?
      </Header>
      <Modal.Content>
        <ModalContainer>
          <LogoGroup>
            <LogoWrapper
              checked={
                inititalBetting === LogoState.Kaist ||
                selected === LogoState.Kaist
              }
              src={KaistEmblem}
              onClick={() => {
                if (inititalBetting === LogoState.None) {
                  dispatch({
                    type: MainEventAction.SelectLogo,
                    payload: LogoState.Kaist
                  });
                }
              }}
            />
            <LogoWrapper
              checked={
                inititalBetting === LogoState.Postech ||
                selected === LogoState.Postech
              }
              src={PostechEmblem}
              onClick={() => {
                if (inititalBetting === LogoState.None) {
                  dispatch({
                    type: MainEventAction.SelectLogo,
                    payload: LogoState.Postech
                  });
                }
              }}
            />
          </LogoGroup>
          <ButtonGroup>
            {inititalBetting === LogoState.None ? (
              <Button color="vk" onClick={bettingHandler}>
                Submit Bet
              </Button>
            ) : (
              <Popup
                trigger={
                  <span>
                    <Button color="vk" onClick={bettingHandler} disabled>
                      Submit Bet
                    </Button>
                  </span>
                }
                content="Already betted"
                basic
              />
            )}
            <Button
              onClick={() => {
                dispatch({ type: MainEventAction.ToggleOpen });
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </ModalContainer>
      </Modal.Content>
    </Modal>
  );
};

export default MainEventPopup;
