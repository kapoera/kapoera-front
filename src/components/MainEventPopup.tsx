import React, { useContext, useReducer, useState } from 'react';
import { Button, Header, Icon, Modal, Popup } from 'semantic-ui-react';
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

interface BettingResponse {
  success: boolean;
}

interface ConfirmModalProps {
  handleBetSubmit: () => Promise<void>;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  handleBetSubmit
}: ConfirmModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Modal
      size="small"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="vk">Submit Bet</Button>}
    >
      <Modal.Content style={{ fontSize: 'calc(0.8rem + 1vmin)' }}>
        You cannot undo this action. Proceed?
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button
          color="vk"
          onClick={() => {
            setOpen(false);
            handleBetSubmit();
          }}
        >
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

interface MainEventPopupProps {
  currentBetting: LogoState;
  setCurrentBetting: (value: React.SetStateAction<LogoState>) => void;
  game_type: string;
  playing: GameStatus;
}

const MainEventPopup: React.FC<MainEventPopupProps> = ({
  currentBetting,
  setCurrentBetting,
  game_type,
  playing
}: MainEventPopupProps) => {
  const history = useHistory();
  const {
    state: { isLoggedIn }
  } = useContext(GlobalContext);

  const [{ open, selected }, dispatch] = useReducer(reducer, {
    open: false,
    selected: currentBetting
  });

  const handleBetSubmit = async () => {
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

  const betEnabled =
    isLoggedIn &&
    currentBetting === LogoState.None &&
    selected !== LogoState.None;

  const betDisabledMessage = !isLoggedIn
    ? 'Sign in to bet!'
    : currentBetting !== LogoState.None
    ? 'You already bet!'
    : 'Select a side!';

  return (
    <Modal
      onClose={() => dispatch({ type: MainEventAction.ToggleOpen })}
      onOpen={() => dispatch({ type: MainEventAction.ToggleOpen })}
      open={open}
      trigger={
        <Popup
          disabled={playing === GameStatus.Waiting}
          content="Game has already started or finished"
          trigger={
            <div onClick={() => dispatch({ type: MainEventAction.ToggleOpen })}>
              <PopupButton disabled={playing !== GameStatus.Waiting} />
            </div>
          }
        />
      }
    >
      <Header as="h2" className="centered">
        Who will win the {game_type} game?
      </Header>
      <Modal.Content>
        <ModalContainer>
          <LogoGroup>
            <LogoWrapper
              checked={
                currentBetting === LogoState.Kaist ||
                selected === LogoState.Kaist
              }
              src={KaistEmblem}
              onClick={() => {
                if (currentBetting === LogoState.None) {
                  dispatch({
                    type: MainEventAction.SelectLogo,
                    payload: LogoState.Kaist
                  });
                }
              }}
            />
            <LogoWrapper
              checked={
                currentBetting === LogoState.Postech ||
                selected === LogoState.Postech
              }
              src={PostechEmblem}
              onClick={() => {
                if (currentBetting === LogoState.None) {
                  dispatch({
                    type: MainEventAction.SelectLogo,
                    payload: LogoState.Postech
                  });
                }
              }}
            />
          </LogoGroup>
          <ButtonGroup>
            <Button
              onClick={() => {
                dispatch({ type: MainEventAction.ToggleOpen });
              }}
            >
              Cancel
            </Button>
            {betEnabled ? (
              <ConfirmModal handleBetSubmit={handleBetSubmit} />
            ) : (
              <Popup
                position="top center"
                trigger={
                  <span>
                    <Button color="vk" onClick={handleBetSubmit} disabled>
                      Submit Bet
                    </Button>
                  </span>
                }
                content={betDisabledMessage}
                basic
              />
            )}
          </ButtonGroup>
        </ModalContainer>
      </Modal.Content>
    </Modal>
  );
};

export default MainEventPopup;
