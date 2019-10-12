import React, { useReducer, useContext } from 'react';
import ReactDOM from 'react-dom';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import reducer from './useTodoReducer';
import TodoAction from './Action';
import { TodoContextProvider } from './TodoContextProvider';
import './styles.scss';



const App = () => {
  return (
    <TodoContextProvider>
      <TodoForm />
      <TodoList />
    </TodoContextProvider>

  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

