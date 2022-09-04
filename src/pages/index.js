import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

// import { Typography, Box, Paper, Grid, Chip, Avatar } from "@mui/material";

import { Link, graphql, navigate } from "gatsby";

import Layout from "../components/layout/layout";

const useStyles = makeStyles((theme) => ({}));

export default function IndexPage(props) {
  const classes = useStyles();

  return <Layout>{/* <h1>Hello World!</h1> */}</Layout>;
}
