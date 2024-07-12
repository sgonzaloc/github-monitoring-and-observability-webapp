import {getFixturesForecasts} from "./fixturesController.js";
import {logEvents} from "../middlewares/logger.js";


export const getForecasts = async (forecastsType, forecastsName, data) => {
    let forecasts
    if (process.env.USE_FIXTURES_DATA === 'true') {
        const forecastsByName = await getFixturesForecasts(forecastsType)
        forecasts = forecastsByName[forecastsName]
    } else {
        const url = 'https://dashboard.nixtla.io/api/timegpt'
        const responseForecasts = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.TIMEGPT1_SECRET}`
            },
            body: JSON.stringify(data)
        })
        logEvents(`ResponseForecasts Status: ${responseForecasts.status}`)
        if (responseForecasts.status === 200) {
            forecasts = await responseForecasts.json();
            // logEvents(`ResponseForecasts data: ${JSON.stringify(forecasts)}`)
        }
    }
    return forecasts;
}