import React, { useState } from 'react';
import ReactMapboxGl, { ZoomControl, Popup } from "react-mapbox-gl";

import './TvViewMap.css';
import { accessToken } from './settings.json';

const initialLongitude = 35.051303,
    initialLatitude = 48.45959;
const minZoom = 12;
const maxZoom = 19;
const Map = ReactMapboxGl({
    accessToken,
    minZoom,
    maxZoom
});


const TvViewMap = () => {
    const [popupState, setPopupState] = useState({
        isPopupOpen: false,
        coordinates: [],
        info: {
            name: '',
            adresse: '',

            description: '',
            status: '',
            state: '',

            update: '',
            lastUpdated: ''
        }
    });

    const _onclick = (map, event) => {
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
        console.log(feature.geometry.coordinates[0], coordinates);
        const newPopupState = {
            isPopupOpen: true,
            coordinates: coordinates,
            info: {
                name: feature.properties.name,
                adresse: feature.properties.adresse,

                description: feature.properties.description,
                status: feature.properties.status,
                state: feature.properties.state,

                update: feature.properties.update,
                lastUpdated: feature.properties.last_upd
            }
        };

        console.log(newPopupState);
        setPopupState(newPopupState);
    };

    const _onMapLoad = (map) => {
        const layer = map.querySourceFeatures('composite', {
            sourceLayer: 'bt6'
        });
        console.log(layer);
    };

    return (
        <>
            <Map
                //eslint-disable-next-line
                style='mapbox://styles/shevchenko45/cj8lwywy96cs72sn45pim7gi9'
                containerStyle={{
                    height: '100vh',
                    width: '100%'
                }}
                center={[initialLongitude, initialLatitude]}
                rendeWorldCopies={false}
                onStyleLoad={_onMapLoad}
                onClick={_onclick}
            >
                <ZoomControl position='bottom-right' />
                {popupState.isPopupOpen && (
                    <Popup coordinates={popupState.coordinates}>
                        <div className="place-info">
                            <h3 className="nam">{popupState.info.name}</h3>
                            <p className="adr">{popupState.info.adresse}</p>
                            <p className="desc">{popupState.info.description}</p>
                            <p className="status">{popupState.info.status}</p>
                            <p className="state">{popupState.info.state}</p>
                            {/* Here should be carousel with images*/}
                            <p className="upd">{popupState.info.update}</p>
                            <p className="last_upd">{popupState.info.lastUpdated}</p>
                        </div >
                    </Popup>
                )
                }
            </Map>
        </>
    );
};

export default TvViewMap;