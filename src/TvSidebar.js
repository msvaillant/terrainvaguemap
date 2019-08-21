import React from 'react';
import './TvSidebar.css'

import TvLogo from './TvLogo';

function TvSidebar({ 
    routes = [],
    appName = ""
}) {
    let routeNavItems = routes.map(route => 
        <div key={route.name} className="tv-navigation-item">
            <a>{route.name}</a>
        </div>
    );

    return (
        <nav className="tv-navigator-content">
            <div className="tv-header">
                <div className="logo-container">
                    <div className="logo">
                        <TvLogo />
                    </div>
                </div>
            </div>
            <div className="tv-navigation">
                {routeNavItems}
            </div>

            <div className="tv-footer">
                <div className="tv-copyright">
                    <p>&copy;2019</p>
                    <p>{appName}</p>
                </div>
                <div className="tv-language">
                    <div className="tv-language-placeholder">
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default TvSidebar;