import React, { useState } from "react";
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
  const [zoom, setZoom] = useState(10);
  const [zoomReset, setZoomReset] = useState(0);
  const [map, setMap] = React.useState(null);

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);
  //   setMap(map);

  //   setTimeout(() => setZoomReset(8), 100);
  // }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      // onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {props.trips.map((trip, tripIndex) => {
        return (
          <Marker
            key={tripIndex}
            position={{ lat: trip.lat, lng: trip.lon }}
            // icon={{
            //   path: "M32 2a22 22 0 0 0-6 43.1L32 62l6-16.8A22 22 0 0 0 32 2zm0 34a12 12 0 1 1 12-12 12 12 0 0 1-12 12z",
            //   fillColor: "red",
            //   fillOpacity: 0.9,
            //   scale: 0.5,
            //   // strokeColor: "grey",
            //   // strokeWeight: 2,
            // }}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
