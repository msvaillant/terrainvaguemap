import React from 'react';
import { Router } from '@reach/router'

import TvSidebar from './TvSidebar';
import TvViewMap from './TvViewMap';
import TvViewAbout from './TvViewAbout';
import TvViewContact from './TvViewContact';

import './TvApp.css';
class TvApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: "Terrain vague",
      routes : [
        {
          name: "menu.about",
          link: "/about"
        },
        {
          name: "menu.contact",
          link: "/contact"
        }
      ]
    }
  }

  render() {
    return (
      <div className="tv-app">
        <div className="tv-sidebar">
          <TvSidebar appName={this.state.appName} routes={this.state.routes}/>
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
}

export default TvApp;
