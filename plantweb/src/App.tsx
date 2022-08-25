import React, { } from 'react';

import './App.css';
import { BrowserRouter } from 'react-router-dom';

import { PATHS } from 'shared/constants';

import { Routes } from 'components/routes';

import { NavTab } from './modules/header';
import {Box, Tabs} from '@mui/material';


// const headerProps: AppHeaderProps = {
//   title: 'J.A.R.V.I.S Plant Health Monitoring System',
//   description: 'Log, track and care for your plants helath',
//   links: [
//     {label: 'Plants',
//     route: '/plants',},
//     {label: 'Rooms',
//     route: '/rooms',},
//     {label: 'Sensors',
//     route: '/sensors',},
//   ],
// };

function App() {

  const {
    value,
    LinkTab,
    
  } = NavTab();

  return (
    <BrowserRouter basename={PATHS.root}>
      <div className="App">
      J.A.R.V.I.S Plant Health Monitoring System
      <p> Log, track and care for your plants helath</p>
      <div>
      <Box sx={{ width: '100%' }}>
       <Tabs value={value} aria-label="nav tabs example">
         <LinkTab label="Plant Page" href={PATHS.plants} />
         <LinkTab label="Rooms Page" href={PATHS.rooms} />
         <LinkTab label="Sensor Page" href={PATHS.sensors} />
       </Tabs>
     </Box>
    </div>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
