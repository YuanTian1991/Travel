import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { HandymanOutlined } from "@mui/icons-material";

const containerStyle = {
  width: "100%",
  height: typeof window !== "undefined" ? window.innerHeight - 105 : "100vh",
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

      map.panTo({ lat: props.selectCard.lat, lng: props.selectCard.lon });
    }
  }, [props.selectCard]);

  const handleClickMarker = (item) => {
    props.onMarkerClicked(item);
  };

  const handleCloseInfoWindow = () => {
    props.onMarkerClicked(null);
  };

  const handleClickInfoWindow = (item) => {
    props.onInfoWindowClicked(item);
  };

  const handleMapClick = () => {
    props.onMarkerClicked(null);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      // center={center}
      // zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={() => handleMapClick()}
    >
      {props.trips.map((trip, tripIndex) => {
        return (
          <Marker
            key={tripIndex}
            position={{ lat: trip.lat, lng: trip.lon }}
            onClick={() => handleClickMarker(trip)}
          />
        );
      })}
      {props.selectCard !== null && (
        <InfoWindow
          onCloseClick={() => handleCloseInfoWindow()}
          position={{
            lat: props.selectCard.lat,
            lng: props.selectCard.lon,
          }}
          style={{ padding: "0px", margin: "0px", border: "1px solid red" }}
        >
          <div style={{ paddingLeft: "6px" }}>
            <p
              style={{
                margin: "0px",
                padding: "0px",
                paddingBottom: "5px",
                fontWeight: "500",
              }}
            >
              {props.selectCard.place}
            </p>
            <img
              src={props.selectCard.imgs[0].node.childImageSharp.fluid.src}
              // src={`${item.img}?w=162&auto=format`}
              // srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
              alt={props.selectCard.place}
              // loading="lazy"
              style={{
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                // display: "block",
                width: "200px",
                margin: "0px",
              }}
              onClick={() => handleClickInfoWindow(props.selectCard)}
            />
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
