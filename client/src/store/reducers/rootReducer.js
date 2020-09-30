import { combineReducers } from 'redux';
import AuthReducer from './auth';
import AccountsReducer from './accountsReducer';


const rootReducer = combineReducers({
    auth:AuthReducer,
    accounts:AccountsReducer
})

export default rootReducer;