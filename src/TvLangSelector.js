import React from 'react';
import { useTranslation } from 'react-i18next';

import './TvLangSelector.css';

const TvLangSelector = () => {
    const { i18n } = useTranslation();
    const isCurrent = (lang) => i18n.language === lang ? 'current-lang' : null

    return (
        <div className="tv-langselector">
            <button className={ isCurrent('ua') } onClick={ (event) => { i18n.changeLanguage('ua') }}>укр</button>
            <button className={ isCurrent('en') } onClick={ (event) => { i18n.changeLanguage('en') }}>eng</button>
        </div>
    );
};

export default TvLangSelector;