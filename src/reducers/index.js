import { ADD_LIST, DELETE_LIST } from '../constants';

const intialState = [];

const reminder = action => {
    let { text, dueDate } = action;
    return {
        //text: action.text,
        text,
        id: Math.random(),
        dueDate
    }
}

const deleteById = (state = intialState, id) => {
    const reminders = state.filter(reminder => reminder.id !== id)
    console.log('reducers/index.js - deleteById()', reminders);
    return reminders;
}


const reminders = (state = intialState, action) => {
    let reminders =  null;

    switch(action.type) {

        case ADD_LIST:
            reminders = [...state, reminder(action)];
            console.log('reducers/index.js - reminders ADD_LIST', reminders);
            return reminders;

        case DELETE_LIST:
            reminders = deleteById(state, action.id);
            console.log('reducers/index.js - reminders as DELETE_LIST', reminders);
            return reminders;

        default:
            return state;
    }

}

export default reminders;