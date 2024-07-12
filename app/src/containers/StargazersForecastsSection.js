import Grid from "@mui/material/Grid";
import LineChart from "../components/LineChart";
import * as React from "react";
import {useEffect, useState} from "react";
import Item from "../components/Item";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import {getStargazersForecastsByOrganization} from "../reducers/organizations/organizationsSelectors";
import {getStargazersForecastsByRepo} from "../reducers/repos/reposSelectors";
import {getChartsDatasetsCount, getChartsDatasetsTotalCount} from "./helpers/chartHelpers";

const StargazersForecastsSection = () => {
    const [stargazersForecastsCountsData, setStargazersForecastsCountsData] = useState({})

    const stargazersForecastsByRepo = useSelector(getStargazersForecastsByRepo);
    const stargazersForecastsByOrganization = useSelector(getStargazersForecastsByOrganization);


    useEffect(() => {
        let newStargazersForecastsCountsData = {}
        Object.keys(stargazersForecastsByRepo).forEach(elemName => {
            const stargazersForecasts = stargazersForecastsByRepo[elemName]
            const newStargazersForecastsCountData = getChartsDatasetsCount('Daily Stargazer Forecasts', stargazersForecasts)
            const newStargazersForecastsTotalCountsData = getChartsDatasetsTotalCount('Total Stargazer Forecasts', stargazersForecasts)
            newStargazersForecastsCountsData[elemName] = {
                count: newStargazersForecastsCountData,
                totalCounts: newStargazersForecastsTotalCountsData
            }
        })
        Object.keys(stargazersForecastsByOrganization).forEach(elemName => {
            const stargazersForecasts = stargazersForecastsByOrganization[elemName]
            const newStargazersForecastsCountData = getChartsDatasetsCount('Daily Stargazer Forecasts', stargazersForecasts)
            const newStargazersForecastsTotalCountsData = getChartsDatasetsTotalCount('Total Stargazer Forecasts', stargazersForecasts)
            newStargazersForecastsCountsData[elemName] = {
                count: newStargazersForecastsCountData,
                totalCounts: newStargazersForecastsTotalCountsData
            }
        })
        setStargazersForecastsCountsData(newStargazersForecastsCountsData)
    }, [stargazersForecastsByRepo, stargazersForecastsByOrganization]);


    return Object.keys(stargazersForecastsCountsData).map((elemName, elemNameIndex) => {
        const elemStargazersForecastsCountsData = stargazersForecastsCountsData[elemName]
        return <Grid container item key={elemNameIndex}>
            <Grid item sm={12} md={12}>
                <Divider/>
            </Grid>
            <Grid item sm={12} md={12} sx={{marginTop: '1em'}}>
                <Typography variant="h6">{elemName}</Typography>
            </Grid>
            <Grid item sm={12} md={6}>
                <Item>
                    <LineChart data={elemStargazersForecastsCountsData.count}/>
                </Item>
            </Grid>
            <Grid item sm={12} md={6}>
                <Item>
                    <LineChart data={elemStargazersForecastsCountsData.totalCounts}/>
                </Item>
            </Grid>
        </Grid>
    })
}

export default StargazersForecastsSection