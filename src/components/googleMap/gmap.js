import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: window.innerHeight - 105,
};

function MyComponent(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyABOXEuLxQiTzfcfUP6w-DxVNo58z7vdqY",
  });

  const [center, setCenter] = useState({
    lat: 51.38488,
    lng: -2.36197,
  });
  // const [zoom, setZoom] = useState(10);
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);

    setTimeout(() => map.setZoom(8), 50);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (props.selectCard !== null) {
      console.log(props.selectCard);
      setCenter({ lat: props.selectCard.lat, lng: props.selectCard.lon });

      map.panTo(center);
    }
  }, [props.selectCard]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      // center={center}
      // zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {props.trips.map((trip, tripIndex) => {
        return (
          <Marker key={tripIndex} position={{ lat: trip.lat, lng: trip.lon }} />
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
