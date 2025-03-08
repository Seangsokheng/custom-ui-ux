import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthUserType } from '@crema/types/models/AuthUser';
import jwtAxios, { setAuthToken } from './index';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';

interface JWTAuthContextProps {
  user: AuthUserType | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface SignUpProps {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
  phone: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface JWTAuthActionsProps {
  signUpUser: (data: SignUpProps) => Promise<any>;
  signInUser: (data: SignInProps) => Promise<any>;
  verifyOtp: (email: string, otp: string) => Promise<any>;
  resendOtp: (email: string) => Promise<any>;
  signInWithGoogle: () => void;
  logout: () => void;
}

const JWTAuthContext = createContext<JWTAuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
});

const JWTAuthActionsContext = createContext<JWTAuthActionsProps>({
  signUpUser: () => Promise.resolve(),
  signInUser: () => Promise.resolve(),
  verifyOtp: () => Promise.resolve(),
  resendOtp: () => Promise.resolve(),
  signInWithGoogle: () => {},
  logout: () => {},
});

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

interface JWTAuthAuthProviderProps {
  children: ReactNode;
}

const JWTAuthAuthProvider: React.FC<JWTAuthAuthProviderProps> = ({
  children,
}) => {
  const [firebaseData, setJWTAuthData] = useState<JWTAuthContextProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const infoViewActionsContext = useInfoViewActionsContext();

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);
      jwtAxios
        .get('/auth')
        .then(({ data }: { data: AuthUserType }) => {
          setJWTAuthData({
            user: data,
            isLoading: false,
            isAuthenticated: true,
          });
        })
        .catch(() =>
          setJWTAuthData({
            user: undefined,
            isLoading: false,
            isAuthenticated: false,
          }),
        );
    };

    getAuthUser();
  }, []);

  const signInUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    infoViewActionsContext.fetchStart();
    try {
      const { data } = await jwtAxios.post('auth', { email, password });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get('/auth');
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
      infoViewActionsContext.fetchSuccess();
      return data;
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      
      // Display more specific error message if available
      if ((error as any).response && (error as any).response.data && (error as any).response.data.msg) {
        infoViewActionsContext.fetchError((error as any).response.data.msg);
      } else {
        infoViewActionsContext.fetchError('Something went wrong');
      }
      
      throw error;
    }
  };

  const signUpUser = async ({
    email,
    password,
    firstname,
    lastname,
    username,
    phone,
  }: SignUpProps) => {
    infoViewActionsContext.fetchStart();
    try {
      console.log("Sending signup request with data:", { firstname, lastname, username, phone, email, password });
      
      // Make the API call to register the user with OTP requirement
      const response = await jwtAxios.post('users', { 
        firstname, 
        lastname, 
        username,
        phone, 
        email, 
        password,
        requireOtp: true // Flag to indicate OTP verification is required
      });
      
      const { data } = response;
      console.log("Signup response:", data);
      
      infoViewActionsContext.showMessage('Registration successful! Please check your email for verification code.');
      return data;
    } catch (error) {
      console.error("ERROR in signUpUser:", error);
      
      // Display more specific error message if available
      if ((error as any).response && (error as any).response.data && (error as any).response.data.msg) {
        infoViewActionsContext.fetchError((error as any).response.data.msg);
      } else {
        infoViewActionsContext.fetchError('Registration failed. Please try again.');
      }
      
      throw error;
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    infoViewActionsContext.fetchStart();
    try {
      const response = await jwtAxios.post('auth/verify-otp', { email, otp });
      const { data } = response;
      
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        setAuthToken(data.token);
        
        // Get user data after successful verification
        try {
          const res = await jwtAxios.get('/auth');
          setJWTAuthData({
            user: res.data,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (authError) {
          console.error("Error fetching user after OTP verification:", authError);
        }
      }
      
      infoViewActionsContext.showMessage('Email verification successful!');
      return data;
    } catch (error) {
      console.error("Error in verifyOtp:", error);
      
      if ((error as any).response && (error as any).response.data && (error as any).response.data.msg) {
        infoViewActionsContext.fetchError((error as any).response.data.msg);
      } else {
        infoViewActionsContext.fetchError('Verification failed. Please try again.');
      }
      
      throw error;
    }
  };

  const resendOtp = async (email: string) => {
    infoViewActionsContext.fetchStart();
    try {
      const response = await jwtAxios.post('auth/resend-otp', { email });
      infoViewActionsContext.showMessage('Verification code sent to your email');
      return response.data;
    } catch (error) {
      console.error("Error in resendOtp:", error);
      
      if ((error as any).response && (error as any).response.data && (error as any).response.data.msg) {
        infoViewActionsContext.fetchError((error as any).response.data.msg);
      } else {
        infoViewActionsContext.fetchError('Failed to resend verification code. Please try again.');
      }
      
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    infoViewActionsContext.fetchStart();
    try {
      // Redirect to Google OAuth endpoint
      // This URL should be replaced with your actual Google OAuth endpoint
      const googleAuthUrl = `${jwtAxios.defaults.baseURL}auth/google`;
      
      // Open Google sign-in in a popup
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      const popup = window.open(
        googleAuthUrl,
        'GoogleAuth',
        `width=${width},height=${height},left=${left},top=${top}`
      );
      
      // Handle the result from the popup
      window.addEventListener('message', async (event) => {
        // Make sure the message is from our expected origin
        if (event.origin !== window.location.origin) return;
        
        if (event.data && event.data.token) {
          // Handle successful authentication
          localStorage.setItem('token', event.data.token);
          setAuthToken(event.data.token);
          
          try {
            const res = await jwtAxios.get('/auth');
            setJWTAuthData({
              user: res.data,
              isAuthenticated: true,
              isLoading: false,
            });
            infoViewActionsContext.fetchSuccess();
          } catch (authError) {
            console.error("Error fetching user after Google auth:", authError);
            infoViewActionsContext.fetchError('Authentication failed after Google sign-in');
          }
          
          // Close the popup
          if (popup) popup.close();
        } else if (event.data && event.data.error) {
          infoViewActionsContext.fetchError(event.data.error);
          if (popup) popup.close();
        }
      });
      
      infoViewActionsContext.fetchSuccess();
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      infoViewActionsContext.fetchError('Google sign-in failed. Please try again.');
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          verifyOtp,
          resendOtp,
          signInWithGoogle,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};

export default JWTAuthAuthProvider;