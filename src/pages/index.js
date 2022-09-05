import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import { Link, graphql, navigate } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout/layout";
import GMap from "../components/googleMap/gmap";
import { Grid, Box, Item } from "@mui/material";

const useStyles = makeStyles((theme) => ({}));

export default function IndexPage(props) {
  const classes = useStyles();

  useEffect(() => {
    console.log(props);
  }, []);

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

// export const pageQuery = graphql`
//   {
//     allMarkdownRemark(
//       sort: { order: DESC, fields: [frontmatter___start] }
//       limit: 1000
//     ) {
//       edges {
//         node {
//           frontmatter {
//             slug
//             start(formatString: "MMMM DD, YYYY")
//             end(formatString: "MMMM DD, YYYY")
//             place
//             level
//             province
//             country
//             lon
//             lat
//             type
//             abstract
//           }
//         }
//       }
//     }
//   }
// `;

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
