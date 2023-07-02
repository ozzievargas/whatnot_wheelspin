import * as React from "react"
import Badge, { BadgeProps } from "@mui/material/Badge"
import { styled } from "@mui/material/styles"

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "6px 6px",
  },
}))

export default StyledBadge
