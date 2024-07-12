import {all, takeLatest} from 'redux-saga/effects';

import {getRepoDownloadsForecastsSaga, getRepoDownloadsSaga, getRepoStargazersForecastsSaga, getRepoStargazersSaga} from './reposSaga';
import {
    getRepoDownloads,
    getRepoDownloadsForecasts,
    getRepoStargazers,
    getRepoStargazersForecasts
} from '../../reducers/repos/reposReducer';


export default function* reposRoot() {
    yield all([
        takeLatest(getRepoDownloads, getRepoDownloadsSaga),
        takeLatest(getRepoStargazers, getRepoStargazersSaga),
        takeLatest(getRepoDownloadsForecasts, getRepoDownloadsForecastsSaga),
        takeLatest(getRepoStargazersForecasts, getRepoStargazersForecastsSaga),
    ]);
}
