import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import { Link, graphql, navigate } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout/layout";
import GMap from "../components/googleMap/gmap";
import { Grid, Box, Item, Paper } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

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
          <Grid item xs={12} md={5}>
            <Box
              sx={{ width: "100%", height: window.innerHeight - 115 }}
              style={{
                paddingRight: "1.5em",
                paddingTop: "1em",
                marginTop: "10px",
                overflow: "auto",
              }}
            >
              <ImageList variant="masonry" cols={2} gap={20}>
                {trips.map((item, index) => (
                  <ImageListItem key={index}>
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 999,
                        width: "100%",
                        heigt: "100px",
                        bottom: "0px",
                        // paddingTop: "4px",
                        paddingLeft: "10px",
                        backgroundColor: "rgb(255,255,255,0.6)",
                        // display: "flex",
                        // justifyContent: "left",
                        // alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          // textAlign: "center",
                          zIndex: 1000,
                          fontWeight: "600",
                          color: "black",
                          fontSize: "0.75vw",
                        }}
                      >
                        {item.place}
                      </span>
                      <span
                        style={{
                          fontSize: "0.6vw",
                          fontWeight: "500",
                          marginLeft: "10px",
                        }}
                      >
                        {item.country}
                      </span>
                    </div>
                    <img
                      src={item.imgs[0].node.childImageSharp.fluid.src}
                      // src={`${item.img}?w=162&auto=format`}
                      // srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                      alt={item.place}
                      // loading="lazy"
                      style={{
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
                        display: "block",
                        width: "100%",
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Grid>
          <Grid item xs={12} md={7} style={{ paddingLeft: "0px" }}>
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
            fluid(quality: 100, jpegQuality: 100, toFormatBase64: NO_CHANGE) {
              originalName
              ...GatsbyImageSharpFluid
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
