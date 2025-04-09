import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TablePagination,
  Typography,
  Box,
} from "@mui/material";

const CompanySteelProduction = ({ data }) => {
  const [topCompanies, setTopCompanies] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("production");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Sort the data by production in descending order
    const sortedData = [...data].sort((a, b) => b.production - a.production);

    // Limit to top 10 companies
    setTopCompanies(sortedData.slice(0, 10));
  }, [data]);

  // Sorting function for MUI table
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const comparator = (a, b) => {
    if (orderBy === "production") {
      return order === "desc"
        ? b.production - a.production
        : a.production - b.production;
    }
    return 0;
  };

  // If no data exists
  if (!topCompanies || topCompanies.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <Paper sx={{ width: "100%", mb: 2 }} className="">
      {/* Title and Description */}
      <Box sx={{ padding: 2 }}>
        <Typography variant="h5" className="font-mono font-bold" gutterBottom>
          Top 10 Steel Production Companies
        </Typography>
        <Typography variant="body2" color="textSecondary">
          This table ranks the top 10 steel production companies based on their
          production output.
        </Typography>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 50 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell
                sortDirection={orderBy === "production" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "production"}
                  direction={orderBy === "production" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "production")}
                >
                  Production
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(topCompanies, comparator)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((company, index) => (
                <TableRow
                  hover
                  key={company.company}
                  sx={{
                    backgroundColor:
                      index % 2 === 0
                        ? "#f9f9f9" // Off-white for even rows
                        : "#eaeaea", // Slightly different off-white for odd rows
                  }}
                >
                  <TableCell>{company.company}</TableCell>

                  <TableCell>{company.production}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={topCompanies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CompanySteelProduction;
