import Grid from "@mui/material/Grid";
import LineChart from "../components/LineChart";
import * as React from "react";
import {useEffect, useState} from "react";
import Item from "../components/Item";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import {getStargazersByOrganization} from "../reducers/organizations/organizationsSelectors";
import {getStargazersErrorsMessagesByRepo, getStargazersByRepo} from "../reducers/repos/reposSelectors";
import {getChartsDatasetsCount, getChartsDatasetsTotalCount} from "./helpers/chartHelpers";
import Alert from "@mui/material/Alert";
import AlertIcon from "@mui/icons-material/Feedback";
import VerticalBarChart from "../components/VerticalBarChart";

const StargazersSection = () => {
    const [stargazersCountsData, setStargazersCountsData] = useState({})

    const stargazersByRepo = useSelector(getStargazersByRepo);
    const stargazersByOrganization = useSelector(getStargazersByOrganization);
    const stargazersErrorsMessagesByRepo = useSelector(getStargazersErrorsMessagesByRepo);

    useEffect(() => {
        let newStargazersCountsData = {}
        Object.keys(stargazersByRepo).forEach(elemName => {
            const stargazers = stargazersByRepo[elemName]
            const newStargazersCountData = getChartsDatasetsCount('Daily Stars', stargazers)
            const newStargazersTotalCountsData = getChartsDatasetsTotalCount('Total Stars', stargazers)
            newStargazersCountsData[elemName] = {
                count: newStargazersCountData,
                totalCounts: newStargazersTotalCountsData
            }
        })
        Object.keys(stargazersByOrganization).forEach(elemName => {
            const stargazers = stargazersByOrganization[elemName]
            const newStargazersCountData = getChartsDatasetsCount('Daily Stars', stargazers)
            const newStargazersTotalCountsData = getChartsDatasetsTotalCount('Total Stars', stargazers)
            newStargazersCountsData[elemName] = {
                count: newStargazersCountData,
                totalCounts: newStargazersTotalCountsData
            }
        })
        setStargazersCountsData(newStargazersCountsData)

    }, [stargazersByRepo, stargazersByOrganization])

    return <>
        {Object.keys(stargazersCountsData).map((elemName, elemNameIndex) => {
            const elemStargazersCountsData = stargazersCountsData[elemName]
            return <Grid container item key={elemNameIndex}>
                <Grid container item key={elemNameIndex}>
                    <Grid item sm={12} md={12}>
                        <Divider/>
                    </Grid>
                    <Grid item sm={12} md={12} sx={{marginTop: '1em'}}>
                        <Typography variant="h6">{elemName}</Typography>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <Item>
                            <VerticalBarChart data={elemStargazersCountsData.count}/>
                        </Item>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <Item>
                            <LineChart data={elemStargazersCountsData.totalCounts}/>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
        })}
        {Object.keys(stargazersErrorsMessagesByRepo).map((elemName, elemNameIndex) => {
            const elemDownloadsErrorsMessage = stargazersErrorsMessagesByRepo[elemName]
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

export default StargazersSection