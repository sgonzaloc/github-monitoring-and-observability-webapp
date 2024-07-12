import './App.css';
import {Route, Routes} from 'react-router-dom'
import DrawerAppNav from './components/DrawerAppNav'
import MonitorMain from "./containers/MonitorMain";
import DashboardSection from "./containers/DashboardSection";
import DownloadsSection from "./containers/DownloadsSection";
import StargazersSection from "./containers/StargazersSection";
import DownloadsForecastsSection from "./containers/DownloadsForecastsSection";
import StargazersForecastsSection from "./containers/StargazersForecastsSection";
import * as React from "react";

const App = () => {

    return <Routes>
        <Route element={<DrawerAppNav/>}>
            <Route element={<MonitorMain/>}>
                <Route index element={<DashboardSection/>}/>
                <Route path="downloads" element={<DownloadsSection/>}/>
                <Route path="stargazers" element={<StargazersSection/>}/>
                <Route path="downloads-forecasts" element={<DownloadsForecastsSection/>}/>
                <Route path="stargazers-forecasts" element={<StargazersForecastsSection/>}/>
            </Route>
        </Route>
    </Routes>
}


export default App;
