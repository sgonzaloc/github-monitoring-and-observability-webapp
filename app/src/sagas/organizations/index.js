import {all, takeLatest} from 'redux-saga/effects';

import {
    getOrganizationDownloadsForecastsSaga,
    getOrganizationDownloadsSaga,
    getOrganizationStargazersSaga,
    getReposSaga,
    getOrganizationStargazersForecastsSaga
} from './organizationsSaga';
import {
    getOrganizationDownloads,
    getOrganizationDownloadsForecasts,
    getOrganizationStargazers,
    getRepos,
    getOrganizationStargazersForecasts
} from '../../reducers/organizations/organizationsReducer';


export default function* reposRoot() {
    yield all([
        takeLatest(getRepos, getReposSaga),
        takeLatest(getOrganizationDownloads, getOrganizationDownloadsSaga),
        takeLatest(getOrganizationStargazers, getOrganizationStargazersSaga),
        takeLatest(getOrganizationDownloadsForecasts, getOrganizationDownloadsForecastsSaga),
        takeLatest(getOrganizationStargazersForecasts, getOrganizationStargazersForecastsSaga),
    ]);
}
