import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Link, TablePagination, styled } from "@mui/material";
import { monthShort } from "../../constants/months";
import { TypoJakarta } from "../Typography/TypoJakarta";
import DownloadInvoiceIcon from "../Icons/DocDownload.svg?react";
import { useState } from "react";
import { useApi } from "../../utils/hooks/useApi";

const TypoJakartaNeutral60 = styled(TypoJakarta)(
  ({ theme }) => `
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 24px;
color: ${theme.palette.text_.neutral_60}
`
);

const TypoJakarta500 = styled(TypoJakarta)(({ theme, color_variant }) => {
  const color = theme.palette.text_[color_variant];
  return `
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px;
color: ${color};
display: flex;
align-items: center;
> img {
  border-radius: 16px;
  margin-right: 10px;
}
`;
});

const defaultRowsPerPage = 5;

export function OrdersTable() {
  const [page, setPage] = useState(0);
  const [view, setView] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [startPoint, setStartPoint] = useState(0);
  const query = useApi({
    endpoint: `/data/orders_${page}.json`,
    queryKey: ["orders", page.toString()],
  });
  const { data, isLoading } = query;
  const rows = data?.data;

  const handlePageChange = (e, newPage) => {
    if (rowsPerPage === 5 && startPoint === 0) {
      setView(newPage % 2);
      setStartPoint(5);
      return;
    }
    setView(0);
    setStartPoint(0);
    setPage(rowsPerPage === 5 ? newPage / 2 : newPage);
  };

  const handleRowsPerPageChange = (e) => {
    setView(0);
    setRowsPerPage(e.target.value);
  };

  return isLoading ? null : (
    <>
      <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
        <Table
          sx={{ minWidth: { xs: 670, md: "unset" } }}
          aria-label="orders table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <TypoJakartaNeutral60>Name</TypoJakartaNeutral60>
              </TableCell>
              <TableCell align="left">
                <TypoJakartaNeutral60>Date</TypoJakartaNeutral60>
              </TableCell>
              <TableCell align="left">
                <TypoJakartaNeutral60>Amount</TypoJakartaNeutral60>
              </TableCell>
              <TableCell align="left">
                <TypoJakartaNeutral60>Status</TypoJakartaNeutral60>
              </TableCell>
              <TableCell align="left">
                <TypoJakartaNeutral60>Invoice</TypoJakartaNeutral60>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(startPoint, startPoint + rowsPerPage)
              .map((row, index) => {
                const date = new Date(row.date);
                const month = monthShort[date.getMonth()];
                const day = date.getDate();
                const year = date.getFullYear();
                return (
                  <TableRow
                    key={row.name + row.date + row.status}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <TypoJakarta500 color_variant="grey_black">
                        <img
                          src={`/data/images/img_${
                            index + 1 > 11 ? (index + 1) % 11 : index + 1
                          }.jpg`}
                          alt={row.name}
                          width="32px"
                          height="32px"
                        />
                        <Box component={"span"}>{row.name}</Box>
                      </TypoJakarta500>
                    </TableCell>
                    <TableCell align="left">
                      <TypoJakarta500 color_variant="neutral_500">{`${month} ${day}, ${year}`}</TypoJakarta500>
                    </TableCell>
                    <TableCell align="left">
                      <TypoJakarta500 color_variant="black_1">
                        {`$${row.amount.toLocaleString("US")}`}
                      </TypoJakarta500>
                    </TableCell>
                    <TableCell align="left">
                      <TypoJakarta500
                        color_variant={
                          row.status === "Paid" ? "accent" : "red_1"
                        }
                      >
                        {row.status}
                      </TypoJakarta500>
                    </TableCell>
                    <TableCell align="left">
                      <TypoJakarta500 color_variant="black_1">
                        <Link
                          color={"inherit"}
                          sx={{ textDecoration: "none" }}
                          href="#invoice"
                        >
                          <DownloadInvoiceIcon />{" "}
                          <Box component={"span"} ml={"6px"}>
                            {"View"}
                          </Box>
                        </Link>
                      </TypoJakarta500>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component={Box}
        rowsPerPageOptions={[5, 10]}
        count={data.total}
        rowsPerPage={rowsPerPage}
        page={rowsPerPage === 5 ? 2 * page + view : page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
}
