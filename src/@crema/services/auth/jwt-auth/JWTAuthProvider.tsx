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
console.log("JWTAuthProvider loaded!");
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
  signUpUser: (data: SignUpProps) => void; // Changed to return Promise
  signInUser: (data: SignInProps) => void; // Changed to return Promise
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
    console.log("signin");
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
      infoViewActionsContext.fetchError('Something went wrong');
      throw error; // Re-throw for proper error handling in component
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
    console.log(email, password, firstname, lastname, username, phone);
    try {
      console.log("1. Preparing data:", { firstname, lastname, username, phone, email, password });
      
      // Log the API endpoint
      console.log("2. Sending request to:", jwtAxios.defaults.baseURL + 'users');
      
      // Make the API call to register the user
      console.log("3. Sending POST request...");
      const response = await jwtAxios.post('users', { 
        firstname, 
        lastname, 
        username,
        phone, 
        email, 
        password 
      });
      
      console.log("4. Raw response:", response);
      const { data } = response;
      console.log("5. Response data:", data);
      
      // Check if there's a token in the response
      console.log("6. Token present:", data && data.token ? "Yes" : "No");
      
      if (data && data.token) {
        console.log("7. Setting token in localStorage");
        localStorage.setItem('token', data.token);
        setAuthToken(data.token);
        
        // Get user data
        console.log("8. Fetching user data");
        try {
          const res = await jwtAxios.get('/auth');
          console.log("9. User data response:", res.data);
          setJWTAuthData({
            user: res.data,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (authError) {
          console.error("10. Error fetching user after signup:", authError);
          // Even if getting the user fails, the registration was successful
        }
      } else {
        console.log("7. No token found in response");
      }
      
      console.log("11. Signup process completed successfully");
      infoViewActionsContext.fetchSuccess();
      return data; // Make sure to return the data
    } catch (error) {
      console.error("ERROR in signUpUser:", error);
      console.log("Network error status:", (error as any).response ? (error as any).response.status : "No response");
      console.log("Network error data:", ( error as any).response ? (error as any).response.data : "No data");
      
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      
      // Display more specific error message if available
      if ((error as any).response && (error as any).response.data && (error as any).response.data.msg) {
        infoViewActionsContext.fetchError((error as any).response.data.msg);
      } else {
        infoViewActionsContext.fetchError('Registration failed. Please try again.');
      }
      
      throw error; // Re-throw for proper error handling in component
    } finally {
      console.log("=== SIGNUP PROCESS ENDED ===");
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
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;