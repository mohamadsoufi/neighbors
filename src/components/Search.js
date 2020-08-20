import React, { useState } from "react";
import { Helmet } from "react-helmet";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import { useLoadScript, GoogleMap, useGoogleMap } from "@react-google-maps/api";

const secrets = require("../../secrets.json");

const libraries = ["places"];

//  <Locate panTo={panTo} />
// <Search panTo={panTo} />

// function Locate({ panTo }) {
//     return (
//         <button
//             className="locate"
//             onClick={() => {
//                 navigator.geolocation.getCurrentPosition(
//                     (position) => {
//                         panTo({
//                             lat: position.coords.latitude,
//                             lng: position.coords.longitude,
//                         });
//                     },
//                     () => null
//                 );
//             }}
//         >
//             <img src="https://img.icons8.com/office/16/000000/compass.png" />
//         </button>
//     );
// }
const Wrapper = ({ children }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: secrets.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    return <GoogleMap>{isLoaded ? children : null}</GoogleMap>;
};
export default function Search({ panTo, handleChangeInSearch }) {
    // const map = useGoogleMap();
    console.log("props in search :", handleChangeInSearch);
    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: secrets.REACT_APP_GOOGLE_MAPS_API_KEY,
    //     libraries,
    // });
    // const mapRef = React.useRef();
    // const onMapLoad = React.useCallback((map) => {
    //     mapRef.current = map;
    // }, []);

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: {
                lat: () => 43.6532,
                lng: () => -79.3832,
            },
            radius: 100 * 1000,
            debounce: 300,
        },
        // googleMaps: map,
    });

    const handleInput = (e) => {
        setValue(e.target.value);
        handleChangeInSearch(e);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        console.log("address in search:", address);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            // panTo({ lat, lng });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    if (!ready) {
        return null;
    }

    // if (loadError) return "Error";
    // if (!isLoaded) return "Loading...";
    return (
        <div className="search">
            <Wrapper>
                <Combobox onSelect={handleSelect}>
                    <ComboboxInput
                        value={value}
                        onChange={handleInput}
                        disabled={!ready}
                        placeholder="Search your location"
                    />
                    <ComboboxPopover>
                        <ComboboxList>
                            {status === "OK" &&
                                data.map(({ id, description }) => (
                                    <ComboboxOption
                                        key={id}
                                        value={description}
                                    />
                                ))}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
            </Wrapper>
        </div>
    );
}
