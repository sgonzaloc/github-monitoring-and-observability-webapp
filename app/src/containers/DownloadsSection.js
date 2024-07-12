import Grid from "@mui/material/Grid";
import LineChart from "../components/LineChart";
import Alert from "@mui/material/Alert";
import AlertIcon from "@mui/icons-material/Feedback";
import * as React from "react";
import {useEffect, useState} from "react";
import Item from "../components/Item";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {getChartsDatasetsCount, getChartsDatasetsTotalCount} from "./helpers/chartHelpers";
import {useSelector} from "react-redux";
import {getDownloadsByOrganization} from "../reducers/organizations/organizationsSelectors";
import {getDownloadsByRepo, getDownloadsErrorsMessagesByRepo} from "../reducers/repos/reposSelectors";

const DownloadsSection = () => {
    const [downloadsCountsData, setDownloadsCountsData] = useState({})

    const downloadsByRepo = useSelector(getDownloadsByRepo);
    const downloadsByOrganization = useSelector(getDownloadsByOrganization);
    const downloadsErrorsMessagesByRepo = useSelector(getDownloadsErrorsMessagesByRepo);

    useEffect(() => {
        let newDownloadsCountsData = {}
        Object.keys(downloadsByRepo).forEach(elemName => {
            const downloads = downloadsByRepo[elemName]
            const newDownloadsCountData = getChartsDatasetsCount('Daily Downloads', downloads)
            const newDownloadsTotalCountsData = getChartsDatasetsTotalCount('Total Downloads', downloads)
            newDownloadsCountsData[elemName] = {
                count: newDownloadsCountData,
                totalCounts: newDownloadsTotalCountsData
            }
        })
        Object.keys(downloadsByOrganization).forEach(elemName => {
            const downloads = downloadsByOrganization[elemName]
            const newDownloadsCountData = getChartsDatasetsCount('Daily Downloads', downloads)
            const newDownloadsTotalCountsData = getChartsDatasetsTotalCount('Total Downloads', downloads)
            newDownloadsCountsData[elemName] = {
                count: newDownloadsCountData,
                totalCounts: newDownloadsTotalCountsData
            }
        })
        setDownloadsCountsData(newDownloadsCountsData)
    }, [downloadsByRepo, downloadsByOrganization])

    return <>
        {Object.keys(downloadsCountsData).map((elemName, elemNameIndex) => {
            const elemDownloadsCountsData = downloadsCountsData[elemName]
            return <Grid container item key={elemNameIndex}>
                <Grid item sm={12} md={12}>
                    <Divider/>
                </Grid>
                <Grid item sm={12} md={12} sx={{marginTop: '1em'}}>
                    <Typography variant="h6">{elemName}</Typography>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Item>
                        <LineChart data={elemDownloadsCountsData.count}/>
                    </Item>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Item>
                        <LineChart data={elemDownloadsCountsData.totalCounts}/>
                    </Item>
                </Grid>
            </Grid>;
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
            </Grid>;
        })}
    </>

}

export default DownloadsSection