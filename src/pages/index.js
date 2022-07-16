
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react"
import Globe from 'react-globe.gl';

import Layout from "../components/layout"

export default function IndexPage(props) {

  return (
    <Layout>
      <Box
      display="flex"
      justifyContent="center"
      // alignItems="center"
      // minHeight="100vh"
      >
        <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        width={1000}
        height={600}
       />
</Box>


      
    </Layout>
  )
}