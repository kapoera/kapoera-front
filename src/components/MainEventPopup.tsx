import React, { useReducer } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import KaistEmblem from '@/public/kaist_emblem.png';
import PostechEmblem from '@/public/postech_emblem.png';

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
  max-width: 200px;
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

enum LogoState {
  None = 'NONE',
  Kaist = 'KAIST',
  Postech = 'POSTECH'
}

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

const initialState = {
  open: false,
  selected: LogoState.None
};

interface MainEventPopupProps {
  game_type: string;
}

const MainEventPopup: React.FC<MainEventPopupProps> = ({
  game_type
}: MainEventPopupProps) => {
  const [{ open, selected }, dispatch] = useReducer(reducer, initialState);

  return (
    <Modal
      onClose={() => dispatch({ type: MainEventAction.ToggleOpen })}
      onOpen={() => dispatch({ type: MainEventAction.ToggleOpen })}
      open={open}
      trigger={<Button>Show Popup</Button>}
    >
      <Header as="h2" className="centered">
        Who will win the AI game?
      </Header>
      <Modal.Content>
        <ModalContainer>
          <LogoGroup>
            <LogoWrapper
              checked={selected === LogoState.Kaist}
              src={KaistEmblem}
              onClick={() =>
                dispatch({
                  type: MainEventAction.SelectLogo,
                  payload: LogoState.Kaist
                })
              }
            />
            <LogoWrapper
              checked={selected === LogoState.Postech}
              src={PostechEmblem}
              onClick={() =>
                dispatch({
                  type: MainEventAction.SelectLogo,
                  payload: LogoState.Postech
                })
              }
            />
          </LogoGroup>
          <ButtonGroup>
            <Button color="vk">Submit Bet</Button>
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
