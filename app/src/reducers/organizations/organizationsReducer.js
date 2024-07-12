import { createSlice } from '@reduxjs/toolkit';

import * as allSelectors from './organizationsSelectors';

const initialState = {
    selectedOrganization: '',
    reposByOrganization: {},
    downloadsByOrganization: {},
    downloadsForecastsByOrganization: {},
    stargazersByOrganization: {},
    stargazersForecastsByOrganization: {},
};

const downloadsSlice = createSlice({
    name: 'organizations',
    initialState,
    reducers: {
        setSelectedOrganization: {
            reducer: (state, {payload}) => {
                state.selectedOrganization = payload;
            },
            prepare: (organization = '') => ({payload: organization}),
        },
        getRepos: {
            reducer: (state) => state,
        },
        setReposByOrganization: {
            reducer: (state, {payload: {organizationName, repos}}) => {
                state.reposByOrganization[organizationName] = repos
            },
            prepare: ({organizationName = '', repos = []}) => ({payload: {organizationName, repos}}),
        },
        setRepoDetailsByOrganization: {
            reducer: (state, {payload: {organizationName, repoName, repoDetails}}) => {
                const repoIndex = state.reposByOrganization[organizationName].findIndex(e => e.name === repoName)
                state.reposByOrganization[organizationName][repoIndex].details = repoDetails
            },
            prepare: ({organizationName = '', repoName = '', repoDetails = {}}) => ({
                payload: {
                    organizationName,
                    repoName,
                    repoDetails
                }
            }),
        },
        getOrganizationDownloads: {
            reducer: (state) => state,
        },
        setDownloadsByOrganization: {
            reducer: (state, {payload: {organizationName, downloads}}) => {
                state.downloadsByOrganization[organizationName] = downloads
            },
            prepare: ({organizationName='', downloads=[]}) => ({payload: {organizationName, downloads}}),
        },
        getOrganizationStargazers: {
            reducer: (state) => state,
        },
        setStargazersByOrganization: {
            reducer: (state, {payload: {organizationName, stargazers}}) => {
                state.stargazersByOrganization[organizationName] = stargazers
            },
            prepare: ({organizationName='', stargazers=[]}) => ({payload: {organizationName, stargazers}}),
        },
        getOrganizationDownloadsForecasts: {
            reducer: (state) => state,
        },
        setDownloadsForecastsByOrganization: {
            reducer: (state, {payload: {organizationName, downloadsForecasts}}) => {
                state.downloadsForecastsByOrganization[organizationName] = downloadsForecasts
            },
            prepare: ({organizationName = '', downloadsForecasts = []}) => ({payload: {organizationName, downloadsForecasts}}),
        },
        getOrganizationStargazersForecasts: {
            reducer: (state) => state,
        },
        setStargazersForecastsByOrganization: {
            reducer: (state, {payload: {organizationName, stargazersForecasts}}) => {
                state.stargazersForecastsByOrganization[organizationName] = stargazersForecasts
            },
            prepare: ({organizationName = '', stargazersForecasts = []}) => ({payload: {organizationName, stargazersForecasts}}),
        },
    },
});

export { allSelectors };

export const {
    setSelectedOrganization,
    getRepos,
    setReposByOrganization,
    setRepoDetailsByOrganization,
    getOrganizationDownloads,
    setDownloadsByOrganization,
    getOrganizationStargazers,
    setStargazersByOrganization,
    getOrganizationDownloadsForecasts,
    setDownloadsForecastsByOrganization,
    getOrganizationStargazersForecasts,
    setStargazersForecastsByOrganization,
} = downloadsSlice.actions;

export default downloadsSlice.reducer;
