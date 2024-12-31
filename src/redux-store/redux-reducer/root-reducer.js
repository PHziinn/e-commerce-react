import { combineReducers } from 'redux';

import UsersReducer from '../redux-actions/Users/usuariosSlice';

const rootReducer = combineReducers({ usuarios: UsersReducer });

export default rootReducer;
