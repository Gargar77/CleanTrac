import * as actionTypes from '../actions/actionTypes';

const initialState = {
    
}

createStart = (state,action) => {
    return state;
}

createSuccess = (state,action) => {
    console.log("liked!")
    return state;
}

createStart = (state,action) => {
    return {
        ...state,
        error: action.error
    }
}

