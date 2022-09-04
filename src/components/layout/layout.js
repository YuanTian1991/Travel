import React from "react";
import { makeStyles, createStyles, Theme } from "@mui/styles";

import {
  Container,
  Box,
  Toolbar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "gatsby";

import SubjectTwoToneIcon from "@mui/icons-material/SubjectTwoTone";

import StickyFooter from "./footer.js";

export default function Layout(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const url = typeof window !== "undefined" ? window.location.pathname : "";

  const handleClick = () => {};

  return (
    <div>
      <Container
        maxWidth="lg"
        style={{ paddingLeft: "8px", paddingRight: "4px" }}
      >
        <Box my={1}>
          <Toolbar
            className={classes.toolbarSecondary}
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              borderBottom: "1px solid lightgrey",
            }}
          >
            <Grid container spacing="1" alignItems="center">
              <Grid item>
                {" "}
                <Link to="/" className={classes.Link}>
                  Tian's Travel Map
                </Link>
              </Grid>
            </Grid>

            <div className={classes.toolbarButtons} style={{ width: "100px" }}>
              {/* <IconButton onClick={handleClick}>
                <SubjectTwoToneIcon style={{ fontSize: "1em" }} />
              </IconButton> */}
            </div>
          </Toolbar>
        </Box>
      </Container>

      <main>{props.children}</main>
      {/* <Copyright /> */}
      <StickyFooter />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbarSecondary: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarButtons: {
    marginLeft: "auto",
  },
  Link: {
    textDecoration: "none",
    color: "black",
    fontWeight: "thin",
    "&:hover ": {
      color: "black",
      textDecoration: "none",
    },
  },
}));
