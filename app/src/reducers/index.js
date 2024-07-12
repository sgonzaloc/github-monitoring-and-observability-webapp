import {combineReducers} from 'redux';

import repos from './repos/reposReducer';
import organizations from './organizations/organizationsReducer';

export default combineReducers({
    repos,
    organizations,
});
