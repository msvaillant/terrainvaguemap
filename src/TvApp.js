import React from 'react';
import { Router } from '@reach/router'

import TvSidebar from './TvSidebar';
import TvViewMap from './TvViewMap';
import TvViewAbout from './TvViewAbout';
import TvViewContact from './TvViewContact';

import './i18n';

import './TvApp.css';
const routes = [
  {
    name: "menu.about",
    link: "/about"
  },
  {
    name: "menu.contact",
    link: "/contact"
  }
];

const TvApp = (props) => {
  const appName = "Terrain vague";

  return (
    <div className="tv-app">
      <div className="tv-sidebar">
        <TvSidebar appName={appName} routes={routes}/>
      </div>

      <div className="tv-content">
        <Router>
          <TvViewMap path="/"/>
          <TvViewAbout path="/about" />
          <TvViewContact path="/contact" />
        </Router>
      </div>
    </div>
  );
}

export default TvApp;
