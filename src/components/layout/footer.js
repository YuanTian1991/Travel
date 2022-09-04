import React from "react";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";
import { Link } from "gatsby";

export default function Copyright() {
  const classes = useStyles();

  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "8px",
        height: "40px",
        borderTop: "1px solid lightgrey",
      }}
    >
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

const useStyles = makeStyles((theme) => ({}));
