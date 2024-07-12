// getDaysArray(new Date("2018-05-01"), new Date("2018-07-01"));
export const getDaysArray = (startDate, endDate) => {
    let daysArray = []
    for (let dt = new Date(startDate); dt <= new Date(endDate); dt.setDate(dt.getDate() + 1)) {
        daysArray.push(new Date(dt).toISOString().slice(0, 10));
    }
    return daysArray;
};

export const calculateCountsBetweenDates = (startDate, endDate, data) => {
    const daysArray = getDaysArray(new Date(startDate), new Date(endDate))
    let previousTotalCounts = 0;
    const dataCounts = daysArray.map(date => {
        const dataFound = data.find(e => e.date === date)
        const count = dataFound ? dataFound.count : 0
        const totalCounts = dataFound ? dataFound.totalCounts : previousTotalCounts
        previousTotalCounts = totalCounts
        return ({date, count, totalCounts})
    })
    return dataCounts;
}

export const fillEmptyCountsBetweenDates = (startDate, endDate, data) => {
    const daysArray = getDaysArray(new Date(startDate), new Date(endDate))
    let previousTotalCounts = 0;
    const dataCounts = daysArray.map(date => {
        const dataFound = data.find(e => e.date === date)
        const count = dataFound ? dataFound.count : 0
        const totalCounts = dataFound ? dataFound.totalCounts : previousTotalCounts
        previousTotalCounts = totalCounts
        return ({date, count, totalCounts})
    })
    return dataCounts;
}

export const removeRepetitionsArray = (array) => [...new Set(array)];