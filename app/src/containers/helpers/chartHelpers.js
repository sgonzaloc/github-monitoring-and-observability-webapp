import {backgroundColor, borderColor, getRandomColor} from "../../config/colorsPalette";

export const getChartsDatasetsCount = (label, data) => {
    const sortedData = data.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
    const color = getRandomColor(1)
    return {
        labels: sortedData.map(e => e.date),
        datasets: [
            {
                fill: true,
                label,
                data: sortedData.map(e => e.count),
                backgroundColor: color,
            }
        ]
    };
}


export const getChartsDatasetsTotalCount = (label, data) => {
    const sortedData = data.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
    console.log('sortedData', sortedData)
    return {
        labels: sortedData.map(e => e.date),
        datasets: [
            {
                label,
                data: sortedData.map(e => e.totalCounts),
                borderColor: borderColor[1],
                backgroundColor: backgroundColor[1],
            }
        ]
    };
}
export const getDaysArray = (startDate, endDate) => {
    let daysArray = []
    for (let dt = new Date(startDate); dt <= new Date(endDate); dt.setDate(dt.getDate() + 1)) {
        daysArray.push(new Date(dt).toISOString().slice(0, 10));
    }
    return daysArray;
};

export const getChartsDatasetsAccumCount = (label, data, dataForecasts) => {
    const datasetsLabels = Object.keys(data).reduce((acc, val) => acc.concat(data[val]), []).map(e => e.date).sort((a, b) => new Date(a) - new Date(b))
    const datasets = Object.keys(data).map(elemName => {
            const color = getRandomColor(1)
            const countByDate = data[elemName].reduce((acc, currentValue) => {
                acc[currentValue.date] = currentValue.count
                return acc
            }, {})
            const datasetData = datasetsLabels.map(date => countByDate[date] ? countByDate[date] : undefined)
            return {
                fill: true,
                label: elemName,
                data: datasetData,
                borderColor: color,
                backgroundColor: color,
                barPercentage: 1.0,
                categoryPercentage: 1.0
            }
        }
    )
    const datasetsForecastsLabels = Object.keys(dataForecasts).reduce((acc, val) => acc.concat(dataForecasts[val]), []).map(e => e.date).sort((a, b) => new Date(a) - new Date(b))
    const datasetsForecasts = Object.keys(dataForecasts).map(elemName => {
            const color = getRandomColor(1)
            const countByDate = dataForecasts[elemName].reduce((acc, currentValue) => {
                acc[currentValue.date] = currentValue.count
                return acc
            }, {})
            const datasetData = Array(datasetsLabels.length).concat(datasetsForecastsLabels).map(date => countByDate[date] ? countByDate[date] : undefined)
            return {
                fill: true,
                label: elemName + ' Forecasts',
                data: datasetData,
                borderColor: color,
                backgroundColor: color
            }
        }
    )
    return {
        labels: datasetsLabels.concat(datasetsForecastsLabels),
        datasets: datasets.concat(datasetsForecasts).sort((a, b) => a.label < b.label ? -1: 1)
    };
}
export const getChartsDatasetsAccumTotalCount = (label, data, dataForecasts) => {
    const datasetsLabels = Object.keys(data).reduce((acc, val) => acc.concat(data[val]), []).map(e => e.date).sort((a, b) => new Date(a) - new Date(b))
    const datasetsForecastsLabels = Object.keys(dataForecasts).reduce((acc, val) => acc.concat(dataForecasts[val]), []).map(e => e.date).sort((a, b) => new Date(a) - new Date(b))
    const labels = datasetsLabels.concat(datasetsForecastsLabels)
    const datasets = Object.keys(data).map(elemName => {
        const color = getRandomColor(1)
        const countByDate = data[elemName].reduce((acc, currentValue) => {
            acc[currentValue.date] = currentValue.totalCounts
            return acc
        }, {})
        let preValue = undefined
        const datasetData = datasetsLabels.map(date => {
            if (countByDate[date]) {
                preValue = countByDate[date]
                return countByDate[date]
            }
            return preValue
        })
        return {
            label: elemName,
            data: datasetData,
            borderColor: color,
            backgroundColor: color

        }
    })


    const datasetsForecasts = Object.keys(dataForecasts).map(elemName => {
        const color = getRandomColor(1)
        const countByDate = dataForecasts[elemName].reduce((acc, currentValue) => {
            acc[currentValue.date] = currentValue.totalCounts
            return acc
        }, {})
        let preValue = undefined
        const datasetData = Array(datasetsLabels.length).concat(datasetsForecastsLabels).map(date => {
            if (countByDate[date]) {
                preValue = countByDate[date]
                return countByDate[date]
            }
            return preValue
        })
        return {
            label: elemName + ' Forecasts',
            data: datasetData,
            borderColor: color,
            backgroundColor: color

        }
    })
    return {
        labels,
        datasets: datasets.concat(datasetsForecasts).sort((a, b) => a.label < b.label ? -1: 1)
    };
}
export const getChartsDatasetsWithForecastsCount = (label, data1, axisXLabels, data2) => {
    const datasets1 = Object.keys(data1).map(elemName => {
            const borderColor = getRandomColor(0.4)
            const backgroundColor = getRandomColor(0.9)
            const countByDate = data1[elemName].reduce((acc, currentValue) => {
                acc[currentValue.date] = currentValue.count
                return acc
            }, {})
            const data = axisXLabels.map(date => countByDate[date] ? countByDate[date] : undefined)
            return {
                label: elemName,
                data,
                borderColor,
                backgroundColor,
            }
        }
    )
    const datasets2 = Object.keys(data2).map(elemName => {
            const borderColor = getRandomColor(0.4)
            const backgroundColor = getRandomColor(0.9)
            const countByDate = data2[elemName].reduce((acc, currentValue) => {
                acc[currentValue.date] = currentValue.count
                return acc
            }, {})
            const data = axisXLabels.map(date => countByDate[date] ? countByDate[date] : undefined)
            return {
                label: elemName + ' Forecasts',
                data,
                borderColor,
                backgroundColor,
            }
        }
    )
    return {
        labels: axisXLabels,
        datasets: datasets1.concat(datasets2)
    };
}

export const getChartsDatasetsWithForecastsTotalCount = (label, data1, axisXLabels, data2) => {
    const datasets1 = Object.keys(data1).map(elemName => {
            const borderColor = getRandomColor(0.4)
            const backgroundColor = getRandomColor(0.9)
            const countByDate = data1[elemName].reduce((acc, currentValue) => {
                acc[currentValue.date] = currentValue.totalCounts
                return acc
            }, {})
            const data = axisXLabels.map(date => countByDate[date] ? countByDate[date] : undefined)
            return {
                label: elemName,
                data,
                borderColor,
                backgroundColor,
            }
        }
    )
    const datasets2 = Object.keys(data2).map(elemName => {
            const borderColor = getRandomColor(0.4)
            const backgroundColor = getRandomColor(0.9)
            const countByDate = data2[elemName].reduce((acc, currentValue) => {
                acc[currentValue.date] = currentValue.totalCounts
                return acc
            }, {})
            const data = axisXLabels.map(date => countByDate[date] ? countByDate[date] : undefined)
            return {
                label: elemName + ' Forecasts',
                data,
                borderColor,
                backgroundColor,
            }
        }
    )
    return {
        labels: axisXLabels,
        datasets: datasets1.concat(datasets2)
    };
}
