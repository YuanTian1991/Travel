import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import { Link, graphql, navigate } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout/layout";
import GMap from "../components/googleMap/gmap";
import { Grid, Box, Item, Paper } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

const useStyles = makeStyles((theme) => ({}));

export default function IndexPage(props) {
  const classes = useStyles();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    var trips = props.data.allMarkdownRemark.edges.map(
      (x) => x.node.frontmatter
    );

    trips.forEach((t) => {
      t.imgs = [];
    });

    props.data.allFile.edges.forEach((x) => {
      let imageSlug = x.node.absolutePath.match("travel(.*)/")[1];
      let tripIndex = trips.findIndex((t) => t.slug === imageSlug);
      trips[tripIndex].imgs.push(x);
    });

    console.log(trips);

    setTrips(trips);
  }, []);

  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{ width: "100%", height: window.innerHeight - 105 }}
              style={{ paddingLeft: "0.8em", paddingTop: "1em" }}
            >
              <Masonry columns={3} spacing={2}>
                {trips.map((item, index) => (
                  <Paper key={index} style={{ borderRadius: "0px" }}>
                    <p style={{ textAlign: "center", fontSize: "0.8em" }}>
                      {item.place}
                    </p>
                    <img
                      src={`${item.imgs[0].node.childImageSharp.fluid.base64}`}
                      // src={`${item.img}?w=162&auto=format`}
                      // srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                      alt={item.place}
                      // loading="lazy"
                      style={{
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
                        display: "block",
                        width: "100%",
                      }}
                    />
                  </Paper>
                ))}
              </Masonry>
            </Box>
          </Grid>
          <Grid item xs={12} md={8} style={{ paddingLeft: "0px" }}>
            <GMap trips={trips} />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export const pageQuery = graphql`
  {
    allFile(filter: { extension: { regex: "/(jpg)|(jpeg)|(png)/" } }) {
      edges {
        node {
          childImageSharp {
            fluid(quality: 100, toFormatBase64: NO_CHANGE) {
              originalName
              ...GatsbyImageSharpFluid
              sizes
            }
          }
          absolutePath
        }
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___start] }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            slug
            start(formatString: "MMMM DD, YYYY")
            end(formatString: "MMMM DD, YYYY")
            place
            level
            province
            country
            lon
            lat
            type
            abstract
          }
        }
      }
    }
  }
`;
