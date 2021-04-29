import constants from '../constants/actionTypes'

let initialState = {
    foods: [],
    selectedFood : null
}


const foodReducer = (state = initialState, action) => {
    let updated = Object.assign({},state)

    switch(action.type){
        case constants.FETCH_FOODS:
            updated['foods'] = action.foods
            updated['selectedFood'] = action.foods[0]
            return updated
        case constants.SET_FOOD:
            updated['selectedFood'] = action.selectedFood
            return updated
        case constants.FETCH_FOOD:
            updated['selectedFood'] = action.selectedFood
            return updated

        default:
            return state
    }
}


export default foodReducer