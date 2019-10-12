import TodoAction from './Action';
import produce, { applyPatches } from 'immer';



const reducer = (state, action) => {
  state = applyPatches(state, []);
  return produce(state, draft => {
    switch (action.type) {
      case TodoAction.addToDo:
        draft.todos.push(action.payload);
        break;
      case TodoAction.delToDo:
        draft.todos = draft.todos.filter(td => td.id !== action.payload.id);
        break;
      case TodoAction.initList:
        if (action.payload.response) {
          for (const item of action.payload.response) {
            item.select = item.select !== undefined ? item.select : false;
            draft.todos.push(item);
          }
        }
        break;
      case TodoAction.updateSelectCount:
        draft.selectedCount = draft.todos.filter(td => td.select).length;
        break;
      case TodoAction.selectToDo:
        const item = draft.todos.find(td => td.id === action.payload.id);
        item.select = !item.select;
        break
      default:
        throw new Error();
    }
  },
    (patches) => {
      // const current = patches.filter(patch => patch.op === 'replace');
      console.log(patches)
    });
}



export default reducer;