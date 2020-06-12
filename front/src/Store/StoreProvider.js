import React, { createContext } from 'react';
import { useGlobalState } from './';

export const StoreContext = createContext({});

export const StoreProvider = ({ children }) => {
	return <StoreContext.Provider value={useGlobalState()}>{children}</StoreContext.Provider>;
};
