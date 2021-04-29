import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env'

function userLoggedIn(username) {   // this function gets passed to the dispatcher
    return {
        type: actionTypes.USER_LOGGEDIN,
        username: username
    }
}

function logout() {             // also gets passsed to the dispatcher
    return {
        type: actionTypes.USER_LOGOUT
    }
}

export function submitLogin(data) {
    const env = runtimeEnv();                               // pull the env from the runtimeEnv
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/signin`, {       // this will call the api to login
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'

        }).then((response) => {                                 // once the fetch is done we will get a response from the API
            if (!response.ok) {                                 // check if the response is okay
                throw Error(response.statusText);               // if it is not ok then throw the error
            }
            return response.json()                              // else just return the respone.json()

        }).then((res) => {                                      // once the first then iss complete then we will have another res
            localStorage.setItem('username', data.username);    // set the username to local storage
            localStorage.setItem('token', res.token);           // set the token to local storage

            dispatch(userLoggedIn(data.username));              // dispatch the user name with the uer
        }).catch((e) => console.log(e));                        // log the error if it fails
    }
}

export function submitRegister(data) {
    const env = runtimeEnv();                                   // pull the .env from runtimeEnv
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/signup`, {       // will call the api to sign up
            method: 'POST',                                     // will be a post method
            headers: {                                          // headers we pass to the api
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),                         // body we pass (data)
            mode: 'cors'

        }).then((response) => {                                 // check if the response is ok                              
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()

        }).then((res) => {
            dispatch(submitLogin(data));
        }).catch((e) => console.log(e));
    }
}

export function logoutUser() {                                  // if the user wants to log out
    return dispatch => {
        localStorage.removeItem('username');                    // remove the username from the local storage
        localStorage.removeItem('token');                       // remove the token from the local storage
        dispatch(logout())                                      // dispatch to logout()
    }
}