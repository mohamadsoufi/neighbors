import React, { useState, useEffect } from "react";

import { getUsersLocation } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import Search from "./Search";

// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";

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
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};
//const geocoder = new window.google.maps.Geocoder();
export default function Map() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsersLocation());
    }, []);
    const offers = useSelector(
        (state) =>
            state.offers &&
            state.offers.sort(
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

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    // const handleSelect = async (address) => {
    //     // setValue(addr, false);
    //     // clearSuggestions();
    //     try {
    //         const results = await getGeocode({ address });
    //         const { lat, lng } = await getLatLng(results[0]);
    //         console.log("lat,lng :", lat, lng);
    //         console.log("results[0] :", results[0]);
    //     } catch (error) {
    //         console.log("😱 Error: ", error);
    //     }
    // };
    // handleSelect("Berlin");

    return (
        <div>
            <Search />

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                mapStyles={mapStyles}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
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
        </div>
    );
}
