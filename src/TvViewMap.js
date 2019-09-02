import React, { useState /*, useCallback*/ } from "react";
import ReactMapboxGl, { ZoomControl, Popup } from "react-mapbox-gl";
import Slider from "react-slick";

import "./TvViewMap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import resources from "./resources.json";
import { accessToken } from "./settings.json";

const minZoom = 12;
const maxZoom = 19;
const Map = ReactMapboxGl({
  accessToken,
  minZoom,
  maxZoom
});

const flyToOptions = {
  speed: 0.8
};
const initialLongitude = 35.051303,
  initialLatitude = 48.45959;
const citeZoom = 14;


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

    setLocation(coordinates);
    setZoomState([citeZoom]);
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

  const settings = {
    dots: true,
    infinite: true,
    nextArrow: <TvSliderArrow />,
    prevArrow: <TvSliderArrow />
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
        flyToOptions={flyToOptions}
      >
        <ZoomControl position="bottom-right" />
        {popupState && (
          <Popup coordinates={popupState.coordinates}>
            <div className="place-info">
              <button
                style={{
                  background: "transparent",
                  border: 0,
                  float: "right",
                  cursor: "pointer"
                }}
                onClick={() => {
                  setPopupState(undefined);
                }}
              >
                x
              </button>
              <h3 className="nam">{popupState.info.name}</h3>
              <p className="adr">{popupState.info.adresse}</p>
              <p className="desc">{popupState.info.description}</p>
              <p className="status">{popupState.info.status}</p>
              <p className="state">{popupState.info.state}</p>
              {popupState.info.pictures && popupState.info.pictures.length > 0 && (
                <div
                  style={{
                    padding: 20
                  }}
                >
                  <Slider {...settings}>
                    {popupState.info.pictures.map((picture, idx) => (
                      <img key={idx} src={picture}></img>
                    ))}
                  </Slider>
                </div>
              )}
              <p className="upd">{popupState.info.update}</p>
              <p className="last_upd">{popupState.info.lastUpdated}</p>
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
}

export default TvViewMap;
