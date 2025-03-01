import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { useAuthMethod } from '@crema/hooks/AuthHooks';
import { useIntl } from 'react-intl';
import IntlMessages from '@crema/helpers/IntlMessages';
import GoogleIcon from './GooogleIcon';
import { Box } from '@mui/material';

interface GoogleButtonProps extends ButtonProps {
  fullWidth?: boolean;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ fullWidth = false, sx, ...rest }) => {
  const { signInWithGoogle } = useAuthMethod();
  const { messages } = useIntl();

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <Button
      variant="outlined"
      fullWidth={fullWidth}
      sx={{
        ...sx,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
      onClick={handleGoogleSignIn}
      {...rest}
    >
      <GoogleIcon />
      <Box component="span">
        <IntlMessages id="common.signupWithGoogle" defaultMessage="Sign up with Google" />
      </Box>
    </Button>
  );
};

export default GoogleButton;