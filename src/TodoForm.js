import React,{useState , useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import {useTodoState}  from './TodoContextProvider'
import Action from './Action'
import { newGuid } from 'ts-guid/dist';


const TodoForm = () => {

  const [state,dispatch]= useTodoState();
  const [value,setValue]=useState('');
  

  const addTodo =(event)=>{
    event.preventDefault();
    dispatch({
      type:Action.addToDo,
      payload:{
        guid: newGuid() ,
        value:value,
        select:false
      }
    })
  }
  useEffect(() => {
    setValue(''); 
  },[state.todos]);

  const onChange = (event)=>{
    setValue(event.target.value); 
  }
  return (
    <form onSubmit={e=>addTodo(e)} >
      <TextField
        variant="outlined"
        placeholder="Add"
        margin="normal"
        onChange={onChange}
        value={value}
      />
    </form>
  );
};

export default TodoForm;
