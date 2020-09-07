import React from 'react';
import { Button } from 'semantic-ui-react';
import { useIntl } from 'react-intl';

interface PopupButtonProps {
  disabled: boolean;
}

const PopupButton: React.FC<PopupButtonProps> = (props: PopupButtonProps) => {
  const { disabled, ...rest } = props;

  const { formatMessage: f } = useIntl();
  return (
    <Button
      circular
      color="grey"
      content={f({ id: 'betting.button' })}
      disabled={disabled}
      {...rest}
    />
  );
};

export default PopupButton;
