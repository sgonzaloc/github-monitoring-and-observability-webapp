import express from 'express';
import {getRepos} from '../controllers/reposController.js'
import {logEvents} from "../middlewares/logger.js";

const router = express.Router();


router.get('/', async (req, res, next) => {
    const organizationName = req.query.organizationName;
    if(!organizationName){
        return res.status(400).json({message: "Missing query organizationName"})
    }
    let parsedRepos =[]
    try {
     parsedRepos = await getRepos(organizationName);
    } catch ({status, message}) {
        logEvents(`Error ${status}: ${message}`)
        return res.status(status).json({message})
    }
    res.json(parsedRepos);
});

export default router;
