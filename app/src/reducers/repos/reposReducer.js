import {createSlice} from '@reduxjs/toolkit';

import * as allSelectors from './reposSelectors';

const initialState = {
    selectedRepo: {},
    downloadsByRepo: {},
    downloadsForecastsByRepo: {},
    downloadsErrorsMessagesByRepo: {},
    stargazersByRepo: {},
    stargazersForecastsByRepo: {},
    stargazersForecastsErrorMessage: '',
    organizationErrorMessage: '',
    stargazersErrorsMessagesByRepo: {},
};

const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        setOrganizationErrorMessage: {
            reducer: (state, {payload}) => {
                state.organizationErrorMessage = payload;
            },
            prepare: (message = '') => ({payload: message}),
        },
        setSelectedRepo: {
            reducer: (state, {payload}) => {
                state.selectedRepo = payload;
            },
            prepare: (repo = '') => ({payload: repo}),
        },
        getRepoDownloads: {
            reducer: (state) => state,
        },
        setDownloadsByRepo: {
            reducer: (state, {payload: {repoName, downloads}}) => {
                state.downloadsByRepo[repoName] = downloads
            },
            prepare: ({repoName='', downloads=[]}) => ({payload: {repoName, downloads}}),
        },
        setDownloadsErrorsMessagesByRepo: {
            reducer: (state, { payload: {repoName, errorMessage} }) => {
                state.downloadsErrorsMessagesByRepo[repoName] = errorMessage
            },
            prepare: ({repoName='', errorMessage = ''}) => ({payload: {repoName, errorMessage}}),
        },
        getRepoStargazers: {
            reducer: (state) => state,
        },
        setStargazersByRepo: {
            reducer: (state, {payload: {repoName, stargazers}}) => {
                state.stargazersByRepo[repoName] = stargazers
            },
            prepare: ({repoName = '', stargazers = []}) => ({payload: {repoName, stargazers}}),
        },
        setStargazersErrorsMessagesByRepo: {
            reducer: (state, { payload: {repoName, errorMessage} }) => {
                state.stargazersErrorsMessagesByRepo[repoName] = errorMessage
            },
            prepare: ({repoName='', errorMessage = ''}) => ({payload: {repoName, errorMessage}}),
        },
        getRepoDownloadsForecasts: {
            reducer: (state) => state,
        },
        setDownloadsForecastsByRepo: {
            reducer: (state, {payload: {repoName, downloadsForecasts}}) => {
                state.downloadsForecastsByRepo[repoName] = downloadsForecasts
            },
            prepare: ({repoName = '', downloadsForecasts = []}) => ({payload: {repoName, downloadsForecasts}}),
        },
        setDownloadsForecastsErrorMessage: {
            reducer: (state, {payload}) => {
                state.downloadsForecastsErrorMessage = payload;
            },
            prepare: (message = '') => ({payload: message}),
        },
        getRepoStargazersForecasts: {
            reducer: (state) => state,
        },
        setStargazersForecastsByRepo: {
            reducer: (state, {payload: {repoName, stargazersForecasts}}) => {
                state.stargazersForecastsByRepo[repoName] = stargazersForecasts
            },
            prepare: ({repoName = '', stargazersForecasts = []}) => ({payload: {repoName, stargazersForecasts}}),
        },
        setStargazersForecastsErrorMessage: {
            reducer: (state, {payload}) => {
                state.stargazersForecastsErrorMessage = payload;
            },
            prepare: (message = '') => ({payload: message}),
        },
    },
});

export {allSelectors};

export const {
    setOrganizationErrorMessage,
    setSelectedRepo,
    getRepoDownloads,
    setDownloadsErrorsMessagesByRepo,
    setDownloadsByRepo,
    getRepoStargazers,
    setStargazersByRepo,
    setStargazersErrorsMessagesByRepo,
    getRepoDownloadsForecasts,
    setDownloadsForecastsByRepo,
    setDownloadsForecastsErrorMessage,
    getRepoStargazersForecasts,
    setStargazersForecastsByRepo,
    setStargazersForecastsErrorMessage,
} = reposSlice.actions;

export default reposSlice.reducer;
