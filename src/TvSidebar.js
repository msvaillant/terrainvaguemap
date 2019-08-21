import React from 'react';
import { Link } from "@reach/router"

import TvLogo from './TvLogo';

import './TvSidebar.css'

const NavLink = props => {
    const isActive = ({ isCurrent }) => {
        return {
            className : isCurrent ? 'tv-link-current' : 'tv-link'
        };
    };

    return (
        <div key={props.key} className="tv-navigation-item">
            <Link {...props} getProps={ isActive } />
        </div>
    );
};

function TvSidebar({ 
    routes = [],
    appName = ""
}) {

    let routeNavItems = routes.map(route => 
        <NavLink key={route.name} to={route.link}>{route.name}</NavLink>
    );

    return (
        <nav className="tv-sidebar-content">
            <Link className="tv-header" to="/">
                <div className="logo-container">
                    <div className="logo">
                        <TvLogo />
                    </div>
                </div>
            </Link>
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