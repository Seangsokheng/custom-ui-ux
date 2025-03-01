// import React, { ReactNode } from 'react';
// import FirebaseAuthProvider from '@crema/services/auth/firebase/FirebaseAuthProvider';

// type Props = {
//   children: ReactNode;
// };

// const AppAuthProvider = ({ children }: Props) => {
//   return <FirebaseAuthProvider>{children}</FirebaseAuthProvider>;
// };

// export default AppAuthProvider;
import React, { ReactNode } from 'react';
import JWTAuthAuthProvider from '@crema/services/auth/jwt-auth/JWTAuthProvider';

type Props = {
  children: ReactNode;
};

const AppAuthProvider = ({ children }: Props) => {
  return <JWTAuthAuthProvider>{children}</JWTAuthAuthProvider>;
};

export default AppAuthProvider;