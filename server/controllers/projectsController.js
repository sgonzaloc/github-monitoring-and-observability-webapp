import {getFixturesProjectByRepo, getFixturesProjectDownloadsByProject} from "./fixturesController.js";
import {logEvents} from "../middlewares/logger.js";
import {GITHUB_REPO_NAME_NOT_FOUND_ERROR_TYPE, PIP_LIB_NAME_ERROR_TYPE} from "../config/errorTypes.js";

export const getProjectDetails = async (repoFullName, defaultBranch) => {
    if (process.env.USE_FIXTURES_DATA === 'true') {
        const projectByRepo = await getFixturesProjectByRepo()
        const project = projectByRepo[repoFullName]
        if (!project || project.type !== 'Python') {
            throw {status: 404, message: PIP_LIB_NAME_ERROR_TYPE}
        }
        return project
    }
    const url = `https://github.com/${repoFullName}/raw/${defaultBranch}/settings.ini`
    logEvents(`Github project details. Url: ${url}`)
    const responseProject = await fetch(url);
    logEvents(`ResponseProject Status: ${responseProject.status}`)
    let type = 'Other'
    let project
    if (responseProject.status === 200) {
        project = await responseProject.text();
        // logEvents(`ResponseProject data: ${JSON.stringify(project)}`)
        type = 'Python'
        project = project.replaceAll(" ", "")
        const match = project.match(/(?<=lib_name=).*?(?=\n)/gs)
        if (match.length > 0) {
            const pipName = match[0]
            project = {type, pipName}
        } else {
            throw {status: 404, message: PIP_LIB_NAME_ERROR_TYPE}
        }
    }
    if (responseProject.status === 404) {
        throw {status: 404, message: GITHUB_REPO_NAME_NOT_FOUND_ERROR_TYPE}
    }
    return project;
}

export const getProjectDownloadsCounts = async (projectName) => {
    if (process.env.USE_FIXTURES_DATA === 'true') {
        const projectDownloadsByProject = await getFixturesProjectDownloadsByProject()
        const projectDownloads = projectDownloadsByProject[projectName]
        return projectDownloads
    }
    const url = `https://api.pepy.tech/api/v2/projects/${projectName}`
    logEvents(`API Pepy.tech downloads. Url: ${url}`)
    const responseDownloads = await fetch(url, {
        headers: {
            'X-Api-Key': process.env.PEPYTECH_API_KEY
        }
    });
    logEvents(`ResponseDownloads Status: ${responseDownloads.status}`)
    let dataCounts = []
    if (responseDownloads.status === 200) {
        const projectDownloads = await responseDownloads.json();
        // logEvents(`ResponseDownloads data: ${JSON.stringify(projectDownloads)}`)
        const {downloads} = projectDownloads

        const downloadDates = Object.keys(downloads);
        let totalCounts = 0
        dataCounts = downloadDates.map(date => {
            const count = Object.values(downloads[date] || {}).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            totalCounts = totalCounts + count
            return ({date, count, totalCounts})
        })
    }
    return dataCounts;
}