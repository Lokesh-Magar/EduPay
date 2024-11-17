import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
  } from "@mui/material";
  import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
  
  const FeesPerformance = ({ invoices }) => {
    const determineFeeBias = (paid, pendingAmount) => {
      const total = paid + pendingAmount;
      const ratio = paid / total;
  
      if (ratio >= 0.75) return { label: "Largely Paid", color: "success.main" };
      if (ratio >= 0.5) return { label: "Fairly Paid", color: "primary.main" };
      return { label: "Largely Unpaid", color: "error.main" };
    };
  
    return (
      <DashboardCard title="Fees Performance">
        <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    SN
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Fees Bias
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Overdue Amount
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Total Paid Amount
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice, index) => {
                const feeBias = determineFeeBias(invoice.amount - invoice.pendingAmount, invoice.pendingAmount);
  
                return (
                  <TableRow key={invoice._id}>
                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {invoice.username}
                          </Typography>
                          <Typography
                            color="textSecondary"
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            {invoice.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  
                    <TableCell>
                      <Chip
                        sx={{
                          px: "4px",
                          backgroundColor: feeBias.color,
                          color: "#fff",
                        }}
                        size="small"
                        label={feeBias.label}
                      ></Chip>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={600}
                      >
                        रु {invoice.pendingAmount}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="h6">
                        रु {(invoice.amount - invoice.pendingAmount).toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </DashboardCard>
    );
  };
  
  export default FeesPerformance;
  