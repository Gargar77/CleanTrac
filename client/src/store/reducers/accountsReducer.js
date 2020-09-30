import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userId:null,
    firstName:null,
    lastName:null,
    role:null,
    email:null,
    phone:null,
    leaderId:null
}

const loadUser = (state,action) => {
    return {
        userId:action.data.userId,
    firstName:action.data.firstName,
    lastName:action.data.lastName,
    role:action.data.role,
    email:action.data.email,
    phone:action.data.phone,
    leaderId:action.data.leaderId
    }
}


const reducer = (state = initialState,action) => {
    switch (action.type) {
        case actionTypes.LOAD_USER_DATA: return loadUser(state,action);
        default: return state;
    }
}

export default reducer;