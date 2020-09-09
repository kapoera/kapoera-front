import React, { useContext, useReducer, useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Button, Header, Icon, Modal, Popup } from 'semantic-ui-react';
import styled from 'styled-components';
import { GameStatus } from '@/components/GameCard';
import PopupButton from '@/components/PopupButton';
import { GlobalContext } from '@/context';
import { LogoState } from '@/pages/Game';
import KaistEmblem from '@/public/kaist_emblem.png';
import PostechEmblem from '@/public/postech_emblem.png';
import axios from '@/utils/axios';

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
  const { formatMessage: f } = useIntl();

  return (
    <Modal
      size="small"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="vk">{f({ id: 'mainpopup.submitbet' })}</Button>}
    >
      <Modal.Content style={{ fontSize: 'calc(0.8rem + 1vmin)' }}>
        {f({ id: 'mainpopup.betwarning' })}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>
          <Icon name="remove" /> {f({ id: 'cancel' })}
        </Button>
        <Button
          color="vk"
          onClick={() => {
            setOpen(false);
            handleBetSubmit();
          }}
        >
          <Icon name="checkmark" /> {f({ id: 'yes' })}
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
  dividend: number;
  bets: [number, number];
}

const MainEventPopup: React.FC<MainEventPopupProps> = ({
  currentBetting,
  setCurrentBetting,
  game_type,
  playing,
  dividend,
  bets
}: MainEventPopupProps) => {
  const history = useHistory();
  const { formatMessage: f } = useIntl();

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
    ? f({ id: 'mainpopup.signintobet' })
    : currentBetting !== LogoState.None
    ? f({ id: 'mainpopup.alreadybet' })
    : f({ id: 'mainpopup.selectaside' });

  return (
    <Modal
      onClose={() => dispatch({ type: MainEventAction.ToggleOpen })}
      onOpen={() => dispatch({ type: MainEventAction.ToggleOpen })}
      open={open}
      trigger={
        <Popup
          disabled={playing === GameStatus.Waiting}
          content={f({ id: 'game.not_waiting' })}
          trigger={
            <div
              onClick={() => {
                if (playing === GameStatus.Waiting)
                  dispatch({ type: MainEventAction.ToggleOpen });
              }}
            >
              <PopupButton disabled={playing !== GameStatus.Waiting} />
            </div>
          }
        />
      }
    >
      <Header as="h2" className="centered">
        {f(
          { id: 'mainpopup.header' },
          { game_type: f({ id: `game.${game_type}` }) }
        )}
      </Header>
      <Modal.Content>
        <ModalContainer>
          <LogoGroup>
            <div>
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
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {f({ id: 'game.winning' })}:{' '}
                {Math.round(dividend / (bets[0] + 1))}
              </div>
            </div>
            <div>
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
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {f({ id: 'game.winning' })}:{' '}
                {Math.round(dividend / (bets[1] + 1))}
              </div>
            </div>
          </LogoGroup>
          <ButtonGroup>
            <Button
              onClick={() => {
                dispatch({ type: MainEventAction.ToggleOpen });
              }}
            >
              {f({ id: 'cancel' })}
            </Button>
            {betEnabled ? (
              <ConfirmModal handleBetSubmit={handleBetSubmit} />
            ) : (
              <Popup
                position="top center"
                trigger={
                  <span>
                    <Button color="vk" onClick={handleBetSubmit} disabled>
                      {f({ id: 'mainpopup.submitbet' })}
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
