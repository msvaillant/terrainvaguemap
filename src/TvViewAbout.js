import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import './TvViewAbout.css';

const TvViewAbout = () => {
    const { t } = useTranslation();
    const mail = 'project.terrainvague@gmail.com';
    const facebookPage = 'https://www.facebook.com/project.terrainvague';

    const text = t('about.text', { tvmap : 'terrainvaguemap', returnObjects: true }).map((par, index) => {
        return (
            <p key={`paragraph${index}`}>{par}</p>
        );
    });

    return (
        <div className="tv-about-content">
            <div className="headline">
                <Trans 
                i18nKey='about.headline'
                components={[
                    <span className="tv"></span>,
                    <span className="tv-map"></span>,
                    <span className="tv-phonetics"></span>
                ]}
                />
            </div>
            <div>
                {text}
            </div>                
            <div>
                <Trans 
                i18nKey='about.feedback'
                values = {{ tvmail: mail }}
                components = {[<a href={facebookPage}></a>, <a href={`mailto:${mail}`}></a>]}
                />
            </div>
        </div>
    );
};

export default TvViewAbout;