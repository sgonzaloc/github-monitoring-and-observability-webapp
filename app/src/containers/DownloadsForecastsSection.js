import Grid from "@mui/material/Grid";
import LineChart from "../components/LineChart";
import Alert from "@mui/material/Alert";
import AlertIcon from "@mui/icons-material/Feedback";
import * as React from "react";
import {useEffect, useState} from "react";
import Item from "../components/Item";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import {getDownloadsForecastsByOrganization} from "../reducers/organizations/organizationsSelectors";
import {getDownloadsErrorsMessagesByRepo, getDownloadsForecastsByRepo} from "../reducers/repos/reposSelectors";
import {getChartsDatasetsCount, getChartsDatasetsTotalCount} from "./helpers/chartHelpers";


const DownloadsForecastsSection = () => {
    const [downloadsForecastsCountsData, setDownloadsForecastsCountsData] = useState({})
    const downloadsErrorsMessagesByRepo = useSelector(getDownloadsErrorsMessagesByRepo);

    const downloadsForecastsByRepo = useSelector(getDownloadsForecastsByRepo);
    const downloadsForecastsByOrganization = useSelector(getDownloadsForecastsByOrganization);

    useEffect(() => {
        let newDownloadsForecastsCountsData = {}
        Object.keys(downloadsForecastsByRepo).forEach(elemName => {
            const downloadsForecasts = downloadsForecastsByRepo[elemName]
            const newDownloadsForecastsCountData = getChartsDatasetsCount('Daily Download Forecasts', downloadsForecasts)
            const newDownloadsForecastsTotalCountsData = getChartsDatasetsTotalCount('Total Download Forecasts', downloadsForecasts)
            newDownloadsForecastsCountsData[elemName] = {
                count: newDownloadsForecastsCountData,
                totalCounts: newDownloadsForecastsTotalCountsData
            }
        })
        Object.keys(downloadsForecastsByOrganization).forEach(elemName => {
            const downloadsForecasts = downloadsForecastsByOrganization[elemName]
            const newDownloadsForecastsCountData = getChartsDatasetsCount('Daily Download Forecasts', downloadsForecasts)
            const newDownloadsForecastsTotalCountsData = getChartsDatasetsTotalCount('Total Download Forecasts', downloadsForecasts)
            newDownloadsForecastsCountsData[elemName] = {
                count: newDownloadsForecastsCountData,
                totalCounts: newDownloadsForecastsTotalCountsData
            }
        })
        setDownloadsForecastsCountsData(newDownloadsForecastsCountsData)
    }, [downloadsForecastsByRepo, downloadsForecastsByOrganization]);


    return <>
        {Object.keys(downloadsForecastsCountsData).map((elemName, elemNameIndex) => {
            const elemDownloadsForecastsCountsData = downloadsForecastsCountsData[elemName]
            return <Grid container item key={elemNameIndex}>
                <Grid item sm={12} md={12}>
                    <Divider/>
                </Grid>
                <Grid item sm={12} md={12} sx={{marginTop: '1em'}}>
                    <Typography variant="h6">{elemName}</Typography>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Item>
                        <LineChart data={elemDownloadsForecastsCountsData.count}/>
                    </Item>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Item>
                        <LineChart data={elemDownloadsForecastsCountsData.totalCounts}/>
                    </Item>
                </Grid>
            </Grid>
        })}
        {Object.keys(downloadsErrorsMessagesByRepo).map((elemName, elemNameIndex) => {
            const elemDownloadsErrorsMessage = downloadsErrorsMessagesByRepo[elemName]
            return <Grid container item key={elemNameIndex}>
                <Grid item sm={12} md={12}>
                    <Divider/>
                </Grid>
                <Grid item sm={12} md={12} sx={{marginTop: '1em'}}>
                    <Typography variant="h6">{elemName}</Typography>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Alert icon={<AlertIcon fontSize="inherit"/>} severity="error">
                        {elemDownloadsErrorsMessage}
                    </Alert>
                </Grid>
            </Grid>
        })}
    </>
}

export default DownloadsForecastsSection