import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOffers, getAllRequests } from "../Redux/actions";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import Search from "./Search";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import mapStyles from "./mapstyles";

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

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

export default function Map({ searchOnly, handleChangeInSearch }) {
    const [markersOffer, setMarkersOffer] = useState([]);
    const [markersReq, setMarkersReq] = useState([]);
    const [markersReqChecked, setMarkersReqChecked] = useState(false);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: secrets.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    // { lat: 52.52233, lng: 13.41274 }
    // const [latLng, setLatLng] = useState();

    const offers = useSelector((state) => state.allOffers && state.allOffers);
    const requests = useSelector(
        (state) => state.allRequests && state.allRequests
    );

    useEffect(() => {
        console.log("offers  in use:", offers, isLoaded);
        if (!offers || !isLoaded || searchOnly) return;
        // setMarkersOfferChecked(true);
        offers.forEach(async (offer) => {
            const { lat, lng } = await getLatLngFromAddress(offer.location);
            setMarkersOffer((current) => {
                if (current.find((cur) => cur.id === offer.id)) {
                    return current;
                }
                return [
                    ...current,
                    {
                        lat,
                        lng,
                        id: offer.id,
                    },
                ];
            });
        });
    }, [offers, isLoaded, searchOnly]);

    useEffect(() => {
        if (!requests || !isLoaded || searchOnly || markersReqChecked) return;
        setMarkersReqChecked(true);

        requests.forEach(async (request) => {
            const { lat, lng } = await getLatLngFromAddress(request.location);
            setMarkersReq((current) => {
                if (current.find((cur) => cur.id === request.id)) {
                    return current;
                }
                return [
                    ...current,
                    {
                        lat,
                        lng,
                        id: request.id,
                    },
                ];
            });
        });
    }, [requests, isLoaded, searchOnly, markersReqChecked]);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log("mounted", isLoaded, offers);
        dispatch(getAllOffers());
        dispatch(getAllRequests());
    }, []);

    const getLatLngFromAddress = async (address) => {
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            return { lat, lng };
        } catch (error) {
            console.log("😱 Error in getLatLngFromAddress: ", error);
        }
    };

    const [selected, setSelected] = useState(null);
    // console.log("markersReq :", markersReq);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    const handleSearch = (props) => {
        if (handleChangeInSearch) {
            return handleChangeInSearch(props);
        }
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
                    zoom={10}
                    center={center}
                    mapStyles={mapStyles}
                    options={options}
                >
                    {markersOffer &&
                        markersOffer.map((marker, i) => (
                            <Marker
                                // key={i}
                                key={`${marker.lat}-${marker.lng}-offer`}
                                position={{
                                    lat: marker.lat,
                                    lng: marker.lng,
                                }}
                                onClick={() => {
                                    setSelected(marker);
                                }}
                                icon={{
                                    url: `/offer.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(
                                        15,
                                        15
                                    ),
                                    scaledSize: new window.google.maps.Size(
                                        45,
                                        45
                                    ),
                                }}
                            />
                        ))}
                    {markersReq &&
                        markersReq.map((marker, i) => (
                            <Marker
                                // key={i}
                                key={`${marker.lat}-${marker.lng}-req`}
                                position={{
                                    lat: marker.lat,
                                    lng: marker.lng,
                                }}
                                onClick={() => {
                                    setSelected(marker);
                                }}
                                icon={{
                                    url: `/req.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(
                                        15,
                                        15
                                    ),
                                    scaledSize: new window.google.maps.Size(
                                        45,
                                        45
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
