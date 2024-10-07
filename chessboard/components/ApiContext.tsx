import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the context and its provider
interface ApiContextProps {
  isOn: boolean;
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  setIsOn: (value: boolean) => void;
}

interface ApiProviderProps {
  children: ReactNode; // Properly typing the children prop
}

const ApiContext = createContext<ApiContextProps>({
  isOn: false,
  loggedIn: false,
  setLoggedIn: () => {},
  setIsOn: () => {},
});

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Simulate polling an API for `isOn` state
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        // Simulate fetching status from API
        const response = await fetch("http://localhost:3801/active");

        const data = await response.json();
        setIsOn(data.isOn);
      } catch (error) {
        // Set `isOn` to false if the fetch fails, so no error appears in the app
        setIsOn(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ApiContext.Provider value={{ isOn, loggedIn, setLoggedIn, setIsOn }}>
      {children}
    </ApiContext.Provider>
  );
};

// Hook to use the ApiContext values
export const useApi = () => useContext(ApiContext);
