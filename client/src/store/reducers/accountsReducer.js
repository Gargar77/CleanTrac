import { accountFail } from '../actions/accounts';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
   fetching:false,
   errors:null
}

const accountStart = (state,action) => {
    return {
        ...state,
        fetching:true
    }
}

const accountSuccess = (state,action) => {
    return {
        ...state,
        errors:null,
        fetching:false,
        entities:action.data
    }
}

const accountFail = (state,action) => {

    return {
        ...state,
        error:action.error,
        fetching:false
    };
}

const reducer = (state = initialState,action) => {
    switch (action.type) {
        case actionTypes.GET_ACCOUNTS_START: return accountStart(state,action);
        case actionTypes.GET_ACCOUNTS_SUCCESS: return accountSuccess(state,action);
        case actionTypes.GET_ACCOUNTS_FAIL: return accountFail(state,action);
        default: return state;
    }
}

export default reducer;