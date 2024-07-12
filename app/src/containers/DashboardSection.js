import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertIcon from "@mui/icons-material/Feedback";
import LineChart from "../components/LineChart";
import * as React from "react";
import {useEffect, useState} from "react";
import Item from "../components/Item";
import {
    getChartsDatasetsAccumCount,
    getChartsDatasetsAccumTotalCount,
    getChartsDatasetsWithForecastsCount,
    getChartsDatasetsWithForecastsTotalCount,
    getDaysArray
} from "./helpers/chartHelpers";
import {useSelector} from "react-redux";
import {
    getDownloadsByOrganization,
    getDownloadsForecastsByOrganization,
    getStargazersByOrganization,
    getStargazersForecastsByOrganization
} from "../reducers/organizations/organizationsSelectors";
import {
    getDownloadsByRepo,
    getDownloadsForecastsByRepo,
    getStargazersByRepo,
    getStargazersForecastsByRepo
} from "../reducers/repos/reposSelectors";
import VerticalBarChart from "../components/VerticalBarChart";

const DashboardSection = () => {
    const [downloadsWithForecastsCountsData, setDownloadsWithForecastsCountsData] = useState({})
    const [stargazersWithForecastsCountsData, setStargazersWithForecastsCountsData] = useState({})

    const downloadsByRepo = useSelector(getDownloadsByRepo);
    const downloadsByOrganization = useSelector(getDownloadsByOrganization);
    const downloadsForecastsByRepo = useSelector(getDownloadsForecastsByRepo);
    const downloadsForecastsByOrganization = useSelector(getDownloadsForecastsByOrganization);
    const stargazersByRepo = useSelector(getStargazersByRepo);
    const stargazersByOrganization = useSelector(getStargazersByOrganization);
    const stargazersForecastsByRepo = useSelector(getStargazersForecastsByRepo);
    const stargazersForecastsByOrganization = useSelector(getStargazersForecastsByOrganization);

    useEffect(() => {
        let newDownloadsWithForecastsCountsData = {}
        const downloads = {...downloadsByRepo, ...downloadsByOrganization}
        const downloadsForecasts = {...downloadsForecastsByRepo, ...downloadsForecastsByOrganization}
        if (Object.keys(downloadsForecasts).length > 0) {
            const downloadsFirstDates = Object.keys(downloads).map(elem => new Date(downloads[elem][0].date))
            const downloadsStartDate = new Date(Math.min(...downloadsFirstDates)).toISOString().slice(0, 10)
            const downloadsEndDates = Object.keys(downloadsForecasts).map(elem => {
                const elemValues = downloadsForecasts[elem]
                return new Date(elemValues[elemValues.length - 1].date)
            })
            const downloadsEndDate = new Date(Math.max(...downloadsEndDates)).toISOString().slice(0, 10)
            const labels = getDaysArray(downloadsStartDate, downloadsEndDate)
            const newDownloadsCountData = getChartsDatasetsWithForecastsCount('Daily Downloads', downloads, labels, downloadsForecasts)
            const newDownloadsTotalCountsData = getChartsDatasetsWithForecastsTotalCount('Total Downloads', downloads, labels, downloadsForecasts)
            newDownloadsWithForecastsCountsData = {
                count: newDownloadsCountData,
                totalCounts: newDownloadsTotalCountsData
            }
        }
        setDownloadsWithForecastsCountsData(newDownloadsWithForecastsCountsData)
    }, [downloadsForecastsByRepo, downloadsForecastsByOrganization])

    useEffect(() => {
        let newStargazersWithForecastsCountsData = {}
        const stargazers = {...stargazersByRepo, ...stargazersByOrganization}
        const stargazersForecasts = {...stargazersForecastsByRepo, ...stargazersForecastsByOrganization}
        if (Object.keys(stargazersForecasts).length > 0) {
            const newStargazersCountData = getChartsDatasetsAccumCount('Daily Stars', stargazers, stargazersForecasts)
            const newStargazersTotalCountsData = getChartsDatasetsAccumTotalCount('Total Stars', stargazers, stargazersForecasts)
            newStargazersWithForecastsCountsData = {
                count: newStargazersCountData,
                totalCounts: newStargazersTotalCountsData
            }
            setStargazersWithForecastsCountsData(newStargazersWithForecastsCountsData)
        }

    }, [stargazersForecastsByRepo, stargazersForecastsByOrganization])

    return <>
        <Grid item sm={12} md={12}>
            <Divider/>
        </Grid>
        <Grid item sm={12} md={12}>
            <Typography variant="h4">Dashboard</Typography>
        </Grid>
        <Grid item sm={12} md={12}>
            <Divider/>
        </Grid>
        <Grid item sm={12} md={12}>
            <Typography variant="h5">Downloads</Typography>
        </Grid>
        {Object.keys(downloadsWithForecastsCountsData).length === 0 &&
            <Grid item sm={12} md={12}>
                <Alert icon={<AlertIcon fontSize="inherit"/>} severity="info">
                    You didn't add any organization or repository to dashboard
                </Alert>
            </Grid>
        }
        {downloadsWithForecastsCountsData &&
            <>
                <Grid item sm={12} md={6}>
                    <Item>
                        <h2>Daily Downloads</h2>
                        <LineChart data={downloadsWithForecastsCountsData.count}
                        />
                    </Item>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Item>
                        <h2>Total Downloads</h2>
                        <LineChart data={downloadsWithForecastsCountsData.totalCounts}
                        />
                    </Item>
                </Grid>
            </>
        }
        <Grid item sm={12} md={12}>
            <Divider/>
        </Grid>
        <Grid item sm={12} md={12}>
            <Typography variant="h5">Stars</Typography>
        </Grid>
        {Object.keys(stargazersWithForecastsCountsData).length === 0 &&
            <Grid item sm={12} md={12}>
                <Alert icon={<AlertIcon fontSize="inherit"/>} severity="info">
                    You didn't add any organization or repository to dashboard
                </Alert>
            </Grid>
        }
        {stargazersWithForecastsCountsData && <>
            <Grid item sm={12} md={6}>
                <Item>
                    <h2>Daily Stars</h2>
                    <VerticalBarChart data={stargazersWithForecastsCountsData.count}
                    />
                </Item>
            </Grid>
            <Grid item sm={12} md={6}>
                <Item>
                    <h2>Total Stars</h2>
                    <LineChart data={stargazersWithForecastsCountsData.totalCounts}
                    />
                </Item>
            </Grid>
        </>}
    </>;
}

export default DashboardSection