import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const GoogleIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M12 4.64c1.7 0 3.18.58 4.37 1.54l3.27-3.27C17.42 1.01 14.89 0 12 0 7.73 0 3.97 2.56 2 6.28l3.6 2.8C7 6.74 9.31 4.64 12 4.64z"
      />
      <path
        fill="#34A853"
        d="M23.49 12.27c0-.8-.07-1.57-.18-2.32H12v4.39h6.64c-.3 1.54-1.14 2.85-2.41 3.74v3.03h3.89c2.28-2.09 3.37-5.17 3.37-8.84z"
      />
      <path
        fill="#4A90E2"
        d="M5.45 14.44a7.21 7.21 0 0 1 0-4.38l-3.6-2.8A11.97 11.97 0 0 0 0 12c0 1.97.47 3.84 1.28 5.48l4.17-3.26z"
      />
      <path
        fill="#FBBC05"
        d="M12 24c3.27 0 6.01-1.08 8.02-2.92l-3.89-3.03c-1.08.72-2.45 1.17-4.13 1.17-2.69 0-5-2.1-5.55-4.82H1.28c-.82 1.64-1.28 3.51-1.28 5.48C0 20.4 4.76 24 12 24z"
      />
    </SvgIcon>
  );
};

export default GoogleIcon;
