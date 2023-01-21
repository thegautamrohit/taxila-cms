import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryData,
  deleteCategoryData,
} from "../../store/inspirationSlice";
import ImageIcon from "@mui/icons-material/Image";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteIcon from "@mui/icons-material/Delete";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import Loader from "../Common/Loader";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.inspirationSlice);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchCategoryData());
  }, []);


  return (
    <TableContainer component={Paper}>
      {categoryData.loading && <Loader />}

      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Primary Image</StyledTableCell>
            <StyledTableCell align="center">Image Collection</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categoryData?.categoryData?.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.title}</StyledTableCell>
              <StyledTableCell align="center">
                {row.description}
              </StyledTableCell>
              <StyledTableCell align="center">
                <ImageIcon style={{ cursor: "pointer" }} />
              </StyledTableCell>
              <StyledTableCell align="center">
                <BurstModeIcon style={{ cursor: "pointer" }} />
              </StyledTableCell>
              <StyledTableCell align="center">
                <UpgradeIcon style={{ cursor: "pointer" }} />
              </StyledTableCell>
              <StyledTableCell align="center">
                <DeleteIcon
                  onClick={() => dispatch(deleteCategoryData(row.id))}
                  style={{ cursor: "pointer" }}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
