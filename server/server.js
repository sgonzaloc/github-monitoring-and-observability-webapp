import './loadDotenv.js';
import express from 'express';
import bodyParser from 'body-parser';
import corsOptions from './config/corsOptions.js'
import cors from 'cors'
import RootRoutes from './routes/index.js'
import StargazersRoutes from './routes/StargazersRoutes.js'
import DownloadsRoutes from './routes/DownloadsRoutes.js'
import ReposRoutes from './routes/ReposRoutes.js'
import ProjectRoutes from './routes/ProjectRoutes.js'
import ForecastsRoutes from './routes/ForecastsRoutes.js'
import {logger} from "./middlewares/logger.js";


const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.json({type: 'application/json'}));
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(logger)
app.use('/', RootRoutes);
app.use('/repos', ReposRoutes);
app.use('/projects', ProjectRoutes);
app.use('/downloads', DownloadsRoutes);
app.use('/stargazers', StargazersRoutes);
app.use('/forecasts', ForecastsRoutes);

const PORT = process.env.PORT || 3500
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))