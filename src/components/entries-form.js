import React, { useMemo } from "react"
import * as styles from "../components/entries-form.module.css"

import {
  Add,
  Circle,
  ContentCopy,
  ContentPasteGo,
  FormatColorFill,
  RemoveCircleOutline,
  RestartAlt,
  Shuffle,
  SortByAlpha,
} from "@mui/icons-material"
import {
  Box,
  Button,
  Grid,
  IconButton,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material"
import { useCallback, useEffect, useState } from "react"

import { SketchPicker } from "react-color"
import randomColor from "randomColor"

/**
 *
 * @param {} param0
 * @returns
 */
const EntriesForm = ({
  addEntries,
  deleteEntry,
  entries,
  shuffleEntries,
  beautifyEnabled,
  setBeautify,
  resetApp,
}) => {
  const [name, setName] = useState("")
  const [numEntries, setNumEntries] = useState("1")
  const [color, setColor] = useState(randomColor())
  const [anchorEl, setAnchorEl] = useState(null)
  const [tableRows, setTableRows] = useState([])
  const [sortType, setSortType] = useState(null)
  const [showBulkInput, setShowBulkInput] = useState(false)
  const posIntRegex = new RegExp("^[1-9]+[0-9]*$|^$")

  const sortEntries = useCallback(
    entryMap => {
      if (sortType) {
        return new Map(
          [...entryMap.entries()].sort(
            ([keyA, { name: a }], [keyB, { name: b }]) =>
              sortType === "a" ? a.localeCompare(b) : b.localeCompare(a)
          )
        )
      }

      return entryMap
    },
    [sortType]
  )

  /**
   *
   */
  const tempEntriesMap = useMemo(() => {
    const newMap = new Map()

    entries.forEach(({ name, color }) => {
      const entryKey = `${name}-${color}`
      const entryData = newMap.get(entryKey)

      newMap.set(entryKey, {
        name,
        total: 1 + (entryData ? entryData.total : 0),
        color: color,
      })
    })

    return newMap
  }, [entries])

  /**
   *
   */
  useEffect(() => {
    const newRows = []

    sortEntries(tempEntriesMap).forEach((data, key) => {
      newRows.push(
        <TableRow key={key}>
          <TableCell>{data.name}</TableCell>
          <TableCell>{data.total}</TableCell>
          <TableCell
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <IconButton onClick={evt => setAnchorEl(evt.currentTarget)}>
              <Tooltip title="Copy">
                <Circle style={{ color: data.color }} />
              </Tooltip>
            </IconButton>
            <IconButton onClick={() => copyEntry(data)}>
              <Tooltip title="Copy">
                <ContentCopy />
              </Tooltip>
            </IconButton>
            <IconButton onClick={() => deleteEntry(data.name, data.color)}>
              <Tooltip title="Delete">
                <RemoveCircleOutline color="error" />
              </Tooltip>
            </IconButton>
          </TableCell>
        </TableRow>
      )
    })

    setTableRows(newRows)
  }, [tempEntriesMap, setTableRows, sortEntries])

  /**
   */
  const handleNameChange = evt => setName(evt.target.value)

  /**
   *
   */
  const handleChangeEntries = evt => {
    const nextNumber = evt.target.value
    if (posIntRegex.test(nextNumber)) setNumEntries(evt.target.value)
  }

  const clearForm = () => {
    setName("")
    setNumEntries("1")
    setColor(randomColor())
  }

  const copyEntry = ({ name, color }) => {
    setName(name)
    setColor(color)
  }

  const submitEntries = useCallback(() => {
    addEntries(name, numEntries, color)
    clearForm()
  }, [name, numEntries, color])

  return (
    <Box
      component="form"
      style={{
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          flex: "1 1 auto",
          height: "100%",
          width: "100%",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          direction="row"
          columnSpacing={2}
          style={{ width: "100%" }}
        >
          <Grid item>
            <Button
              onClick={shuffleEntries}
              disabled={entries.length <= 1}
              variant="outlined"
            >
              <Tooltip title="Shuffle">
                <Shuffle />
              </Tooltip>
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() =>
                setSortType(sortType ? (sortType === "a" ? "b" : null) : "a")
              }
              disabled={entries.length <= 1}
              color={sortType ? "secondary" : "primary"}
              variant="outlined"
            >
              <Tooltip title="Sort">
                <SortByAlpha />
              </Tooltip>
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setBeautify(!beautifyEnabled)}
              disabled={entries.length <= 1}
              color={beautifyEnabled ? "secondary" : "primary"}
              variant="outlined"
            >
              Beautify
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={resetApp}
              disabled={entries.length <= 1}
              color="error"
              variant="contained"
            >
              Reset
            </Button>
          </Grid>
          {false && (
            <Grid item>
              <Button onClick={() => setShowBulkInput(true)} variant="outlined">
                <Tooltip title="Paste Names">
                  <ContentPasteGo />
                </Tooltip>
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid
          id="table-wrapper"
          container
          style={{ flex: "1 1 auto", position: "relative" }}
        >
          <TableContainer
            style={{
              position: "absolute",
              overflow: "hidden",
              height: "100%",
              width: "100%",
              overflowY: "auto",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      minWidth: "150px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell style={{ width: 100 }}>Total</TableCell>
                  <TableCell style={{ width: 200 }} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{tableRows}</TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          columnSpacing={1}
        >
          <Grid item xs={12} sm={6} justifyContent="center" alignItems="center">
            <TextField
              fullWidth
              id="entries-input"
              label="Name"
              value={name}
              onChange={handleNameChange}
              inputProps={{
                maxLength: 10,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              onChange={handleChangeEntries}
              value={numEntries}
              label="Entries"
              type="number"
            />
          </Grid>
          <Grid
            container
            item
            xs={6}
            sm={3}
            direction="row"
            justifyContent="center"
          >
            <IconButton onClick={evt => setAnchorEl(evt.currentTarget)}>
              <Tooltip title="Color">
                <FormatColorFill style={{ color }} />
              </Tooltip>
            </IconButton>
            <IconButton
              onClick={submitEntries}
              disabled={name === "" || !numEntries}
            >
              <Tooltip title="Add">
                <Add />
              </Tooltip>
            </IconButton>
            <IconButton onClick={clearForm} disabled={name === ""}>
              <Tooltip title="Reset">
                <RestartAlt />
              </Tooltip>
            </IconButton>
          </Grid>
        </Grid>
      </div>
      <Popover
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <SketchPicker color={color} onChange={color => setColor(color.hex)} />
      </Popover>
    </Box>
  )
}

export default EntriesForm
