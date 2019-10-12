import React,{useReducer, useContext,createContext} from 'react';
import reducer from './useTodoReducer';


const initialState = {
  todos:[]
};
export const TodoContext = createContext({});

export const TodoContextProvider = ({ children }) => {
  const contextValue = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};


export const useTodoState =  () => {
  return useContext(TodoContext);
};

