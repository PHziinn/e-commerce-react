import { combineReducers } from 'redux';

import cartReducer from '../redux-actions/Cart/Slice';

const rootReducer = combineReducers({ cartReducer });

export default rootReducer;
