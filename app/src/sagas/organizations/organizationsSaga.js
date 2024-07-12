import {put, select} from 'redux-saga/effects';
import {
    getDownloadsByOrganization,
    getSelectedOrganization,
    getStargazersByOrganization
} from "../../reducers/organizations/organizationsSelectors";
import {
    setDownloadsByOrganization,
    setDownloadsForecastsByOrganization,
    setReposByOrganization,
    setStargazersByOrganization,
    setStargazersForecastsByOrganization
} from '../../reducers/organizations/organizationsReducer'
import {
    setDownloadsForecastsErrorMessage,
    setOrganizationErrorMessage,
    setStargazersForecastsErrorMessage,
} from '../../reducers/repos/reposReducer'
import {getForecasts} from "../helpers/forecasts";
import {DOWNLOADS_FORECASTS_TYPE, STARGAZERS_FORECASTS_TYPE} from "../../config/forecastsTypes";

export function* getReposSaga() {
    const selectedOrganization = yield select(getSelectedOrganization);
    try {
        const response = yield fetch(`${process.env.REACT_APP_BASE_URL}/repos?organizationName=${selectedOrganization}`)
        const repos = yield response.json();
        if (repos.length === 0) {
            yield put(setOrganizationErrorMessage(`There's no repositories for organization ${selectedOrganization}`))
        } else {
            yield put(setOrganizationErrorMessage(''))
            yield put(setReposByOrganization({organizationName: selectedOrganization, repos}));
        }
    } catch (error) {
        console.error('[ERROR][SAGA] getReposSaga', error);
    }
}

export function* getOrganizationDownloadsSaga() {
    const organizationName = yield select(getSelectedOrganization);
    try {
        const responseDownloads = yield fetch(`${process.env.REACT_APP_BASE_URL}/downloads/organizations/${organizationName}`)
        const downloads = yield responseDownloads.json();
        yield put(setDownloadsByOrganization({
            organizationName: organizationName,
            downloads: downloads[organizationName]
        }))

    } catch (error) {
        console.error('[ERROR][SAGA] getOrganizationDownloadsSaga', error);
    }
}

export function* getOrganizationStargazersSaga() {
    const organizationName = yield select(getSelectedOrganization);
    try {
        const responseStargazers = yield fetch(`${process.env.REACT_APP_BASE_URL}/stargazers/organizations/${organizationName}`)
        const stargazers = yield responseStargazers.json();
        yield put(setStargazersByOrganization({
            organizationName: organizationName,
            stargazers: stargazers[organizationName]
        }))

    } catch (error) {
        console.error('[ERROR][SAGA] getOrganizationStargazersSaga', error);
    }
}

export function* getOrganizationDownloadsForecastsSaga() {
    const organizationName = yield select(getSelectedOrganization);
    const downloadsByOrganization = yield select(getDownloadsByOrganization);
    const downloads = downloadsByOrganization[organizationName]

    try {
        const response = yield* getForecasts(DOWNLOADS_FORECASTS_TYPE, organizationName, downloads);
        if (response.status === 400) {
            yield put(setDownloadsForecastsErrorMessage("Not enough downloads for forecastings."))
            return
        }
        const downloadsForecasts = yield response.json();
        yield put(setDownloadsForecastsErrorMessage(''))
        yield put(setDownloadsForecastsByOrganization({organizationName, downloadsForecasts}));

    } catch (error) {
        console.error('[ERROR][SAGA] getDownloadsForecastsByTypeSaga', error);
    }
}

export function* getOrganizationStargazersForecastsSaga() {
    const organizationName = yield select(getSelectedOrganization);
    const stargazersByOrganization = yield select(getStargazersByOrganization);
    const stargazers = stargazersByOrganization[organizationName]

    try {
        const response = yield* getForecasts(STARGAZERS_FORECASTS_TYPE, organizationName, stargazers);
        if (response.status === 400) {
            yield put(setStargazersForecastsErrorMessage("Not enough stargazers for forecastings."))
            return
        }
        const stargazersForecasts = yield response.json();
        yield put(setStargazersForecastsErrorMessage(''))
        yield put(setStargazersForecastsByOrganization({organizationName, stargazersForecasts}));

    } catch (error) {
        console.error('[ERROR][SAGA] getStargazersForecastsByTypeSaga', error);
    }
}