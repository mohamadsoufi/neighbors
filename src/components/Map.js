import React, { useState, useEffect } from "react";

// import { getUsersLocation } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getRequests, getOffers } from "../Redux/actions";

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import Search from "./Search";

import { getGeocode, getLatLng } from "use-places-autocomplete";

const libraries = ["places"];
const mapContainerStyle = {
    width: "500px",
    height: "500px",
};
const center = {
    lat: 52.52233,
    lng: 13.41274,
};
const secrets = require("../../secrets");
import mapStyles from "./mapstyles";
// import "@reach/combobox/styles.css";

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};
//const geocoder = new window.google.maps.Geocoder();
export default function Map({ searchOnly, handleChangeInSearch }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
        dispatch(getOffers());
        dispatch(getRequests());
    }, []);
    const user = useSelector((state) => (state.user ? state.user : {}));
    const offers = useSelector(
        (state) =>
            state.offers &&
            state.offers.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            )
    );

    const requests = useSelector(
        (state) =>
            state.requests &&
            state.requests.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            )
    );

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: secrets.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [markers, setMarkers] = useState([{ lat: 52.522331, lng: 13.41274 }]);
    const [selected, setSelected] = useState(null);
    const onMapClick = React.useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    const handleSelect = async (address) => {
        // setValue(addr, false);
        // clearSuggestions();
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            console.log("lat,lng :", lat, lng);
            // if ((lat, lng)) {
            //     setMarkers((current, lat, lng) => [
            //         ...current,
            //         {
            //             lat,
            //             lng,
            //             time: new Date(),
            //         },
            //     ]);
            // }
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };
    // if (offers) {
    //     let offerLocation = offers[0].location;
    //     console.log("offerLocation:", offerLocation);
    //     handleSelect(offerLocation);
    // }
    // handleSelect(offerLocation);

    const handleSearch = (props) => {
        if (handleChangeInSearch) {
            return handleChangeInSearch(props);
        }
        console.log("handle change in map comp gets props:", props);
    };

    return (
        <div>
            <Search handleChangeInSearch={handleSearch} />

            {!searchOnly && (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={12}
                    center={center}
                    mapStyles={mapStyles}
                    options={options}
                    onClick={onMapClick}
                >
                    {markers &&
                        markers.map((marker) => (
                            <Marker
                                key={`${marker.lat}-${marker.lng}`}
                                position={{ lat: marker.lat, lng: marker.lng }}
                                onClick={() => {
                                    setSelected(marker);
                                }}
                            />
                        ))}
                    {selected ? (
                        <InfoWindow
                            position={{ lat: selected.lat, lng: selected.lng }}
                            onCloseClick={() => {
                                setSelected(null);
                            }}
                        >
                            <div>
                                <h2>req/offer</h2>
                            </div>
                        </InfoWindow>
                    ) : null}
                </GoogleMap>
            )}
        </div>
    );
}
