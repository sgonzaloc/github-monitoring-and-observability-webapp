import express from 'express';
import {getRepoFullName, getRepos} from "../controllers/reposController.js";
import {
    getProjectDetails,
    getProjectDownloadsCounts,
} from "../controllers/projectsController.js";
import {calculateCountsBetweenDates, getDaysArray} from "../dataHelpers/dates.js";
import {logEvents} from "../middlewares/logger.js";
import {getFixturesProjectByRepo} from "../controllers/fixturesController.js";
import {PIP_LIB_NAME_ERROR_TYPE} from "../config/errorTypes.js";
import {getStargazersCounts} from "../controllers/stargazersController.js";

const router = express.Router();

router.get('/repos', async (req, res, next) => {
    const repoFullName = req.query.repoFullName;
    const defaultBranch = req.query.defaultBranch;
    if (!repoFullName || !defaultBranch) {
        const message = !repoFullName ? "Missing query repoFullName" : "Missing query defaultBranch"
        return res.status(400).json({message})
    }
    let projectDownloadsCounts = {}
    try {
        const project = await getProjectDetails(repoFullName, defaultBranch);
        if (project) {
            const projectName = project.pipName;
            const downloadsCounts = await getProjectDownloadsCounts(projectName);
            const downloadStartDate = downloadsCounts[0].date;
            const downloadEndDate = downloadsCounts[downloadsCounts.length - 1].date;
            projectDownloadsCounts = calculateCountsBetweenDates(downloadStartDate, downloadEndDate, downloadsCounts);
        }
    } catch ({status, message}) {
        logEvents(`Error ${status}: ${message}`)
        return res.status(status).json({message})
    }
    res.json({[repoFullName]: projectDownloadsCounts});
});
router.get('/organizations/:organizationName?', async (req, res, next) => {
    const organizationName = req.params.organizationName;
    if (!organizationName) {
        res.status(400).json({message: "Missing param organizationName"})
        return
    }
    let organizationDownloadsCounts
    try {
        if (process.env.USE_FIXTURES_DATA === 'true') {
            const downloadsCounts = await getProjectDownloadsCounts(organizationName);
            const downloadStartDate = downloadsCounts[0].date;
            const downloadEndDate = downloadsCounts[downloadsCounts.length - 1].date;
            organizationDownloadsCounts = calculateCountsBetweenDates(downloadStartDate, downloadEndDate, downloadsCounts);
            return res.json({[organizationName]: organizationDownloadsCounts});
        }
        let reposDownloadsCounts = {}
        const parsedRepos = await getRepos(organizationName);

        const downloadsToCount = parsedRepos.map(repo => {
            const repoName = repo.name;
            const defaultBranch = repo.defaultBranch;
            const repoFullName = getRepoFullName(organizationName, repoName)
            return ({repoName, repoFullName, defaultBranch})
        })

        await Promise.all(downloadsToCount.map(async ({repoName, repoFullName, defaultBranch}) => {
            let project
            try {
                project = await getProjectDetails(repoFullName, defaultBranch);
            } catch ({status, message}) {
                logEvents(`Error ${status}: ${message}`)
            }
            if (project) {
                const projectName = project.pipName;
                const projectDownloadsCounts = await getProjectDownloadsCounts(projectName);
                reposDownloadsCounts[repoName] = projectDownloadsCounts
            }
        }))


        const startDates = Object.keys(reposDownloadsCounts).map(orgName => new Date(reposDownloadsCounts[orgName][0].date))
        const startDate = new Date(Math.min(...startDates)).toISOString().slice(0, 10)
        const endDates = Object.keys(reposDownloadsCounts).map(orgName => new Date(reposDownloadsCounts[orgName][reposDownloadsCounts[orgName].length - 1].date))
        const endDate = new Date(Math.min(...endDates)).toISOString().slice(0, 10)


        const daysArray = getDaysArray(new Date(startDate), new Date(endDate))
        let totalCounts = 0;
        organizationDownloadsCounts = daysArray.map(date => {
            let count = 0
            Object.keys(reposDownloadsCounts).forEach(repoName => {
                const repoDownloadsCounts = reposDownloadsCounts[repoName]
                const downloadsFound = repoDownloadsCounts.find(e => e.date === date)
                if (downloadsFound) {
                    count += downloadsFound.count
                    totalCounts += downloadsFound.count
                }
            })
            return ({date, count, totalCounts})
        })
    } catch ({status, message}) {
        logEvents(`Error ${status}: ${message}`)
        return res.status(status).json({message})
    }

    res.json({[organizationName]: organizationDownloadsCounts});
});

export default router;
