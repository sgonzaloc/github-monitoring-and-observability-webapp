import express from 'express';
import {calculateCountsBetweenDates, getDaysArray} from "../dataHelpers/dates.js";
import {getRepoFullName, getRepos} from "../controllers/reposController.js";
import {getStargazersCounts} from "../controllers/stargazersController.js";
import {logEvents, logEventsAsync} from "../middlewares/logger.js";

const router = express.Router();

router.get('/repos', async (req, res, next) => {
    const organizationName = req.query.organizationName;
    const repoName = req.query.repoName;
    const stargazersCount = Number(req.query.stargazersCount);
    if (!organizationName || !repoName || stargazersCount === undefined) {
        const message = !organizationName ? "Missing query organizationName" : !repoName ? "Missing query repoName" : "Missing query stargazersCount"
        return res.status(400).json({message})
    }
    let repoFullName
    let stargazersCounts
    try {
        repoFullName = getRepoFullName(organizationName, repoName)
        stargazersCounts = await getStargazersCounts(repoFullName, stargazersCount);
    } catch ({status, message}) {
        logEvents(`Error ${status}: ${message}`)
        return res.status(status).json({message})
    }
    res.json({[repoFullName]: stargazersCounts});
});

router.get('/organizations/:organizationName?', async (req, res, next) => {
    const organizationName = req.params.organizationName;
    if (!organizationName) {
        res.status(400).json({message: "Missing param organizationName"})
        return
    }
    let organizationStargazersCounts
    try {
        const parsedRepos = await getRepos(organizationName);
        let reposStargazersCounts = {}
        const stargazersToCount = parsedRepos.map(repo => {
            const repoName = repo.name;
            const repoFullName = getRepoFullName(organizationName, repoName)
            const stargazersCount = Number(repo.stargazersCount)
            if (stargazersCount > 0) {
                return ({repoName, repoFullName, stargazersCount})
            }
        }).filter(it => Boolean(it))

        await Promise.all(stargazersToCount.map(async ({repoName, repoFullName, stargazersCount}) => {
            const stargazerCounts = await getStargazersCounts(repoFullName, stargazersCount);
            reposStargazersCounts[repoName] = stargazerCounts
        }))

        const dates = Object.keys(reposStargazersCounts).reduce((acc, e) => acc.concat(reposStargazersCounts[e].map(e1 => e1.date)), []).sort((a, b) => new Date(a) - new Date(b))

        let lastTotalCountsByRepo = {}
        organizationStargazersCounts = dates.map(date => {
            let count = 0
            Object.keys(reposStargazersCounts).forEach(repoName => {
                const repoStargazersCounts = reposStargazersCounts[repoName].sort((a, b) => new Date(a.date) - new Date(b.date))
                const stargazersFound = repoStargazersCounts.find(e => e.date === date)
                if (stargazersFound) {
                    count += stargazersFound.count
                    lastTotalCountsByRepo[repoName] = stargazersFound.totalCounts
                }
            })
            const totalCounts = Object.values(lastTotalCountsByRepo).reduce((acc, value) => (acc + value), 0);
            return ({date, count, totalCounts})
        })
    } catch ({status, message}) {
        logEvents(`Error ${status}: ${message}`)
        return res.status(status).json({message})
    }

    res.json({[organizationName]: organizationStargazersCounts});
});


export default router;
