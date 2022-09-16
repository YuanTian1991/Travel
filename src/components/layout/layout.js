import React from "react";
import { makeStyles, createStyles, Theme } from "@mui/styles";

import { Container, Toolbar, Grid, Paper } from "@mui/material";
import { Link } from "gatsby";

import SubjectTwoToneIcon from "@mui/icons-material/SubjectTwoTone";

import Logo from "../../images/Logo.png";

import StickyFooter from "./footer.js";

export default function Layout(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const url = typeof window !== "undefined" ? window.location.pathname : "";

  const handleClick = () => {};

  return (
    <div>
      <Paper
        elevation={0}
        style={{ borderRadius: "0px", borderBottom: "1px solid lightgrey" }}
      >
        <Container
          maxWidth="lg"
          style={{
            paddingLeft: "8px",
            paddingRight: "4px",
            marginBottom: "0px",
          }}
        >
          <Toolbar
            className={classes.toolbarSecondary}
            style={{
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            <Grid container spacing="1" alignItems="center">
              <Grid item>
                {" "}
                <Link to="/" className={classes.Link}>
                  {/* Tian & Yi's Travel Map */}
                  <img
                    src={Logo}
                    style={{
                      // display: "block",
                      position: "absolute",
                      top: "10px",
                      height: "60px",
                      zIndex: 1000,
                    }}
                  />
                </Link>
              </Grid>
            </Grid>

            <div className={classes.toolbarButtons} style={{ width: "100px" }}>
              {/* <IconButton onClick={handleClick}>
                <SubjectTwoToneIcon style={{ fontSize: "1em" }} />
              </IconButton> */}
            </div>
          </Toolbar>
        </Container>
      </Paper>
      <main>
        <div style={{ padding: "0px" }}>{props.children}</div>
      </main>
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
    paddingTop: "8px",
    "&:hover ": {
      color: "black",
      textDecoration: "none",
    },
  },
}));
