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
    let accountSummary = action.data.map((el,idx)=> {
        return {id:el.company_id,name:el.account_name}
    })
    return {
        ...state,
        errors:null,
        fetching:false,
        entities:action.data,
        accountSummary:accountSummary
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