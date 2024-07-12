import * as React from "react"
import {useCallback, useEffect} from "react"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useDispatch, useSelector} from 'react-redux';
import {getRepoDownloadsForecasts, getRepoStargazersForecasts} from '../reducers/repos/reposReducer'
import {
    getOrganizationDownloadsForecasts,
    getOrganizationStargazersForecasts,
    getRepos
} from '../reducers/organizations/organizationsReducer'
import {
    getDownloadsByOrganization,
    getSelectedOrganization,
    getStargazersByOrganization
} from '../reducers/organizations/organizationsSelectors'
import {getDownloadsByRepo, getStargazersByRepo,} from "../reducers/repos/reposSelectors";
import MonitorActions from "./MonitorActions";
import {Outlet} from 'react-router-dom'

const MonitorMain = () => {
    const dispatch = useDispatch();
    const selectedOrganization = useSelector(getSelectedOrganization);
    const downloadsByRepo = useSelector(getDownloadsByRepo);
    const downloadsByOrganization = useSelector(getDownloadsByOrganization);
    const stargazersByRepo = useSelector(getStargazersByRepo);
    const stargazersByOrganization = useSelector(getStargazersByOrganization);

    const handleGetRepos = useCallback(() => dispatch(getRepos()), [dispatch]);
    const handleGetRepoDownloadsForecasts = useCallback(() => dispatch(getRepoDownloadsForecasts()), [dispatch]);
    const handleGetOrganizationDownloadsForecasts = useCallback(() => dispatch(getOrganizationDownloadsForecasts()), [dispatch]);
    const handleGetRepoStargazersForecasts = useCallback(() => dispatch(getRepoStargazersForecasts()), [dispatch]);
    const handleGetOrganizationStargazersForecasts = useCallback(() => dispatch(getOrganizationStargazersForecasts()), [dispatch]);


    useEffect(() => {
        if (Object.keys(downloadsByRepo).length > 0) {
            handleGetRepoDownloadsForecasts()
        }
    }, [downloadsByRepo])

    useEffect(() => {
        if (Object.keys(downloadsByOrganization).length > 0) {
            handleGetOrganizationDownloadsForecasts()
        }
    }, [downloadsByOrganization])


    useEffect(() => {
        if (Object.keys(stargazersByRepo).length > 0) {
            handleGetRepoStargazersForecasts()
        }
    }, [stargazersByRepo])


    useEffect(() => {
        if (Object.keys(stargazersByOrganization).length > 0) {
            handleGetOrganizationStargazersForecasts()
        }
    }, [stargazersByOrganization])


    useEffect(() => {
        if (selectedOrganization) {
            handleGetRepos()
        }
    }, [selectedOrganization])

    return <>
        <Box sx={{flexGrow: 1}} style={{margin: '0em 1.5em'}}>
            <MonitorActions/>
            <Grid container spacing={4}>
                <Outlet/>
            </Grid>
        </Box>
    </>

}

export default MonitorMain