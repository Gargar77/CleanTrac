import * as actionTypes from './actionTypes';

export const accountStart = () => {
    return {
        type:actionTypes.GET_ACCOUNTS_START
    }
}

export const accountSuccess = (accountsData) => {
    return {
        type: actionTypes.GET_ACCOUNTS_SUCCESS,
        data:accountsData
    }
}

export const accountFail = (error) => {
    return {
        type:actionTypes.GET_ACCOUNTS_FAIL,
        error: error.message
    }
}




export const fetchAccountsData = (authToken) => {
    return dispatch => {
        dispatch(accountStart());

        fetch('http://localhost:3001/api/accounts',{
            method:'GET',
            headers: {
                'Accept': 'application/json',
                'content-type':'application/json',
                'Authorization' : 'Bearer ' + authToken
            }
        })
            .then(res => res.json())
                .then(jsonRes => {
                    dispatch(accountSuccess(jsonRes))
                })
            .catch(err => dispatch(accountFail(err)))
    }
   
}




