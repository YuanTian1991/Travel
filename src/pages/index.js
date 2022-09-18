import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import { StaticQuery, Link, graphql, navigate } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout/layout";
import GMap from "../components/googleMap/gmap";
import {
  Grid,
  Box,
  Item,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import CameraIcon from "@mui/icons-material/Camera";
import CloseIcon from "@mui/icons-material/Close";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const useStyles = makeStyles((theme) => ({}));

export default function IndexPage(props) {
  const classes = useStyles();
  const [trips, setTrips] = useState([]);
  const [selectCard, setSelectedCard] = useState(null);
  const [Galary, setGalary] = useState(null);

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

  const handleHoverOnCard = (item) => {
    console.log(item);
    setSelectedCard(item);
  };

  const handleDoubleClick = (item) => {
    setGalary(item);
  };

  const toggleDrawer = () => {
    setGalary(null);
  };

  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                width: "100%",
                height:
                  typeof window !== "undefined"
                    ? window.innerHeight - 115
                    : "100vh",
              }}
              style={{
                paddingRight: "1.5em",
                paddingTop: "1em",
                marginTop: "10px",
                overflow: "auto",
              }}
            >
              <ImageList variant="masonry" cols={2} gap={20}>
                {trips.map((item, index) => (
                  <ImageListItem
                    key={index}
                    onClick={() => handleHoverOnCard(item)}
                    onDoubleClick={() => handleDoubleClick(item)}
                    // onMouseOut={() => handleHoverOnCard(null)}
                    style={{
                      borderRadius: 6,
                      // margin: "10px",
                      transform:
                        "scale(1)" /* you need a scale here to allow it to transition in both directions */,
                      transition: "0.15s all ease",
                      cursor: "pointer",
                      margin:
                        selectCard !== null
                          ? item.slug === selectCard.slug
                            ? "5px"
                            : "15px"
                          : "15px",
                      border:
                        selectCard !== null
                          ? item.slug === selectCard.slug
                            ? "2px solid black"
                            : "1px solid white"
                          : "1px solid white",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 999,
                        // width: "60px",
                        // heigt: "100px",
                        top: "5px",
                        right: "5px",
                        // paddingTop: "4px",
                        backgroundColor: "rgb(255,255,255,0)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        style={{ color: "#616161" }}
                        onClick={() => handleDoubleClick(item)}
                      >
                        <CameraIcon />
                      </IconButton>
                    </div>
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
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
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
                          fontSize: "0.8em",
                        }}
                      >
                        {item.place}
                      </span>
                      <span
                        style={{
                          fontSize: "0.65em",
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
            <GMap
              trips={trips}
              selectCard={selectCard}
              onMarkerClicked={handleHoverOnCard}
              onInfoWindowClicked={handleDoubleClick}
            />
          </Grid>
        </Grid>

        <Dialog
          maxWidth={"63vw"}
          onClose={() => setGalary(null)}
          open={Galary !== null}
        >
          <div style={{ width: "60vw" }}>
            {Galary !== null && (
              <Carousel>
                {Galary.imgs.map((img, imgIndex) => {
                  return (
                    <div>
                      <p
                        className="legend"
                        style={{
                          borderRadius: 4,
                          backgroundColor: "rgb(0,0,0,0.4)",
                          width: "200px",
                          // color: "black",
                        }}
                      >
                        {img.node.childImageSharp.fluid.originalName}
                      </p>
                      <img
                        src={
                          img.node.childImageSharp.gatsbyImageData.images
                            .fallback.src
                        }
                        loading="lazy"
                        style={{
                          maxHeight: "40vw",
                          width: "auto",
                          height: "auto",
                        }}
                      />
                    </div>
                  );
                })}
              </Carousel>
            )}
          </div>
        </Dialog>
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
            gatsbyImageData
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
