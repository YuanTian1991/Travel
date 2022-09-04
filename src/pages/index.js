import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import Layout from "../components/layout/layout";
import GMap from "../components/googleMap/gmap";
import { Grid, Box, Item } from "@mui/material";

const useStyles = makeStyles((theme) => ({}));

export default function IndexPage(props) {
  const classes = useStyles();

  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={8}>
            <GMap />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
