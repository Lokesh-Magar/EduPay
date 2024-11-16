import { useEffect, useState } from "react";
import { Grid, Typography, Stack, Avatar } from "@mui/material";
import { IconArrowUpLeft } from "@tabler/icons-react";
import { useTheme } from "@mui/material/styles";
import Chart from "react-apexcharts";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const FeesBreakup = ({ invoices }) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = "#ecf2ff";
  const successlight = theme.palette.success.light;

  // Calculate Paid and Unpaid Amounts
  const calculateAmounts = () => {
    let paidAmount = 0;
    let unpaidAmount = 0;
    let pendingAmount = 0;
    let totalAmount = 0;

    invoices.forEach((invoice) => {
      totalAmount += invoice.amount;

      if (invoice.status === "paid" || invoice.status === "Success") {
        paidAmount += invoice.amount;
      } else if (invoice.status === "unpaid") {
        unpaidAmount += invoice.amount;
        pendingAmount += invoice.pendingAmount; // Here the pendingAmount is only relevant for unpaid invoices
      }
    });

    return { paidAmount, unpaidAmount, pendingAmount, totalAmount };
  };

  const { paidAmount, unpaidAmount, pendingAmount, totalAmount } = calculateAmounts();

  // Calculate percentages dynamically
  const paidPercentage = totalAmount > 0 ? ((paidAmount / totalAmount) * 100).toFixed(2) : 0;
  const unpaidPercentage = totalAmount > 0 ? ((unpaidAmount / totalAmount) * 100).toFixed(2) : 0;

  // Chart Data
  const optionscolumnchart = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, "#F9F9FD"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  // Dynamic series for the donut chart
  const seriescolumnchart = [
    paidAmount, 
    // unpaidAmount, 
    pendingAmount,  // For showing pending as a portion in chart if needed
  ];

  return (
    <DashboardCard title="Fees Breakup">
      <Grid container spacing={3}>
        {/* Paid Amount Section */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            रु {paidAmount} {/* Display Paid Amount */}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              <IconArrowUpLeft width={20} color="#39B69A" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              {paidPercentage}% {/* Dynamic Paid Percentage */}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Paid 
            </Typography>
          </Stack>
        </Grid>

        {/* Unpaid Amount Section */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            रु {unpaidAmount} {/* Display Unpaid Amount */}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: primarylight, width: 27, height: 27 }}>
              <IconArrowUpLeft width={20} color={primary} />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              {unpaidPercentage}% {/* Dynamic Unpaid Percentage */}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Pending
            </Typography>
          </Stack>
        </Grid>

        {/* Donut Chart */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height={150}
            width={"100%"}
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default FeesBreakup;
