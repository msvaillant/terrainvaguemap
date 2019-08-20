import React from 'react';
import TvLogo from './AppLogo';
import './App.css';

function App() {
  return (
    <div className="tv-app">
      <div className="tv-navigator">
        <div className="tv-navigator-content">
          <div className="tv-header">
            <div className="logo-container">
              <div className="logo">
                <TvLogo />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tv-content">
      </div>
    </div>
  );
}

export default App;
