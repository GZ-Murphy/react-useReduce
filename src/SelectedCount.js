import React,{useEffect} from 'react';
import { useTodoState, } from './TodoContextProvider';


const SelectedCount = ({handleCount}) =>{
    const [states] = useTodoState();
    useEffect(() => {
        handleCount();
    }, [handleCount]);

    return (<div>Count:{states.selectedCount}</div>)
}
export default SelectedCount;