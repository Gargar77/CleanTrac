import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token:null,
    error:null,
    loading:false,
    authRedirectPath:'/home'
}

const authStart = (state,action) => {
    return {
        ...state,
        error:null,
        loading:true
    }
}

const authSuccess = (state,action) => {
    return {
        ...state,
        token: action.idToken,
        error:null,
        loading:false
    };
}

const authFail = (state,action) => {

    return {
        ...state,
        error:action.error,
        loading:false
    };
}

const authLogout = (state,action) => {
    return {
        ...state,
        token:null,
        loading:false
    }
}
const clearError = (state,action) => {
    return {
        ...state,
        error:null
    }
}

const reducer = (state = initialState,action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        case actionTypes.ERROR_CLEAR: return clearError(state,action);
        default: return state;
    }
}

export default reducer;