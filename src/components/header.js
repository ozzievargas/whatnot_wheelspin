import * as React from "react"
import PropTypes from "prop-types"
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import { StaticImage } from "gatsby-plugin-image"

const Header = ({ siteTitle }) => (
  <Box>
    <AppBar position="static">
      <Toolbar>
        <IconButton style={{ maxHeight: "64px", maxWidth: "100px" }}>
          <StaticImage
            src="../images/nl.png"
            loading="eager"
            quality={100}
            layout="constrained"
            formats={["auto", "webp", "avif"]}
            alt="WhatNot log"
          />
        </IconButton>
        <Typography variant="p" style={{ fontSize: 24 }}>
          {siteTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
