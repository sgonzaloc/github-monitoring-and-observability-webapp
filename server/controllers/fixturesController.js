import {DOWNLOADS_FORECASTS_TYPE} from "../config/forecastsTypes.js";
import {logEvents} from "../middlewares/logger.js";

export const getFixturesReposByOrganization = () => {
    const path = '../fixtures/repos.json'
    logEvents(`API GET Fixtures Repos. Path: ${path}`)
    return import(path, {
        assert: {
            type: "json"
        }
    }).then(module => module.default);
}

export const getFixturesProjectDownloadsByProject = () => {
    const path = '../fixtures/downloads.json'
    logEvents(`API GET Fixtures Downloads. Path: ${path}`)
    return import(path, {
        assert: {
            type: "json"
        }
    }).then(module => module.default);
}

export const getFixturesProjectByRepo = () => {
    const path = './../fixtures/projectDetails.json'
    logEvents(`API GET Fixtures Project details. Path: ${path}`)
    return import(path, {
        assert: {
            type: "json"
        }
    }).then(module => module.default);
}
export const getFixturesStargazers = () => {
    const path = './../fixtures/stargazers.json'
    logEvents(`API GET Fixtures Stargazers. Path: ${path}`)
    return import(path, {
        assert: {
            type: "json"
        }
    }).then(module => module.default);
}
export const getFixturesForecasts = (forecastsType) => {
    const path = forecastsType === DOWNLOADS_FORECASTS_TYPE ? './../fixtures/forecastsDownloads.json' : './../fixtures/forecastsStargazers.json'
    logEvents(`API GET Fixtures Forecasts ${DOWNLOADS_FORECASTS_TYPE}. Path: ${path}`)
    return import(path, {
        assert: {
            type: "json"
        }
    }).then(module => module.default);
}