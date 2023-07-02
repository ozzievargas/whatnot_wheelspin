import * as React from "react"
import * as styles from "../components/index.module.css"

import { Box, Button, Grid, Paper, Tab, Tabs, Typography } from "@mui/material"
import { useCallback, useEffect, useRef, useState } from "react"

import EntriesForm from "../components/entries-form"
import Layout from "../components/layout"
import { LocalActivity } from "@mui/icons-material"
import Seo from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"
import StyledBadge from "../components/styledBadge"
// import { Wheel } from "react-custom-roulette"
import Wheel from "../components/wheel"
import shuffle from "shuffle-array"
import WinnerList from "../components/winner-list"

const IndexPage = () => {
  const { localStorage } = window
  const [entries, setEntries] = useState([])
  const [beautifyEnabled, setBeautifyEnabled] = useState(true)
  const [spinning, setSpinning] = useState(false)
  const [winningEntry, setWinningEntry] = useState(0)
  const [winners, setWinners] = useState([])
  const [tab, setTab] = useState(0)
  const [containerSize, setContainerSize] = useState("100%")
  const containerRef = useRef(null)

  useEffect(() => {
    let cachedEntries = []
    let cachedWinners = []

    // If Browser supports caching, open/create cache in case unexpected refresh
    if (localStorage) {
      const localEntries = localStorage.getItem("wheel-spin-entries")
      const localWinners = localStorage.getItem("wheel-spin-winners")

      setEntries(localEntries ? JSON.parse(localEntries) : cachedEntries)
      cachedWinners = localWinners ? JSON.parse(localWinners) : cachedWinners
    }
  }, [])

  useEffect(() => {
    getDimensions()
  }, [containerRef])

  const resetApp = () => {
    console.log(
      "%c 🍻 resetApp: ",
      "font-size:20px;background-color: #EA7E5C;color:#fff;",
      resetApp
    )
    if (localStorage) {
      localStorage.removeItem("wheel-spin-entries")
      localStorage.removeItem("wheel-spin-winners")

      setEntries([])
      setWinners([])
    }
  }

  /**
   * @param {*} _
   * @param {*} newTab
   * @returns
   */
  const handleTabChange = (_, newTab) => setTab(newTab)

  const handleSetBeautify = newState => {
    console.log(
      "%c 🥞 newState: ",
      "font-size:20px;background-color: #B03734;color:#fff;",
      newState
    )
    setBeautifyEnabled(newState)
  }

  /**
   *
   */
  const shuffleEntries = useCallback(() => {
    const newOrder = shuffle(entries, { copy: true })
    setEntries(newOrder)
  }, [entries])

  /**
   *
   */
  const addEntries = useCallback(
    (name, numEntries, color) => {
      const newEntries = [...entries]

      for (var i = 0; i < numEntries; ++i) {
        newEntries.push({
          name,
          color,
        })
      }

      setEntries(newEntries)

      if (localStorage) {
        localStorage.setItem("wheel-spin-entries", JSON.stringify(newEntries))
      }
    },
    [entries, setEntries]
  )

  const deleteEntry = useCallback(
    (name, color) => {
      const index = entries.findIndex(
        entry => entry.name === name && entry.color === color
      )

      const newEntries = [...entries]
      newEntries.splice(index, 1)
      setEntries(newEntries)
      localStorage.setItem("wheel-spin-entries", JSON.stringify(newEntries))
    },
    [entries]
  )

  /**
   *
   * @returns
   */
  const getDimensions = () => {
    const { current: curContainer } = containerRef

    if (curContainer) {
      const { clientHeight, clientWidth } = curContainer
      const { innerHeight, innerWidth } = window

      let newSize = clientHeight > clientWidth ? clientWidth : clientHeight

      if (innerWidth === clientWidth) {
        newSize = innerHeight - 72 > innerWidth ? innerWidth : innerHeight - 72
      }

      if (containerSize !== newSize) {
        setContainerSize(newSize)
      }
    }
  }

  window && window.addEventListener("resize", getDimensions)

  /**
   *
   */
  const startSpinWheel = useCallback(() => {
    const entryNumber = Math.floor(Math.random() * entries.length)

    setWinningEntry(entryNumber)
    setSpinning(true)
  }, [entries, winners, winningEntry, setWinningEntry, setSpinning])

  return (
    <Layout>
      <Seo title="Home" />
      <Grid className={styles.index} container>
        <Grid
          ref={containerRef}
          className={styles.wheelSpinWrapper}
          id="wheel-spin-wrapper"
          item
          xs={12}
          lg={7}
        >
          <div
            style={{
              height: containerSize,
              width: containerSize,
              position: "relative",
            }}
          >
            <div
              id="wheel-spin-container"
              style={{ height: containerSize, width: containerSize }}
              className={styles.wheelSpinContainer}
            >
              <Wheel
                mustStartSpinning={spinning}
                prizeNumber={winningEntry}
                entries={entries}
                beautifyEnabled={beautifyEnabled}
                onStopSpinning={() => {
                  setWinners([...winners, entries[winningEntry]])
                  entries[winningEntry] &&
                    alert(`Congrats ${entries[winningEntry].name}`)
                  setSpinning(false)
                }}
              />
              <Button
                variant="text"
                style={{ position: "absolute", zIndex: 100 }}
                onClick={startSpinWheel}
                disabled={entries.length <= 1}
              >
                Spin
              </Button>
              <StaticImage
                style={{
                  position: "absolute",
                  right: "-1rem",
                  zIndex: 5,
                  width: "15%",
                  marginRight: "-1.5rem",
                  transform: `rotate(90deg)`,
                  WebkitUserDrag: "none",
                  KhtmlUserDrag: "none",
                  MozUserDrag: "none",
                  OUserDrag: "none",
                  userDrag: "none",
                }}
                src="../images/wheel-pointer.png"
                loading="eager"
                quality={85}
                layout="constrained"
                formats={["auto", "webp", "avif"]}
                alt="wheel selector"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={5} className={styles.formcontainer}>
          <Paper className={styles.form} variant="outlined">
            <Box>
              <Tabs
                value={tab}
                onChange={handleTabChange}
                arial-label="wheel form"
                style={{ margin: "1rem" }}
              >
                <Tab
                  label={
                    <StyledBadge
                      badgeContent={entries.length}
                      color="secondary"
                      max={99999}
                    >
                      <Typography variant="p" p="0.25rem">
                        Entries
                      </Typography>
                    </StyledBadge>
                  }
                />
                <Tab
                  label={
                    <StyledBadge
                      badgeContent={winners.length}
                      color="secondary"
                      max={99999}
                    >
                      <Typography variant="p" p="0.25rem">
                        Winners
                      </Typography>
                    </StyledBadge>
                  }
                />
                <Tab
                  label={
                    <StyledBadge
                      badgeContent={LocalActivity.length}
                      max={99999}
                    >
                      <Typography variant="p" p="0.25rem">
                        Prize Tiers
                      </Typography>
                    </StyledBadge>
                  }
                />
              </Tabs>
            </Box>
            {tab === 0 && (
              <>
                <EntriesForm
                  addEntries={addEntries}
                  deleteEntry={deleteEntry}
                  entries={entries}
                  shuffleEntries={shuffleEntries}
                  beautifyEnabled={beautifyEnabled}
                  setBeautify={handleSetBeautify}
                  resetApp={resetApp}
                />
              </>
            )}
            {tab === 1 && (
              <>
                <WinnerList winners={winners} />
              </>
            )}
            {tab === 2 && (
              <div style={{ padding: "2rem" }}>
                Prize tiers will go here to automatically alert when a new tier
                is hit!
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default IndexPage
