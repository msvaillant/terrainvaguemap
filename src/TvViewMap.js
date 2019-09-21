import React, { useState /*, useCallback*/ } from "react";
import ReactMapboxGl, { ZoomControl, Popup } from "react-mapbox-gl";
import Slider from "react-slick";

import "./TvViewMap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// TODO: fix resources loading in bundle, they should be requested after page load
// TODO: investigate mapbox in app layer creation
import resources from "./resources.json";
import { accessToken } from "./settings.json";

const minZoom = 12;
const maxZoom = 19;
const Map = ReactMapboxGl({
  accessToken,
  minZoom,
  maxZoom
});

const initialLongitude = 35.051303,
  initialLatitude = 48.45959;

function TvCross(props) {
  return (
    <div {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 15 15"
      >
        <g id="cross-out-mark" transform="translate(-.024)">
          <g id="Groupe_16" data-name="Groupe 16" transform="translate(.024)">
            <path
              id="Tracé_25"
              d="M15.024 1.162L13.864 0l-6.34 6.339L1.185 0 .024 1.161 6.364 7.5l-6.34 6.339L1.185 15l6.34-6.34L13.864 15l1.16-1.162L8.685 7.5z"
              style={{ fill: "#d0d0d0" }}
              data-name="Tracé 25"
              transform="translate(-.024)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TvSliderArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} tv-map-arrow`}
      style={style}
      onClick={onClick}
    />
  );
}

function TvMapPopup({ coordinates, info, onPopupClose }) {
  const settings = {
    dots: true,
    infinite: true,
    nextArrow: <TvSliderArrow />,
    prevArrow: <TvSliderArrow />
  };

  return (
    <Popup coordinates={coordinates}>
      <div className="place-info">
        <div className="place-close">
          <TvCross className="cross" onClick={onPopupClose} />
        </div>
        <div className="place-info-content">
          <h3 className="nam">{info.name}</h3>
          <p className="adr">{info.adresse}</p>
          <p className="desc">{info.description}</p>
          <p className="status">{info.status}</p>
          <p className="state">{info.state}</p>
          {info.pictures && info.pictures.length > 0 && (
            <div
            // style={{
            //   padding
            // }}
            >
              <Slider {...settings}>
                {info.pictures.map((picture, idx) => (
                  <img key={idx} src={picture}></img>
                ))}
              </Slider>
            </div>
          )}
          <p className="upd">{info.update}</p>
          <p className="last_upd">{info.lastUpdated}</p>
        </div>
      </div>
    </Popup>
  );
}

function TvViewMap() {
  const [popupState, setPopupState] = useState();
  const [location, setLocation] = useState([initialLongitude, initialLatitude]);
  const [zoomState, setZoomState] = useState([minZoom]);
  //const [geoJson, setGeoJson] = useState();

  const _onClick = (map, event) => {
    const point = event.point;

    const features = map.queryRenderedFeatures(point, {
      layers: ["bt6"]
    });

    if (!features.length) {
      return;
    }
    const feature = features[0];

    const coordinates = feature.geometry.coordinates[0].reduce(
      ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2]
    );
    //console.log(geoJson.pics[feature.properties.id]);

    const newPopupState = {
      coordinates: coordinates,
      info: {
        name: feature.properties.name,
        adresse: feature.properties.adresse,

        description: feature.properties.description,
        status: feature.properties.status,
        state: feature.properties.state,

        update: feature.properties.update,
        lastUpdated: feature.properties.last_upd,

        //pictures: geoJson.pics[feature.properties.id]
        pictures: resources.pics[feature.properties.id]
      }
    };

    setPopupState(newPopupState);
  };
  //const onClickEventHandler = useCallback(_onClick, [geoJson]);

  const _onMapLoad = async map => {
    const layer = map.querySourceFeatures("composite", {
      sourceLayer: "bt6"
    });
    // const resources = await import("./resources.json");
    // setGeoJson({
    //   pics: resources.pics
    // });
    // console.log(resources.pics);

    //Testing code for retrieving the list of features on the map
    console.log(layer);
  };

  return (
    <>
      <Map
        //eslint-disable-next-line
        style="mapbox://styles/shevchenko45/cj8lwywy96cs72sn45pim7gi9"
        containerStyle={{
          height: "100vh",
          width: "100%"
        }}
        center={location}
        zoom={zoomState}
        rendeWorldCopies={false}
        onStyleLoad={_onMapLoad}
        //onClick={onClickEventHandler}
        onClick={_onClick}
      >
        <ZoomControl position="bottom-right" />
        {popupState && (
          <TvMapPopup
            coordinates={popupState.coordinates}
            info={popupState.info}
            onPopupClose={() => {
              setPopupState(undefined);
            }}
          />
        )}
      </Map>
    </>
  );
}

export default TvViewMap;
