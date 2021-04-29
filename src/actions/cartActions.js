import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env'

function charitiesFetched(charities) {
    return {
        type: actionTypes.FETCH_CHARITIES,
        charities: charities
    }
}

function charityFetched(Charity) {
    return {
        type: actionTypes.FETCH_CHARITY,
        selectedCharity: Charity
    }
}

export function fetchCharity(charityID) {                         // fetch single charity with either charityId
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/charities/${charityID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(charityFetched(res));
        }).catch((e) => console.log(e));
    }
}

export function fetchCharities() {                          // fetch multiple foods
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/charities`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(charitiesFetched(res));
        }).catch((e) => console.log(e));
    }
}