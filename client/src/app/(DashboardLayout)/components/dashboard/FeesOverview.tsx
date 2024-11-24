import React, { useEffect } from 'react';
import { Select, MenuItem, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { saveAs } from 'file-saver';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const FeesOverview = ({ invoices }: { invoices: any[] }) => {
  const [month, setMonth] = React.useState(new Date().getMonth() + 1); // Current month by default
  const [year, setYear] = React.useState(new Date().getFullYear()); // Current year by default
  const [chartData, setChartData] = React.useState({
    paidAmounts: [],
    pendingAmounts: [],
    categories: [],
  });

  // Handle month change
  const handleChangeMonth = (event: any) => {
    setMonth(event.target.value);
  };

  // Handle year change
  const handleChangeYear = (event: any) => {
    setYear(event.target.value);
  };

  // Processing data based on selected month and year
  useEffect(() => {
    const paidAmounts: number[] = [];
    const pendingAmounts: number[] = [];
    const categories: string[] = [];

    // Loop through invoices and categorize them
    invoices.forEach((invoice: any) => {
      const invoiceMonth = new Date(invoice.dueDate).getMonth() + 1;
      const invoiceYear = new Date(invoice.dueDate).getFullYear();

      if (invoiceYear === year && invoiceMonth === month) {
        // Format the due date to "DD/MM"
        const formattedDate = new Date(invoice.dueDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
        });

        categories.push(formattedDate); // Push formatted date in (day/month)

        // Sum up amounts based on invoice status
        if (invoice.status === 'paid') {
          paidAmounts.push(invoice.amount); // Paid invoices adds to paid amounts
        } else if (invoice.status === 'unpaid') {
          pendingAmounts.push(invoice.amount); // Unpaid invoices adds to pending amounts
        }
      }
    });

    // Update chart data with calculated values
    setChartData({
      paidAmounts,
      pendingAmounts,
      categories,
    });
  }, [month, year, invoices]);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // Ensure that categories and data arrays are not empty
  // if (!chartData.categories.length || !chartData.paidAmounts.length || !chartData.pendingAmounts.length) {
  //   return (
  //     <DashboardCard title="Fees Overview">
  //       <p>No data available for the selected period.</p>
  //     </DashboardCard>
  //   );
  // }

  // Chart options
  const optionscolumnchart: any = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: { show: true },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '69%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
    },
    yaxis: {
      tickAmount: 4,
      min: 0,
      max: Math.max(...chartData.paidAmounts, ...chartData.pendingAmounts) * 1.1, // Dynamic range based on data
    },
    xaxis: {
      categories: chartData.categories,
      axisBorder: { show: false },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart: any = [
    {
      name: 'Paid Amount',
      data: chartData.paidAmounts,
    },
    {
      name: 'Pending Amount',
      data: chartData.pendingAmounts,
    },
  ];

  // Current Year and Month Names
  const currentYear = new Date().getFullYear();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // CSV Generation for chart data (existing)
  const generateCSV = () => {
    const data = [
      ['Due Date', 'Paid Amount', 'Pending Amount'],
      ...chartData.categories.map((category, index) => [
        category,
        chartData.paidAmounts[index] || 0,
        chartData.pendingAmounts[index] || 0,
      ])
    ];

    const csvContent = data.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `fees_overview_${year}_${month}.csv`);
  };

  // CSV Generation for all invoices
  const generateAllInvoicesCSV = () => {
    if (!invoices.length) {
      alert("No invoices found!");
      return;
    }
  
    // Prepare the data for CSV export
    const allInvoicesData = invoices.map((invoice: any) => ({
      studentId: invoice.studentId,
      username: invoice.username,
      email: invoice.email,
      amount: invoice.amount,
      pendingAmount: invoice.pendingAmount,
      dueDate: new Date(invoice.dueDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      status: invoice.status,
    }));
  
    // Extract headers from the first invoice object (keys)
    const headers = Object.keys(allInvoicesData[0] || {});
    
    // Map the data to match the headers
    const data = allInvoicesData.map((invoice: any) => headers.map((key) => invoice[key]));
  
    // Convert the data into CSV format
    const csvContent = [headers, ...data].map(row => row.join(",")).join("\n");
    
    // Create a Blob object with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    
    // Trigger file download
    saveAs(blob, `all_invoices_${new Date().getFullYear()}.csv`);
  };
  

  return (
    <DashboardCard
      title="Fees Overview"
      action={
        <>
          <Select labelId="year-dd" id="year-dd" value={year} size="small" onChange={handleChangeYear}>
            {Array.from({ length: 5 }).map((_, index) => {
              const optionYear = currentYear - index;
              return <MenuItem key={optionYear} value={optionYear}>{optionYear}</MenuItem>;
            })}
          </Select>
          <Select labelId="month-dd" id="month-dd" value={month} size="small" onChange={handleChangeMonth}>
            {months.map((monthName, index) => (
              <MenuItem key={index} value={index + 1}>{monthName}</MenuItem>
            ))}
          </Select>
          <Button onClick={generateCSV} color="primary" variant="contained" size="small">
           <b> Download CSV (Filtered) </b>
          </Button>
          <Button onClick={generateAllInvoicesCSV} color="secondary" variant="contained" size="small" style={{ marginLeft: '8px' }}>
           <b> Download All Invoices CSV</b>
          </Button>
          <Button color="secondary" variant="contained" size="small" style={{ marginLeft: '9px' }}><b>Download PDF</b></Button>
        </>
      }
    >
      <Chart
        options={optionscolumnchart}
        series={seriescolumnchart}
        type="bar"
        height={370}
        width={"100%"}
      />
    </DashboardCard>
  );
  
};

export default FeesOverview;