import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserInfo {
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  waterRequirement: number;
  mode: 'auto' | 'custom';
}

interface UserContextType {
  user: UserInfo | null;
    isLoadingUser: boolean;
  setUser: (user: UserInfo) => void;

  resetUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<UserInfo | null>(null);
   const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  useEffect(() => {
    const loadUserData = async () => {
      try{const json = await AsyncStorage.getItem('UserData');
      if (json) {
        setUserState(JSON.parse(json));
      }}
      catch(error){
        console.log(error);
      }finally{
        setIsLoadingUser(false);
      }
    };
    loadUserData();
  }, []);

  const setUser = async (data: UserInfo) => {
    try{
    await AsyncStorage.setItem('UserData', JSON.stringify(data));
    setUserState(data);
    }catch(error){
      console.log(error);
    }
  };

  const resetUser = async () => {
    try{
    await AsyncStorage.removeItem('UserData');
    setUserState(null);
    }catch(error){
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoadingUser,setUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
