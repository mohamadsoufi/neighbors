import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllOffers,
    getAllRequests,
    getOtherUserProfile,
} from "../Redux/actions";
import { BrowserRouter, Route, Link } from "react-router-dom";

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
    width: "800px",
    height: "360px",
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
    const [selected, setSelected] = useState(null);

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
        // console.log("offers  in use:", offers, isLoaded);
        if (!offers || !offers.length || !isLoaded || searchOnly) return;
        // setMarkersOfferChecked(true);
        offers.forEach((offer, i) => {
            setTimeout(async () => {
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
                            senderId: offer.sender_id,
                            meal: offer.meal,
                            quantity: offer.quantity,
                            date: offer.date,
                        },
                    ];
                });
            }, 200 * i);
        });
    }, [offers, isLoaded, searchOnly]);

    useEffect(() => {
        if (!requests || !requests.length || !isLoaded || searchOnly) return;

        requests.forEach((request, i) => {
            setTimeout(async () => {
                const { lat, lng } = await getLatLngFromAddress(
                    request.location
                );

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
                            senderId: request.sender_id,
                            date: request.date,
                            quantity: request.quantity,
                            req: true,
                        },
                    ];
                });
            }, 100 * i);
        });
    }, [requests, isLoaded, searchOnly]);

    console.log("selected :", selected);
    const dispatch = useDispatch();
    useEffect(() => {
        // console.log("mounted", isLoaded, offers);
        dispatch(getAllOffers());
        dispatch(getAllRequests());
    }, []);

    useEffect(() => {
        if (!selected) return;
        dispatch(getOtherUserProfile(selected.senderId));
    }, [selected]);
    const user = useSelector((state) => (state.user ? state.user : {}));
    let { id, first, last, email, profile_pic: imgUrl, bio } = user;

    const getLatLngFromAddress = async (address) => {
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);

            return { lat, lng };
        } catch (error) {
            console.log("😱 Error in getLatLngFromAddress: ", error);
        }
    };

    // console.log("markersReq :", markersReq);
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    const handleSearch = (props) => {
        if (handleChangeInSearch) {
            return handleChangeInSearch(props);
        }
    };

    // const checkReqOrOffer = () => {
    //    if()
    //         !selected.req && (
    //             <div>
    //                 <h2>
    //                     {first} {last}
    //                 </h2>
    //                 <h4>meal: {selected.meal}</h4>
    //                 <h4>quantity: {selected.quantity}</h4>
    //                 <Link to={`/offers/${selected.id}`}>see more ...</Link>
    //             </div>
    //         );

    // };

    return (
        <div>
            {searchOnly && (
                <div className="search-container-in-map">
                    <Search handleChangeInSearch={handleSearch} />
                </div>
            )}

            {!searchOnly && (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={11}
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
                                        36,
                                        36
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
                                        43,
                                        43
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
                            {!selected.req ? (
                                <div>
                                    <div className="infoWindow-name-img-container">
                                        <img
                                            className="profile-pic-header"
                                            src={imgUrl}
                                        />

                                        <h2>
                                            {first} {last}
                                        </h2>
                                    </div>
                                    <h4>offered on: {selected.date}</h4>
                                    <h4>meal: {selected.meal}</h4>
                                    <h4>quantity: {selected.quantity}</h4>
                                    <Link to={`/offers/${id}`}>
                                        see more ...
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <div className="infoWindow-name-img-container">
                                        <img
                                            className="profile-pic-header"
                                            src={imgUrl}
                                        />

                                        <h2>
                                            {first} {last}
                                        </h2>
                                    </div>
                                    <h4>Requested on: {selected.date}</h4>
                                    <h4>quantity: {selected.quantity}</h4>
                                    <Link to={`/requests/${id}`}>
                                        see more ...
                                    </Link>
                                </div>
                            )}
                        </InfoWindow>
                    ) : null}
                </GoogleMap>
            )}
        </div>
    );
}
