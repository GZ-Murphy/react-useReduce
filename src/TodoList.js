import React, { useMemo, useEffect, useCallback } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Action from './Action'
import { useTodoState, } from './TodoContextProvider';
import SelectedCount from './SelectedCount';
import axiosRequest from "./axiosRequest";
import useHttpRequest from "./useHttpRequest";
import { FETCHING, SUCCESS, ERROR } from "./useHttpRequest/actionTypes";



const TodoList = () => {
  const [states, dispatch] = useTodoState();

  const deleteTodo = (id) => {
   
    dispatch({
      type: Action.delToDo,
      payload: { id: id }
    })
  }
  const handleToggle = (id) => {
    dispatch({
      type: Action.selectToDo,
      payload: { id: id }
    })
  }


  const request = () => axiosRequest.instance.get("https://jsonplaceholder.typicode.com/photos?albumId=1");

  const onSuccess = (successResponse) => dispatch({
    type: Action.initList,
    payload: {
      response: successResponse.data
    }
  });

  const apiRequest = { request, onSuccess };
  const [{ status }, httpRequest] = useHttpRequest(apiRequest);

  useEffect(() => {
    httpRequest()
  }, [])

  const selectedCount = useCallback(() => {
    dispatch({
      type: Action.updateSelectCount,
    })

  }, [states.todos]);

  return useMemo(() => (status !== SUCCESS ? (<div>Loading...</div>) :
    (<>
      <SelectedCount handleCount={selectedCount} />
      <List>
        {states.todos.map(({ id, title, select }) => (
          <ListItem key={`photo-${id}`} dense button onClick={() => { handleToggle(id) }}>
            <Checkbox tabIndex={-1}
              disableRipple
              edge="start" checked={select}
            />
            <ListItemText primary={title} />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Delete"
                onClick={event => {
                  event.preventDefault();
                  deleteTodo(id)
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
    )
  ), [states])

}
export default TodoList;
