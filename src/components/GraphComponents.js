import { Container, Button } from "@mui/material";
import styled from "@emotion/styled";
import IconButton from '@mui/material/IconButton';
import React from "react";

export const GraphContainer = styled(Container) ({
    height: "85vh",
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems:"center",
    alignContent:"center",
    margin: "20px",
    marginBottom: "30px",
    alignSelf: "end",
});

export const InfoContainer = styled(Container) ({
    borderWidth:"2px",
    borderStyle:"solid",
    borderColor:"black",
    borderRadius:"10px",
    marginTop:"20px",
    marginLeft:"30px",
    marginRight:"30px",
    padding:"1em",
    flexGrow:"1"
});

export const InfoButton = styled(Button) ({
    flexGrow: 1,
    color: "#FFFFFF",
    margin: "5px",
    borderRadius: "20px",
    fontStyle: "bold",
    fontSize: "15px"

});

export const ExpandMore = styled((props) => {
    const { _expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ _expand }) => ({
    transform: !_expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
  }));

