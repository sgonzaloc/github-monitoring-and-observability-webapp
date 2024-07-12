import express from 'express';
import {getForecasts} from "../controllers/forecastsController.js";

const router = express.Router();

router.post('/', async (req, res, next) => {
    const forecastsType = req.query.forecastsType;
    const forecastsName = req.query.forecastsName;
    const {lastTotalYValue, data} = req.body
    if (!forecastsType || !forecastsName || !req.body) {
        const message = !forecastsType ? "Missing query forecastsType" : !req.body ? "Missing body" : "Missing query forecastsName"
        return res.status(400).json({message})
    }
    let forecasts = await getForecasts(forecastsType, forecastsName, data);
    let totalCounts = lastTotalYValue
    let forecastsCounts = []
    if (forecasts) {
        forecastsCounts = forecasts.data.timestamp.map((elem, elemIndex) => {
            const count = Math.max(0, forecasts.data.value[elemIndex])
            totalCounts = totalCounts + count
            return ({date: elem.substring(0, 10), count, totalCounts})
        })
        return res.json(forecastsCounts);
    }
    return res.status(400).json({message: "Not enough data for forecastings"})
});


export default router;
