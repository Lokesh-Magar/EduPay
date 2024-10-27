"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField, InputAdornment } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { useRef, useState } from "react";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Papa from "papaparse";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Grid,
} from "@mui/material";

// Register necessary ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Student interface
interface Student {
  name: string;
  faculty: string;
  email: string;
  totalFees: number;
  paidAmount: number;
}

const FeesGroupList = () => {
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [email, setEmail] = useState("");
  const [totalFees, setTotalFees] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  // Theme for dark/light mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#4CAF50",
          },
          secondary: {
            main: "#FF9800",
          },
          background: {
            default: prefersDarkMode ? "#303030" : "#f4f6f8",
          },
        },
        shape: {
          borderRadius: 12,
        },
        typography: {
          fontFamily: "Roboto, sans-serif",
          button: {
            textTransform: "none",
            fontWeight: "bold",
          },
        },
      }),
    [prefersDarkMode]
  );

  const handleAddStudent = () => {
    const newStudent: Student = { name, faculty, email, totalFees, paidAmount };
    setStudents((prev) => [...prev, newStudent]);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setFaculty("");
    setEmail("");
    setTotalFees(0);
    setPaidAmount(0);
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const data = results.data as Student[];
          setStudents((prev) => [...prev, ...data]);
        },
      });
    }
  };

  const totalCollected = students.reduce(
    (acc, student) => acc + student.paidAmount,
    0
  );
  const totalFeesDue = students.reduce(
    (acc, student) => acc + (student.totalFees - student.paidAmount),
    0
  );
  const totalEstimatedMonthly = totalFeesDue / Math.max(1, students.length);

  const chartData = {
    labels: ["Monthly", "Weekly", "Yearly"],
    datasets: [
      {
        label: "Fees Collected",
        data: [totalCollected / 12, totalCollected / 52, totalCollected],
        backgroundColor: ["#4CAF50", "#36A2EB", "#FF6384"],
      },
      {
        label: "Fees Due",
        data: [totalFeesDue / 12, totalFeesDue / 52, totalFeesDue],
        backgroundColor: ["#FF9800", "#FFCD56", "#4BC0C0"],
      },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" style={{ marginTop: "20px" }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Fees Management System
        </Typography>

        <nav style={{ textAlign: "center", marginBottom: "20px" }}>
          <Link
            href="#"
            style={{ marginRight: "25px", color: theme.palette.primary.main }}
          >
            Dashboard
          </Link>
          <Link
            href="#"
            style={{ marginRight: "25px", color: theme.palette.primary.main }}
          >
            Fees
          </Link>
          <Link href="#" style={{ color: theme.palette.primary.main }}>
            Fees Type
          </Link>
        </nav>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Add Student Section */}
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 5 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Add Student
                </Typography>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Faculty"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Total Fees"
                  type="number"
                  value={totalFees}
                  onChange={(e) => setTotalFees(Number(e.target.value))}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Paid Amount"
                  type="number"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(Number(e.target.value))}
                  fullWidth
                  margin="normal"
                />
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddStudent}
                  fullWidth
                  sx={{ borderRadius: "8px" }}
                >
                  Add Student
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Fees Group List */}
          <Grid item xs={12} md={8}>
            <Card sx={{ boxShadow: 5 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Fees Group List
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    variant="outlined"
                    placeholder="Search"
                    inputRef={textFieldRef}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchSharpIcon />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    style={{ marginRight: "10px" }}
                  />
                  <input type="file" accept=".csv" onChange={handleCSVUpload} />
                </div>

                {/* Student Information Table */}
                <TableContainer
                  component={Paper}
                  sx={{ maxHeight: "300px", marginTop: "20px" }}
                >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {[
                          "Name",
                          "Faculty",
                          "Email",
                          "Total Fees",
                          "Paid Amount",
                          "Remaining Balance",
                        ].map((header) => (
                          <TableCell
                            key={header}
                            align="center"
                            style={{ fontWeight: "bold" }}
                          >
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {students.map((student, index) => (
                        <TableRow key={index} hover>
                          <TableCell align="center">{student.name}</TableCell>
                          <TableCell align="center">
                            {student.faculty}
                          </TableCell>
                          <TableCell align="center">{student.email}</TableCell>
                          <TableCell align="center">
                            ${student.totalFees.toFixed(2)}
                          </TableCell>
                          <TableCell align="center">
                            ${student.paidAmount.toFixed(2)}
                          </TableCell>
                          <TableCell align="center">
                            $
                            {(student.totalFees - student.paidAmount).toFixed(
                              2
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart and Projection */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 5 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Projection and Fees Collection
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Total Collected Fees: </strong>$
                      {totalCollected.toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Total Remaining Fees: </strong>$
                      {totalFeesDue.toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Estimated Monthly Collection: </strong>$
                      {totalEstimatedMonthly.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div style={{ marginTop: "20px" }}>
                      <Bar
                        data={chartData}
                        options={{ maintainAspectRatio: false }}
                        height={300}
                      />
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px",
            marginTop: "20px",
          }}
        >
          <Typography variant="body2" style={{ marginLeft: "16px" }}>
            Showing 1 to {students.length} of {students.length} entries
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              size="small"
              style={{ color: theme.palette.primary.main, marginRight: "10px" }}
            >
              <ArrowBackIcon />
            </Button>
            <Typography
              variant="body2"
              sx={{
                padding: "4px 16px",
                borderRadius: "4px",
                background: theme.palette.primary.main,
                color: "white",
              }}
            >
              1
            </Typography>
            <Button
              size="small"
              style={{ color: theme.palette.primary.main, marginLeft: "10px" }}
            >
              <ArrowForwardIcon />
            </Button>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default FeesGroupList;

// "use client";
// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
// import Typography from "@mui/material/Typography";
// import CheckSharpIcon from "@mui/icons-material/CheckSharp";
// import { TextField, InputAdornment, MenuItem } from "@mui/material";
// import SearchSharpIcon from "@mui/icons-material/SearchSharp";
// import ButtonGroup from "@mui/material/ButtonGroup";
// import { useRef } from "react";
// import Link from "next/link";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { createTheme } from "@mui/material/styles";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// const FeesGroupList = () => {
//   const textFieldRef = useRef<HTMLInputElement>(null);

//   const handleFocus = () => {
//     if (textFieldRef.current) {
//       textFieldRef.current.placeholder = "";
//     }
//   };

//   const handleBlur = () => {
//     if (textFieldRef.current && textFieldRef.current.value === "") {
//       textFieldRef.current.placeholder = "SEARCH";
//     }
//   };

//   const theme = createTheme({
//     palette: {
//       primary: {
//         main: "#1976d2",
//       },
//     },
//   });

//   return (
//     <>
//       <div className="flex ">
//         <Typography variant="h6" component="h3">
//           Fees Type
//         </Typography>
//         <nav style={{ marginLeft: "70.9%" }}>
//           <Typography
//             variant="h6"
//             component="h3"
//             style={{ display: "flex", alignItems: "center" }}
//           >
//             <Link href="#" style={{ marginRight: "25px" }}>
//               Dashboard
//             </Link>
//             <span style={{ marginRight: "10px" }}>|</span>
//             <Link href="#" style={{ marginRight: "25px" }}>
//               Fees
//             </Link>
//             <span style={{ marginRight: "25px" }}>|</span>
//             <Link href="#">Fees Type</Link>
//           </Typography>
//         </nav>
//       </div>
//       <div className="flex" style={{ display: "flex" }}>
//         {/* Add fees group first card */}
//         <div className="feesGroup mt-7">
//           <Card sx={{ width: 280, height: 440 }}>
//             <CardContent>
//               <Typography variant="h6" component="h3">
//                 Add Fees Type
//               </Typography>

//               <Typography variant="body2" component="div">
//                 <CustomTextField
//                   required
//                   label="NAME"
//                   style={{ marginTop: 20, width: "100%" }}
//                 />
//               </Typography>

//               <Typography variant="body2" component="div">
//                 <CustomTextField
//                   select
//                   fullWidth
//                   defaultValue="Fees Group"
//                   label="FEES GROUP *"
//                   id="custom-select"
//                   style={{ marginTop: 20 }}
//                 >
//                   <CustomTextField
//                     placeholder="Search..."
//                     style={{ padding: "0 0 8px 6px" }}
//                   />
//                   <MenuItem value="Fees Group">
//                     <span style={{ fontStyle: "normal" }}>Fees Group</span>
//                   </MenuItem>
//                   <MenuItem value={"School Fee"}>School Fee</MenuItem>
//                   <MenuItem value={"Plus Two Fee"}>Plus Two Fee</MenuItem>
//                   <MenuItem value={"Bachelor Fee"}>Bachelor Fee</MenuItem>
//                 </CustomTextField>
//               </Typography>

//               <Typography variant="body2" component="div">
//                 <CustomTextField
//                   label="DESCRIPTION"
//                   multiline
//                   rows={4}
//                   style={{ marginTop: 20, width: "100%" }} // Ensure consistent width
//                 />
//               </Typography>
//             </CardContent>
//             <CardActions style={{ justifyContent: "center" }}>
//               <Button variant="contained" style={{ marginTop: 10 }}>
//                 <CheckSharpIcon style={{ marginRight: 5 }} />
//                 SAVE
//               </Button>
//             </CardActions>
//           </Card>
//         </div>

//         {/* Fees Group list 2nd card */}
//         <div className="feesList mt-7 mx-6" style={{ flex: 1 }}>
//           <Card sx={{ width: "102%", height: "105%" }}>
//             <CardContent>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <Typography
//                   variant="h6"
//                   component="h3"
//                   style={{ flex: 1, marginRight: "16%" }}
//                 >
//                   Fees Group List
//                 </Typography>
//                 <div style={{ flexGrow: 1 }}>
//                   <TextField
//                     id="standard-search"
//                     variant="standard"
//                     placeholder="SEARCH"
//                     inputRef={textFieldRef}
//                     onFocus={handleFocus}
//                     onBlur={handleBlur}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <SearchSharpIcon />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </div>
//                 <div style={{ display: "flex", justifyContent: "center" }}>
//                   <ButtonGroup
//                     variant="outlined"
//                     aria-label="Basic button group"
//                     sx={{
//                       "& .MuiButton-root": {
//                         fontSize: "1.2rem",
//                         padding: "4px 8px",
//                         backgroundColor: "transparent",
//                         borderColor: "currentColor",
//                         color: "currentColor",
//                         "&:hover": {
//                           backgroundColor: "rgba(0, 0, 0, 0.08)",
//                           borderColor: "currentColor",
//                         },
//                         boxShadow: "none",
//                       },
//                     }}
//                   >
//                     <Button title="Copy Table">
//                       <Icon icon="material-symbols:file-copy-outline-sharp" />
//                     </Button>
//                     <Button title="Export to Excel">
//                       <Icon icon="mdi:file-excel-outline" />
//                     </Button>
//                     <Button title="Export to CSV">
//                       <Icon icon="mdi:file-document-outline" />
//                     </Button>
//                     <Button title="Export to PDF">
//                       <Icon icon="mdi:file-pdf-outline" />
//                     </Button>
//                     <Button title="Print">
//                       <Icon icon="fa:print" style={{ fontSize: "1rem" }} />
//                     </Button>
//                     <Button title="Action">
//                       <Icon
//                         icon="mdi:table"
//                         style={{
//                           fontSize: "1.3rem",
//                         }}
//                       />
//                     </Button>
//                   </ButtonGroup>
//                 </div>
//               </div>
//               {/* Table */}
//               <div style={{ marginTop: "20px" }}>
//                 <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                   <thead>
//                     <tr>
//                       <th
//                         style={{
//                           padding: "8px",
//                           textAlign: "left",
//                           backgroundColor: "lightgray",
//                           borderRadius: "5px 0 0 5px",
//                           position: "relative", // Required for rounded corners
//                         }}
//                       >
//                         <div style={{ display: "flex", alignItems: "center" }}>
//                           <ArrowDownwardIcon style={{ marginRight: "8px" }} />
//                           <span>Name</span>
//                         </div>
//                       </th>
//                       <th
//                         style={{
//                           padding: "8px",
//                           textAlign: "left",
//                           backgroundColor: "lightgray",
//                         }}
//                       >
//                         <div style={{ display: "flex", alignItems: "center" }}>
//                           <ArrowDownwardIcon style={{ marginRight: "8px" }} />
//                           <span>Description</span>
//                         </div>
//                       </th>
//                       <th
//                         style={{
//                           padding: "8px",
//                           textAlign: "left",
//                           backgroundColor: "lightgray",
//                           borderRadius: "0 5px 5px 0",
//                         }}
//                       >
//                         <div style={{ display: "flex", alignItems: "center" }}>
//                           <ArrowDownwardIcon style={{ marginRight: "8px" }} />
//                           <span>Action</span>
//                         </div>
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr style={{ borderBottom: "1px solid #ddd" }}>
//                       <td style={{ padding: "8px" }}>Sample Name 1</td>
//                       <td style={{ padding: "8px" }}>Sample Description 1</td>
//                       <td style={{ padding: "5px" }}>
//                         <Button
//                           variant="outlined"
//                           size="small"
//                           style={{ borderRadius: "20px" }}
//                         >
//                           SELECT <ArrowDownwardIcon />
//                         </Button>
//                       </td>
//                     </tr>
//                     <tr style={{ borderBottom: "1px solid #ddd" }}>
//                       <td style={{ padding: "8px" }}>Sample Name 2</td>
//                       <td style={{ padding: "8px" }}>Sample Description 2</td>
//                       <td style={{ padding: "5px" }}>
//                         <Button
//                           variant="outlined"
//                           size="small"
//                           style={{ borderRadius: "20px" }}
//                         >
//                           SELECT <ArrowDownwardIcon />
//                         </Button>
//                       </td>
//                     </tr>
//                     <tr style={{ borderBottom: "1px solid #ddd" }}>
//                       <td style={{ padding: "8px" }}>Sample Name 3</td>
//                       <td style={{ padding: "8px" }}>Sample Description 3</td>
//                       <td style={{ padding: "5px" }}>
//                         <Button
//                           variant="outlined"
//                           size="small"
//                           style={{ borderRadius: "20px" }}
//                         >
//                           SELECT <ArrowDownwardIcon />
//                         </Button>
//                       </td>
//                     </tr>
//                     <tr style={{ borderBottom: "1px solid #ddd" }}>
//                       <td style={{ padding: "8px" }}>Sample Name 4</td>
//                       <td style={{ padding: "8px" }}>Sample Description 4</td>
//                       <td style={{ padding: "5px" }}>
//                         <Button
//                           variant="outlined"
//                           size="small"
//                           style={{ borderRadius: "20px" }}
//                         >
//                           SELECT <ArrowDownwardIcon />
//                         </Button>
//                       </td>
//                     </tr>
//                     <tr style={{ borderBottom: "1px solid #ddd" }}>
//                       <td style={{ padding: "8px" }}>Sample Name 5</td>
//                       <td style={{ padding: "8px" }}>Sample Description 5</td>
//                       <td style={{ padding: "5px" }}>
//                         <Button
//                           variant="outlined"
//                           size="small"
//                           style={{ borderRadius: "20px" }}
//                         >
//                           SELECT <ArrowDownwardIcon />
//                         </Button>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//             {/* Pagination */}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 padding: "16px",
//               }}
//             >
//               <Typography variant="body2" style={{ marginLeft: "16px" }}>
//                 Showing 1 to 3 of 3 entries
//               </Typography>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   margin: "auto",
//                   cursor: "pointer",
//                 }}
//               >
//                 <Button
//                   size="small"
//                   style={{
//                     color: "black",
//                     marginRight: "10px",
//                     padding: "4px 8px",
//                     width: "30px",
//                     minWidth: "auto",
//                     border: "none",
//                   }}
//                 >
//                   <ArrowBackIcon style={{ fontSize: "16px" }} />
//                 </Button>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: "white",
//                     padding: "4px 16px",
//                     borderRadius: "4px",
//                     background: theme.palette.primary.main,
//                     cursor: "pointer",
//                   }}
//                 >
//                   1
//                 </Typography>
//                 <Button
//                   size="small"
//                   style={{
//                     color: "black",
//                     marginLeft: "10px",
//                     padding: "4px 8px",
//                     width: "30px",
//                     minWidth: "auto",
//                     border: "none",
//                   }}
//                 >
//                   <ArrowForwardIcon style={{ transform: "scale(0.8)" }} />
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FeesGroupList;
