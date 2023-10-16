import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';
import MovieCarousel from "../MovieCarousel/MovieCarousel";
import './explore.css';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function Explore() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="explore">
      <h1 style={{color:"#f5c518", marginLeft:"49px"}}>Explore what's streaming</h1>
      <Box sx={{margin:"0px 50px"}}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Prime Video" style={{color:"#fff"}} />
            <Tab label="Netflix" style={{color:"#fff"}} />
            <Tab label="Hotstar" style={{color:"#fff"}} />
            <Tab label="MX player" style={{color:"#fff"}} />
            <Tab label="Jiocinema" style={{color:"#fff"}} />
            <Tab label="Erosnow" style={{color:"#fff"}} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
            <div className="tab-container">
                <p>included with Prime</p>
                <div className="tab-content">
                    <MovieCarousel api="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1" />
                </div>
            </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <div className="tab-container">
                <p>with subscription</p>
                <div className="tab-content">
                    <MovieCarousel api="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1" />
                </div>
            </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
            <div className="tab-container">
                <p>go to hotstar.com</p>
                <div className="tab-content">
                    <MovieCarousel api="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1" />
                </div>
            </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
            <div className="tab-container">
                <p>go to mxplayer.in</p>
                <div className="tab-content">
                    <MovieCarousel api="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1" />
                </div>
            </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
            <div className="tab-container">
                <p>go to jiocinema.com</p>
                <div className="tab-content">
                    <MovieCarousel api="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1" />
                </div>
            </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
            <div className="tab-container">
                <p>go to erosnow.com</p>
                <div className="tab-content">
                    <MovieCarousel api="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1" />
                </div>
            </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
