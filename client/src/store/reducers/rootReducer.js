import { combineReducers } from 'redux';
import AuthReducer from './auth';
import AccountsReducer from './accountsReducer';
import UserReducer from './userReducer';


const rootReducer = combineReducers({
    auth:AuthReducer,
    accounts:AccountsReducer,
    user: UserReducer
})

export default rootReducer;