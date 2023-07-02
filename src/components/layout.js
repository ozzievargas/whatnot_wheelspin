/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import CssBaseline from "@mui/material/CssBaseline"
import { Paper, ThemeProvider, createTheme } from "@mui/material"
import Header from "./header"
import "./layout.css"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(ChartDataLabels);

const theme = createTheme({
  palette: {
    mode: "dark",
  },
})

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <Paper
            style={{
              margin: `0 auto`,
              maxWidth: `var(--size-content)`,
              padding: `var(--size-gutter)`,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
            <main className="main-container">{children}</main>
            <footer
              style={{
                marginTop: `var(--space-5)`,
                fontSize: `var(--font-sm)`,
                padding: `0rem`,
              }}
            >
              ©2022 &middot; Built by
              {` `}
              <a href="/">@osvaldo_social</a>
            </footer>
          </Paper>
        </ThemeProvider>
      </CssBaseline>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
