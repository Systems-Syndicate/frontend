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
}

interface ApiProviderProps {
  children: ReactNode; // Properly typing the children prop
}

const ApiContext = createContext<ApiContextProps>({
  isOn: false,
  loggedIn: false,
  setLoggedIn: () => {},
});

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Simulate polling an API for `isOn` state
  useEffect(() => {
    const intervalId = setInterval(async () => {
      // Simulate fetching status from API
      const response = await fetch("http://localhost:3801/active");
      const data = await response.json();
      setIsOn(data.isOn);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isOn) {
      setLoggedIn(false); // Reset loggedIn to false when isOn is false
    }
  }, [isOn]);

  return (
    <ApiContext.Provider value={{ isOn, loggedIn, setLoggedIn }}>
      {children}
    </ApiContext.Provider>
  );
};

// Hook to use the ApiContext values
export const useApi = () => useContext(ApiContext);
