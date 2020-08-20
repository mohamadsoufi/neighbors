import React from "react";
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
export default function Search({ panTo, handleChangeInSearch }) {
    // console.log("props in search :", handleChangeInSearch);

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
    });

    const handleInput = (e) => {
        setValue(e.target.value);
        handleChangeInSearch(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        console.log("address in search:", address);
        handleChangeInSearch(address);
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

    return (
        <div className="search">
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
                                    key={id + description}
                                    value={description}
                                />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}
