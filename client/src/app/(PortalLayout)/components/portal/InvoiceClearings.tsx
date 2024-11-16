import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const InvoiceClearings = ({ invoices }) => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  // Calculate Paid and Unpaid Amounts
  const calculateAmounts = () => {
    let paidAmount = 0;
    let unpaidAmount = 0;

    invoices.forEach((invoice) => {
      if (invoice.status === "paid" || invoice.status === "Success") {
        paidAmount += invoice.amount;
      } else if (invoice.status === "unpaid") {
        unpaidAmount += invoice.amount;
      }
    });

    return { paidAmount, unpaidAmount };
  };

  const { paidAmount, unpaidAmount } = calculateAmounts();

  // Calculate percentage difference between paid and unpaid amounts
  const totalAmount = paidAmount + unpaidAmount;
  const paidPercentage = totalAmount ? (paidAmount / totalAmount) * 100 : 0;
  const unpaidPercentage = totalAmount ? (unpaidAmount / totalAmount) * 100 : 0;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  const seriescolumnchart: any = [
    {
      name: '',
      color: secondary,
      data: [paidPercentage, unpaidPercentage],
    },
  ];

  return (
    <DashboardCard
      title="Invoice Clearings"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
          <Typography variant="h5">रु</Typography>
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height={60} width={"100%"} />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          रु {paidAmount + unpaidAmount}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            {paidPercentage > unpaidPercentage ? `+${paidPercentage.toFixed(2)}%` : `-${unpaidPercentage.toFixed(2)}%`}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Paid vs Unpaid
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default InvoiceClearings;
