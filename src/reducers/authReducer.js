import constants from '../constants/actionTypes'

let initialState = {
    loggedIn: localStorage.getItem('token') ? true : false,
    username: localStorage.getItem('username') ? localStorage.getItem('username') : ''
}

const authReducer = (state = initialState, action) => {

    var updated = Object.assign({}, state);

    switch (action.type) {
        case constants.USER_LOGGEDIN:               // if the userLoggedIn
            updated['loggedIn'] = true;             // set loggedIn to true
            updated['username'] = action.username;  // set the username to the action.username
            return updated;

        case constants.USER_LOGOUT:         // if the userLogged out
            updated['loggedIn'] = false;    // set loggedin to false
            updated['username'] = '';       // set username to blank
            return updated;

        default:                // nothing happened
            return state;
    }
}

export default authReducer