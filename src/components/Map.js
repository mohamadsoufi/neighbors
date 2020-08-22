import React, { useState, useEffect } from "react";

// import { getUsersLocation } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
    getOtherUserProfile,
    getRequests,
    getOffers,
    getAllOffers,
    getAllRequests,
} from "../Redux/actions";

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
    margin: "0 auto",
};
const center = {
    lat: 52.52233,
    lng: 13.41274,
};
const secrets = require("../../secrets");
import mapStyles from "./mapstyles";

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};
export default function Map({ searchOnly, handleChangeInSearch }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: secrets.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    // { lat: 52.52233, lng: 13.41274 }
    const [latLng, setLatLng] = useState();

    // const [offersInMap, setOffersInMap] = useState([]);
    const offers = useSelector((state) => state.allOffers && state.allOffers);
    const requests = useSelector(
        (state) => state.allRequests && state.allRequests
    );

    useEffect(() => {
        if (!offers || !requests || !isLoaded || searchOnly) return;
        // console.log("offers :>> ", offers);
        offers.forEach(async (offer) => {
            const { lat, lng } = await getLatLngFromAddress(offer.location);
            setMarkers((current) => [
                ...current,
                {
                    lat,
                    lng,
                    time: new Date(),
                },
            ]);
        });

        requests.forEach(async (request) => {
            const { lat, lng } = await getLatLngFromAddress(request.location);
            setMarkers((current) => [
                ...current,
                {
                    lat,
                    lng,
                    time: new Date(),
                },
            ]);
        });
    }, [offers, requests, isLoaded, searchOnly]);
    // const user = useSelector((state) => (state.user ? state.user : {}));

    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(getOtherUserProfile());
        dispatch(getAllOffers());
        dispatch(getAllRequests());
        // dispatch(getRequests());
    }, []);

    const getLatLngFromAddress = async (address) => {
        try {
            const results = await getGeocode({ address });
            // console.log("results :>> ", results);
            const { lat, lng } = await getLatLng(results[0]);
            // console.log("lat :>> ", lat, lng);
            return { lat, lng };
        } catch (error) {
            console.log("😱 Error in getLatLngFromAddress: ", error);
        }
    };

    // { lat: 52.522331, lng: 13.41274 }
    const [markers, setMarkers] = useState([]);
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

    const handleSearch = (props) => {
        if (handleChangeInSearch) {
            return handleChangeInSearch(props);
        }
        // console.log("handle change in map comp gets props:", props);
    };
    return (
        <div>
            {searchOnly && <Search handleChangeInSearch={handleSearch} />}
            {!searchOnly && (
                <div className="search-container-in-map">
                    <Search handleChangeInSearch={handleSearch} />
                </div>
            )}

            {!searchOnly && (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={12}
                    center={center}
                    mapStyles={mapStyles}
                    options={options}
                    onClick={onMapClick}
                    // onLoad={passMarker}
                >
                    {markers &&
                        markers.map((marker, i) => (
                            <Marker
                                key={i}
                                // key={`${marker.lat}-${marker.lng}`}
                                position={{ lat: marker.lat, lng: marker.lng }}
                                onClick={() => {
                                    setSelected(marker);
                                }}
                                icon={{
                                    url: `/bear.svg`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(
                                        15,
                                        15
                                    ),
                                    scaledSize: new window.google.maps.Size(
                                        30,
                                        30
                                    ),
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
