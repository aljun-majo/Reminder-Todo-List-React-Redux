import { ADD_LIST, DELETE_LIST, CLEAR_LISTS } from '../constants';

//cookies
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

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

    //cookies
    state = read_cookie('reminders');

    switch(action.type) {

        case ADD_LIST:
            reminders = [...state, reminder(action)];
            console.log('reducers/index.js - reminders ADD_LIST', reminders);
            bake_cookie('reminders', reminders);
            return reminders;

        case DELETE_LIST:
            reminders = deleteById(state, action.id);
            console.log('reducers/index.js - reminders as DELETE_LIST', reminders);
            bake_cookie('reminders', reminders);
            //delete_cookie('reminders');//won't work
            return reminders;

        case CLEAR_LISTS:
            reminders = [];//set as empty array
            //set also cookie
            bake_cookie('reminders', reminders)
            return reminders;

        default:
            return state;
    }

}

export default reminders;