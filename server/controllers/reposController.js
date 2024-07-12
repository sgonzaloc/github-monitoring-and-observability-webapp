import {getFixturesReposByOrganization} from "./fixturesController.js";
import {logEvents} from "../middlewares/logger.js";
import {PIP_LIB_NAME_ERROR_TYPE} from "../config/errorTypes.js";

export const getRepos = async (organizationName) => {
    if (process.env.USE_FIXTURES_DATA === 'true') {
        const reposByOrganization = await getFixturesReposByOrganization()
        const repos = reposByOrganization[organizationName]
        return repos
    }
    const url = `https://api.github.com/users/${organizationName}/repos`
    logEvents(`API Github repos. Url: ${url}`)
    const responseRepos = await fetch(url, {
        headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            Authorization: `Bearer ${process.env.GITHUB_SECRET}`
        }
    });
    logEvents(`ResponseRepos Status: ${responseRepos.status}`)
    let repos = [];
    repos = await responseRepos.json();
    if (responseRepos.status !== 200) {
        throw {status: responseRepos.status, message: repos.message}
    }
    // logEvents(`ResponseRepos data: ${JSON.stringify(repos)}`)
    const parsedRepos = repos.map(({
                                       name,
                                       full_name: fullName,
                                       default_branch: defaultBranch,
                                       stargazers_count: stargazersCount
                                   }) => ({
        name,
        fullName,
        defaultBranch,
        stargazersCount
    }))
    return parsedRepos
}

export const getRepoFullName = (organizationName, repoName) => `${organizationName}/${repoName}`
