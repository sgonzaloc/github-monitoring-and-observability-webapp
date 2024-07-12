import {put, select} from 'redux-saga/effects';
import {
    getSelectedOrganization,
} from "../../reducers/organizations/organizationsSelectors";
import {
    getDownloadsByRepo,
    getSelectedRepo,
    getStargazersByRepo
} from "../../reducers/repos/reposSelectors";
import {setRepoDetailsByOrganization} from '../../reducers/organizations/organizationsReducer'
import {
    setDownloadsByRepo,
    setDownloadsErrorsMessagesByRepo,
    setDownloadsForecastsByRepo,
    setDownloadsForecastsErrorMessage,
    setSelectedRepo,
    setStargazersByRepo,
    setStargazersErrorsMessagesByRepo,
    setStargazersForecastsByRepo,
    setStargazersForecastsErrorMessage,
} from '../../reducers/repos/reposReducer'
import {getForecasts} from "../helpers/forecasts";
import {DOWNLOADS_FORECASTS_TYPE, STARGAZERS_FORECASTS_TYPE} from "../../config/forecastsTypes";

export function* getRepoDownloadsSaga() {
    const organizationName = yield select(getSelectedOrganization);
    const repo = yield select(getSelectedRepo);
    const repoFullName = repo.fullName
    const defaultBranch = repo.defaultBranch
    try {
        const responseReposDetails = yield fetch(`${process.env.REACT_APP_BASE_URL}/projects?organizationName=${organizationName}&repoName=${repo.name}&defaultBranch=${defaultBranch}`)
        if (responseReposDetails.status === 404) {
            yield put(setDownloadsErrorsMessagesByRepo({
                repoName: repo.fullName,
                errorMessage: "This is not a Python repo"
            }))
            return
        }

        const reposDetails = yield responseReposDetails.json();
        const repoDetails = reposDetails[repo.name]

        yield put(setSelectedRepo({...repo, details: repoDetails}))
        yield put(setRepoDetailsByOrganization({organizationName, repoName: repo.name, repoDetails}))

        const responseDownloads = yield fetch(`${process.env.REACT_APP_BASE_URL}/downloads/repos?repoFullName=${repoFullName}&defaultBranch=${defaultBranch}`)
        const downloads = yield responseDownloads.json();
        yield put(setDownloadsByRepo({repoName: repo.fullName, downloads: downloads[repo.fullName]}))


    } catch (error) {
        console.error('[ERROR][SAGA] getRepoDownloadsSaga', error);
    }
}

export function* getRepoStargazersSaga() {
    const organizationName = yield select(getSelectedOrganization);
    const repo = yield select(getSelectedRepo);

    if (Number(repo.stargazersCount) === 0) {
        yield put(setStargazersErrorsMessagesByRepo(
            {
                repoName: repo.fullName,
                errorMessage: `There's no stargazers for ${repo.name}`
            }
        ))
        return
    }
    try {
        const response = yield fetch(`${process.env.REACT_APP_BASE_URL}/stargazers/repos?organizationName=${organizationName}&repoName=${repo.name}&stargazersCount=${repo.stargazersCount}`)
        const stargazersByRepo = yield response.json();
        const stargazers = stargazersByRepo[repo.fullName]
        yield put(setStargazersByRepo({repoName: repo.fullName, stargazers}));
    } catch (error) {
        console.error('[ERROR][SAGA] getStargazersByTypeSaga', error);
    }
}


export function* getRepoDownloadsForecastsSaga() {
    const repo = yield select(getSelectedRepo);
    const downloadsByRepo = yield select(getDownloadsByRepo);
    const repoFullName = repo.fullName
    const downloads = downloadsByRepo[repoFullName]

    try {
        const response = yield* getForecasts(DOWNLOADS_FORECASTS_TYPE, repoFullName, downloads);
        if (response.status === 400) {
            yield put(setDownloadsForecastsErrorMessage("Not enough downloads for forecastings."))
            return
        }
        const downloadsForecasts = yield response.json();
        yield put(setDownloadsForecastsErrorMessage(''))
        yield put(setDownloadsForecastsByRepo({repoName: repoFullName, downloadsForecasts}));

    } catch (error) {
        console.error('[ERROR][SAGA] getRepoDownloadsForecastsSaga', error);
    }
}

export function* getRepoStargazersForecastsSaga() {
    const repo = yield select(getSelectedRepo);
    const stargazersByRepo = yield select(getStargazersByRepo);
    const repoFullName = repo.fullName
    const stargazers = stargazersByRepo[repo.fullName]
    try {
        const response = yield* getForecasts(STARGAZERS_FORECASTS_TYPE, repoFullName, stargazers);
        if (response.status === 400) {
            yield put(setStargazersForecastsErrorMessage("Not enough stargazers for forecastings."))
            return
        }
        const stargazersForecasts = yield response.json();
        yield put(setStargazersForecastsErrorMessage(''))
        yield put(setStargazersForecastsByRepo({repoName: repoFullName, stargazersForecasts}));

    } catch (error) {
        console.error('[ERROR][SAGA] getRepoStargazersForecastsSaga', error);
    }
}
