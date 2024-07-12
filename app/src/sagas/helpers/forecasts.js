import {getDaysArray} from "../../containers/helpers/chartHelpers";

export function* getForecasts(forecastsType, forecastsName, data) {
    const firstDate = data[0].date
    const today = new Date().toISOString().slice(0, 10)
    const allDays = getDaysArray(firstDate, today)
    const lastTotalYValue = data[data.length - 1].totalCounts
    const yData = allDays.reduce((acc, date) => {
        const foundDataByDate = data.find(e => e.date === date)
        const newDataOnDate = foundDataByDate ? foundDataByDate.count : 0
        acc[date] = newDataOnDate
        return acc
    }, {})
    const body = JSON.stringify({
        lastTotalYValue,
        data: {
            model: "timegpt-1",
            freq: "D",
            fh: 7,
            y: yData,
            clean_ex_first: true,
            finetune_steps: 0,
            finetune_loss: "default",
            level: [
                90
            ]
        }
    })
    const response = yield fetch(`${process.env.REACT_APP_BASE_URL}/forecasts?forecastsType=${forecastsType}&forecastsName=${forecastsName}`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body,
    })
    return response;
}