import React from "react"

import { Circle } from "@mui/icons-material"
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

/**
 *
 * @param {} param0
 * @returns
 */
const WinnerList = ({ winners }) => {
  return (
    <Box
      style={{
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <TableContainer
        style={{
          padding: "2rem",
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
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Name
              </TableCell>
              <TableCell>Color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {winners.map(({ name, color }, idx) => (
              <TableRow key={`${idx}-${name}-${color}`}>
                <TableCell>{name}</TableCell>
                <TableCell style={{ width: 150 }}>
                  <Circle style={{ color: color }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default WinnerList
