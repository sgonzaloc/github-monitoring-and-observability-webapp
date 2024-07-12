import {getFixturesStargazers} from "./fixturesController.js";
import {logEvents, logEventsAsync} from "../middlewares/logger.js";
import {getPaginationParams} from "../dataHelpers/pagination.js";
import {calculateCountsBetweenDates, getDaysArray} from "../dataHelpers/dates.js";

async function getStargazerCurrentPage(urlCurrentPage, repoFullName, quantilePage) {
    if (process.env.USE_FIXTURES_DATA === 'true') {
        const stargazersByRepo = await getFixturesStargazers()
        const stargazersByPage = stargazersByRepo[repoFullName]
        const stargazersFoundCurrentPage = stargazersByPage.find(e => Number(e.page) === quantilePage)
        if (stargazersFoundCurrentPage) {
            return stargazersFoundCurrentPage.data
        }
        return []
    } else {
        logEvents(`API Github repos. urlCurrentPage: ${urlCurrentPage}`)
        const responseCurrentPage = await fetch(urlCurrentPage, {
            headers: {
                Accept: 'application/vnd.github.v3.star+json',
                'X-GitHub-Api-Version': '2022-11-28',
                Authorization: `Bearer ${process.env.GITHUB_SECRET}`
            }
        })
        const stargazersCurrentPage = await responseCurrentPage.json();
        return stargazersCurrentPage.map(elem => ({date: elem.starred_at.substring(0, 10)}))
    }
}

async function getCountsByDate(urlCurrentPage, repoFullName, quantilePage, perPage) {
    let prevTotalCounts = (quantilePage - 1) * perPage
    const stargazersCurrentPage = await getStargazerCurrentPage(urlCurrentPage, repoFullName, quantilePage)
    if (stargazersCurrentPage.length === 0) {
        return {}
    }
    const stargazerPageStartDate = stargazersCurrentPage[0].date;
    const stargazerPageEndDate = stargazersCurrentPage[stargazersCurrentPage.length - 1].date;
    const stargazerPageDates = getDaysArray(new Date(stargazerPageStartDate), new Date(stargazerPageEndDate))
    let stargazerCountsByDate = {}
    stargazerPageDates.forEach((date) => {
        const foundIndex = stargazersCurrentPage.findIndex(elem => elem.date === date)
        let totalCounts
        let count
        if (foundIndex !== -1) {
            totalCounts = (quantilePage - 1) * perPage + foundIndex + 1
            count = totalCounts - prevTotalCounts
        } else {
            totalCounts = prevTotalCounts
            count = 0
        }
        prevTotalCounts = totalCounts
        stargazerCountsByDate[date] = {count, totalCounts}
    });
    return stargazerCountsByDate
}

export const getStargazersCounts = async (repoFullName, stargazersCount = 0) => {
    let stargazersCounts = []
    const {perPage, pagesCount, quantileStep} = getPaginationParams(stargazersCount);
    let quantilePage = 1
    let stargazerCountsByDate = {};

    let urlCurrentPagesToFetch = []
    while (quantilePage <= pagesCount) {
        const urlCurrentPage = `https://api.github.com/repos/${repoFullName}/stargazers?page=${quantilePage}&per_page=${perPage}`
        urlCurrentPagesToFetch.push({urlCurrentPage, quantilePage})
        quantilePage = quantilePage + quantileStep
    }
    await Promise.all(urlCurrentPagesToFetch.map(async ({urlCurrentPage, quantilePage}) => {
        const stargazerCountsByDateByPage = await getCountsByDate(urlCurrentPage, repoFullName, quantilePage, perPage);
        stargazerCountsByDate = {...stargazerCountsByDate, ...stargazerCountsByDateByPage}
    }))

    const today = new Date().toISOString().slice(0, 10)
    stargazerCountsByDate[today] = {count: 0, totalCounts: stargazersCount}

    const stargazerDates = Object.keys(stargazerCountsByDate)
    stargazersCounts = stargazerDates.map(date => {
        const count = stargazerCountsByDate[date].count
        const totalCounts = stargazerCountsByDate[date].totalCounts
        return ({date, count, totalCounts})
    })

    return stargazersCounts;
}