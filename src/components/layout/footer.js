import React from "react";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";
import { Link } from "gatsby";

export default function Copyright() {
  const classes = useStyles();

  return (
    <div
      style={{ paddingTop: "1em", paddingBottom: "1em", textAlign: "center" }}
    >
      <Container
        style={{ marginBottom: "1em", fontSize: "0.8em", cursor: "pointer" }}
      >
        <div id="revolvermap" align="center" className="wcustomhtml">
          {/* <iframe className="adc" scrolling="no" frameBorder="0" allowtransparency="true" width="250px" height="250px" src="//ra.revolvermaps.com/0/0/6.js?i=051z93mj899&amp;m=7&amp;c=e63100&amp;cr1=ffffff&amp;f=arial&amp;l=0&amp;bv=90&amp;lx=-400&amp;ly=400&amp;hi=20&amp;he=7&amp;hc=a8ddff&amp;rs=80"></iframe> */}
        </div>
      </Container>

      <p
        variant="body2"
        color="textSecondary"
        align="center"
        style={{ fontSize: "0.8em" }}
      >
        {"Copyright © "}
        Yuan Tian {new Date().getFullYear()}
        {"."}
      </p>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    // minWidth: 275,
    padding: "0.5em",
    margin: "0.5em",
    borderRadius: "5px",
    // marginBottom: '2em',
    textDecoration: "none",
    color: "hsla(0,0%,0%,0.8)",
    fontWeight: "400",
    cursor: "pointer",
    backgroundColor: "rgba(255, 0, 0, 0)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.07)",
      fontWeight: "400",
      "-webkit-transition": "background-color 100ms linear",
      "-ms-transition": "background-color 100ms linear",
      transition: "background-color 100ms linear",
      "-webkit-transition": "font-weight 100ms linear",
      "-ms-transition": "font-weight 100ms linear",
      transition: "font-weight 100ms linear",
    },
  },
}));
