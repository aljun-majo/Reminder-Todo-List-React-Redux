import { ADD_LIST, DELETE_LIST, CLEAR_LISTS } from '../constants';

export const addList = (text, dueDate) => {
    const action = {
        type: ADD_LIST,
        text: text,
        dueDate: dueDate
    }
    console.log('actions/index.js - action ADD_LIST ', action)

    return action;
}

export const deleteList = id => {
    const action = {
        type: DELETE_LIST,
        id: id
    }
    console.log('actions/index.js - action DELETE_LIST ', action)

    return action;
}

export const clearList = () => {
    return {
        type: CLEAR_LISTS
    }
}