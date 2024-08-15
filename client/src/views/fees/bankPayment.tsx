"use client";
import { Typography, MenuItem, TextField, InputAdornment } from "@mui/material";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import "react-datepicker/dist/react-datepicker.css";
import { useRef } from "react";
import Button from "@mui/material/Button";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Icon } from "@iconify/react/dist/iconify.js";
import { createTheme } from "@mui/material/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
export const BankPaymentList = () => {
  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (textFieldRef.current) {
      textFieldRef.current.placeholder = "";
    }
  };

  const handleBlur = () => {
    if (textFieldRef.current && textFieldRef.current.value === "") {
      textFieldRef.current.placeholder = "SEARCH";
    }
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
  });
  return (
    <>
      <div className="flex">
        <Typography variant="h6" component="h3">
          Bank Payment
        </Typography>
        <nav
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >
          <Typography
            variant="h6"
            component="h3"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link href="#" style={{ marginRight: "35px" }}>
              Dashboard
            </Link>
            <span style={{ marginRight: "10px" }}>|</span>
            <Link href="#" style={{ marginRight: "35px" }}>
              Fees Collection
            </Link>
            <span style={{ marginRight: "35px" }}>|</span>
            <Link href="#">Bank Payment</Link>
          </Typography>
        </nav>
      </div>
      <div className="feesList mt-7" style={{ flex: 1 }}>
        <Card sx={{ width: "100%", height: "105%" }}>
          <CardContent>
            <Typography variant="h6" component="h4">
              Select Criteria
            </Typography>

            <div className="container" style={{ display: "flex" }}>
              <Typography
                variant="body2"
                component="div"
                style={{ margin: "1.75% 14% 0 0 " }}
              >
                <CustomTextField
                  label="FROM"
                  type="date"
                  style={{ width: "170%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Typography>

              <Typography
                variant="body2"
                component="div"
                style={{ margin: "1.75% 14% 0 0  " }}
              >
                <CustomTextField
                  label="TO"
                  type="date"
                  style={{ width: "170%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Typography>
              <CustomTextField
                select
                fullWidth
                defaultValue="Fees Group"
                label="CLASS"
                id="custom-select"
                style={{ margin: "20px 50px 0 0 ", width: "20%" }}
              >
                <CustomTextField
                  placeholder="Search..."
                  style={{ padding: "0 6px 8px 6px" }}
                />
                <MenuItem value="Fees Group">
                  <span style={{ fontStyle: "normal" }}>Fees Group</span>
                </MenuItem>
                <MenuItem value={"School Fee"}>School Fee</MenuItem>
                <MenuItem value={"Plus Two Fee"}>Plus Two Fee</MenuItem>
                <MenuItem value={"Bachelor Fee"}>Bachelor Fee</MenuItem>
              </CustomTextField>
              <CustomTextField
                select
                fullWidth
                defaultValue="Fees Group"
                label="SECTION"
                id="custom-select"
                style={{ margin: "20px 50px 0 0 ", width: "20%" }}
              >
                <CustomTextField
                  placeholder="Search..."
                  style={{ padding: "0 6px 8px 6px" }}
                />
                <MenuItem value="Fees Group">
                  <span style={{ fontStyle: "normal" }}>Fees Group</span>
                </MenuItem>
                <MenuItem value={"School Fee"}>School Fee</MenuItem>
                <MenuItem value={"Plus Two Fee"}>Plus Two Fee</MenuItem>
                <MenuItem value={"Bachelor Fee"}>Bachelor Fee</MenuItem>
              </CustomTextField>
              <CustomTextField
                select
                fullWidth
                defaultValue="Fees Group"
                label="STATUS"
                id="custom-select"
                style={{ marginTop: "20px", width: "20%" }}
              >
                <CustomTextField
                  placeholder="Search..."
                  style={{ padding: "0 6px 8px 6px" }}
                />
                <MenuItem value="Fees Group">
                  <span style={{ fontStyle: "normal" }}>Fees Group</span>
                </MenuItem>
                <MenuItem value={"School Fee"}>School Fee</MenuItem>
                <MenuItem value={"Plus Two Fee"}>Plus Two Fee</MenuItem>
                <MenuItem value={"Bachelor Fee"}>Bachelor Fee</MenuItem>
              </CustomTextField>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* ---- Table Section ----*/}
      <div className="feesList mt-7 " style={{ flex: 1 }}>
        <Card sx={{ width: "100%", height: "105%" }}>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                component="h3"
                style={{ flex: 1, marginRight: "16%" }}
              >
                Bank Payment List
              </Typography>
              <div style={{ flexGrow: 1 }}>
                <TextField
                  id="standard-search"
                  variant="standard"
                  placeholder="SEARCH"
                  inputRef={textFieldRef}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchSharpIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ButtonGroup
                  variant="outlined"
                  aria-label="Basic button group"
                  sx={{
                    "& .MuiButton-root": {
                      fontSize: "1.2rem",
                      padding: "4px 8px",
                      backgroundColor: "tansparent",
                      borderColor: "currentColor",
                      color: "currentColor",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                        borderColor: "currentColor",
                      },
                      boxShadow: "none",
                    },
                  }}
                >
                  <Button title="Copy Table">
                    <Icon icon="material-symbols:file-copy-outline-sharp" />
                  </Button>
                  <Button title="Export to Excel">
                    <Icon icon="mdi:file-excel-outline" />
                  </Button>
                  <Button title="Export to CSV">
                    <Icon icon="mdi:file-document-outline" />
                  </Button>
                  <Button title="Export to PDF">
                    <Icon icon="mdi:file-pdf-outline" />
                  </Button>
                  <Button title="Print">
                    <Icon icon="fa:print" style={{ fontSize: "1rem" }} />
                  </Button>
                  <Button title="Action">
                    <Icon
                      icon="mdi:table"
                      style={{
                        fontSize: "1.3rem",
                      }}
                    />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            {/*--------- Table section --------*/}
            <div style={{ marginTop: "20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                        position: "relative",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>Student Name </span>
                      </div>
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>View Transaction</span>
                      </div>
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>Date</span>
                      </div>
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginLeft: "40px" }} />
                        <span>Amount</span>
                      </div>
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>Note</span>
                      </div>
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>File</span>
                      </div>
                    </th>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>Status</span>
                      </div>
                    </th>

                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                        backgroundColor: "lightgray",
                        borderRadius: "0 5px 5px 0",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                        <span>Actions</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                {/*----- Table body section ----- */}
                <tbody>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "8px" }}></td>
                    <td style={{ padding: "8px" }}></td>
                    <td style={{ padding: "8px" }}></td>
                    <td style={{ padding: "10px" }}>
                      No Data Available in the table
                    </td>
                    <td style={{ padding: "8px" }}></td>
                    <td style={{ padding: "8px" }}></td>
                    <td style={{ padding: "5px" }}></td>
                    <td style={{ padding: "8px" }}></td>
                  </tr>
                  {/*
                  <tr style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '8px' }}>STUDENT NAME</td>
                    <td style={{ padding: '8px' }}>AMOUNT</td>
                    <td style={{ padding: '8px' }}>WAIVER</td>
                    <td style={{ padding: '8px' }}>FINE </td>
                    <td style={{ padding: '8px' }}>PAID</td>
                    <td style={{ padding: '8px' }}>BALANCE</td>
                    <td style={{ padding: '5px' }}>
                      <Button variant='outlined' size='small' style={{ borderRadius: '5px' }}>
                        STATUS
                      </Button>
                    </td>
                    <td style={{ padding: '8px' }}>DATE</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </CardContent>
          {/* Pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "16px",
            }}
          >
            <Typography variant="body2" style={{ marginLeft: "16px" }}>
              Showing 0 to 0 of 0 entries
            </Typography>
            {/*----- Page number section ----- */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                cursor: "pointer",
                marginRight: "50%",
              }}
            >
              <Button
                size="small"
                style={{
                  color: "black",
                  padding: "4px 8px",
                  width: "30px",
                  minWidth: "auto",
                  border: "none",
                }}
              >
                <ArrowBackIcon style={{ transform: "scale(0.8)" }} />
              </Button>
              <Button
                size="small"
                style={{
                  color: "black",
                  padding: "4px 8px",
                  width: "30px",
                  minWidth: "auto",
                  border: "none",
                }}
              >
                <ArrowForwardIcon style={{ transform: "scale(0.8)" }} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
