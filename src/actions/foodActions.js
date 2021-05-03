import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env'


export const CartArray = []

export const cartTotal = [0]

function foodsFetched(foods) {
    return {
        type: actionTypes.FETCH_FOODS,
        foods: foods
    }
}

function foodFetched(food) {
    return {
        type: actionTypes.FETCH_FOOD,
        selectedFood: food
    }
}

function foodSet(food) {
    CartArray.push(food)
    console.log(CartArray)
    return {
        type: actionTypes.SET_FOOD,
        selectedFood: food
    }
}

export function setFood(food) {
    return dispatch => {                // dispatch will send it to the store with (foodSet(food)) as parameter
        dispatch(foodSet(food));
    }
}

export function fetchFood(foodId) {                         // fetch single food with either foodId or food name CHANGE LATER
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/Group5/${foodId}`, {
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
            dispatch(foodFetched(res));
        }).catch((e) => console.log(e));
    }
}

export function fetchFoods() {                          // fetch multiple foods
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/Group5`, {
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
            dispatch(foodsFetched(res));
        }).catch((e) => console.log(e));
    }
}
