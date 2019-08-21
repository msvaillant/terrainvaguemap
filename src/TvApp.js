import React from 'react';
import TvSidebar from './TvSidebar';
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
        </div>
      </div>
    );
  }
}

export default TvApp;
