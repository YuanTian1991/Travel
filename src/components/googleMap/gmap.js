import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Button } from "@mui/material";

const useStyles = makeStyles((theme) => ({}));

export default function GMap(props) {
  const classes = useStyles();

  const [center, setCenter] = useState({
    lat: 51.38488,
    lng: -2.36197,
  });

  const containerStyle = {
    width: "100%",
    height: window.innerHeight - 105,
  };

  return (
    <div>
      <div
        style={{
          height: window.innerHeight - 105,
          width: "100%",
          borderLeft: "1px solid lightgrey",
        }}
      >
        <LoadScript googleMapsApiKey="AIzaSyABOXEuLxQiTzfcfUP6w-DxVNo58z7vdqY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
