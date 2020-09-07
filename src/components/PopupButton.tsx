import React from 'react';
import { Button } from 'semantic-ui-react';
import { useIntl } from 'react-intl';

interface PopupButtonProps {
  disabled: boolean;
}

const PopupButton: React.FC<PopupButtonProps> = ({
  disabled
}: PopupButtonProps) => {
  const { formatMessage: f } = useIntl();
  return (
    <Button
      circular
      color="grey"
      content={f({ id: 'betting.button' })}
      disabled={disabled}
    />
  );
};

export default PopupButton;
