import express from 'express';
import {getProjectDetails} from '../controllers/projectsController.js'
import {getRepoFullName} from "../controllers/reposController.js";
import {logEvents} from "../middlewares/logger.js";

const router = express.Router();

router.get('/', async (req, res, next) => {
    const organizationName = req.query.organizationName;
    const repoName = req.query.repoName;
    const defaultBranch = req.query.defaultBranch;
    if (!organizationName || !repoName || !defaultBranch) {
        const message = !organizationName ? "Missing query organizationName" : !repoName ? "Missing query repoName" : "Missing query defaultBranch"
        return res.status(400).json({message})
    }
    let project
    try {
        const repoFullName = getRepoFullName(organizationName, repoName)
        project = await getProjectDetails(repoFullName, defaultBranch);
    } catch ({status, message}) {
        logEvents(`Error ${status}: ${message}`)
        return res.status(status).json({message})
    }
    return res.json({[repoName]: project});

});

export default router;
