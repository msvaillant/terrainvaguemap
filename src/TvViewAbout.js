import React from "react";
import { useTranslation, Trans } from "react-i18next";

import "./TvViewAbout.css";

import { serviceMail, serviceFbPage } from "./settings.json";

const TvViewAbout = () => {
  const { t } = useTranslation();

  // TODO: investigate if it is possible to render array of template string with placeholders of components
  const text = t("about.text", {
    tvmap: "terrainvaguemap",
    returnObjects: true
  }).map((par, index) => {
    return <p key={`paragraph${index}`}>{par}</p>;
  });

  return (
    <div className="tv-about-content">
      <div className="tv-about-headline">
        <Trans
          i18nKey="about.headline"
          values={{ tvmap : "terrainvaguemap" }}
        />
      </div>
      <div className="tv-about-text">{text}</div>
      <div className="tv-about-feedback">
        <Trans
          i18nKey="about.feedback"
          values={{ tvmail: serviceMail }}
          components={[
            <a className="tv-hyperlink" href={serviceFbPage}>
              {serviceFbPage}
            </a>,
            <a className="tv-hyperlink" href={`mailto:${serviceMail}`}>
              {serviceMail}
            </a>
          ]}
        />
      </div>
    </div>
  );
};

export default TvViewAbout;
