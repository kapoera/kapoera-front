import React from 'react';
import { Button } from 'semantic-ui-react';
import { useIntl } from 'react-intl';

const PopupButton = ({ ...rest }) => {
    const { formatMessage: f } = useIntl();
    return (
        <Button circular color="grey" style={{ margin: "0 auto", width: "25%" }} content={f({ id: 'betting.button' })} {...rest}>
        </Button>
    )
}

export default PopupButton;