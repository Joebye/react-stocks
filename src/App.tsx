import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigator, { RouteType } from './components/navigators/Navigator';
import OverviewChart from './components/pages/OverviewChart';
import HistData from './components/pages/HistData';
import routesConfig from './config/routes-config.json'


const {always} = routesConfig;

function getRoutes(): RouteType[] {
  const res: RouteType[] = [];
  res.push(...always);
  return res;
}

const App: React.FC = () => {

  const routes = getRoutes();


  return <BrowserRouter>
    <Routes>
        <Route path='/' element={<Navigator routes={routes}/>}>
          <Route path='chart' element={<OverviewChart/>}/>
          <Route path='histdata' element={<HistData/>}/>

        </Route>
  

    </Routes>
  
  </BrowserRouter>
}

export default App;
