import {all} from 'redux-saga/effects';

import reposSaga from './repos';
import organizationsSaga from './organizations';

export default function* rootSaga() {
    yield all([
        organizationsSaga(),
        reposSaga(),
    ]);
}
