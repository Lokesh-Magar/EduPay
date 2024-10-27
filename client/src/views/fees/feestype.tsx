"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import Typography from "@mui/material/Typography";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import { TextField, InputAdornment, MenuItem } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useRef } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { createTheme } from "@mui/material/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const FeesGroupList = () => {
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
      <div className="flex ">
        <Typography variant="h6" component="h3">
          Fees Type
        </Typography>
        <nav style={{ marginLeft: "70.9%" }}>
          <Typography
            variant="h6"
            component="h3"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link href="#" style={{ marginRight: "25px" }}>
              Dashboard
            </Link>
            <span style={{ marginRight: "10px" }}>|</span>
            <Link href="#" style={{ marginRight: "25px" }}>
              Fees
            </Link>
            <span style={{ marginRight: "25px" }}>|</span>
            <Link href="#">Fees Type</Link>
          </Typography>
        </nav>
      </div>
      <div className="flex" style={{ display: "flex" }}>
        {/* Add fees group first card */}
        <div className="feesGroup mt-7">
          <Card sx={{ width: 280, height: 440 }}>
            <CardContent>
              <Typography variant="h6" component="h3">
                Add Fees Type
              </Typography>

              <Typography variant="body2" component="div">
                <CustomTextField
                  required
                  label="NAME"
                  style={{ marginTop: 20, width: "100%" }}
                />
              </Typography>

              <Typography variant="body2" component="div">
                <CustomTextField
                  select
                  fullWidth
                  defaultValue="Fees Group"
                  label="FEES GROUP *"
                  id="custom-select"
                  style={{ marginTop: 20 }}
                >
                  <CustomTextField
                    placeholder="Search..."
                    style={{ padding: "0 0 8px 6px" }}
                  />
                  <MenuItem value="Fees Group">
                    <span style={{ fontStyle: "normal" }}>Fees Group</span>
                  </MenuItem>
                  <MenuItem value={"School Fee"}>School Fee</MenuItem>
                  <MenuItem value={"Plus Two Fee"}>Plus Two Fee</MenuItem>
                  <MenuItem value={"Bachelor Fee"}>Bachelor Fee</MenuItem>
                </CustomTextField>
              </Typography>

              <Typography variant="body2" component="div">
                <CustomTextField
                  label="DESCRIPTION"
                  multiline
                  rows={4}
                  style={{ marginTop: 20, width: "100%" }} // Ensure consistent width
                />
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <Button variant="contained" style={{ marginTop: 10 }}>
                <CheckSharpIcon style={{ marginRight: 5 }} />
                SAVE
              </Button>
            </CardActions>
          </Card>
        </div>

        {/* Fees Group list 2nd card */}
        <div className="feesList mt-7 mx-6" style={{ flex: 1 }}>
          <Card sx={{ width: "102%", height: "105%" }}>
            <CardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h6"
                  component="h3"
                  style={{ flex: 1, marginRight: "16%" }}
                >
                  Fees Group List
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
                        backgroundColor: "transparent",
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
              {/* Table */}
              <div style={{ marginTop: "20px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          padding: "8px",
                          textAlign: "left",
                          backgroundColor: "lightgray",
                          borderRadius: "5px 0 0 5px",
                          position: "relative", // Required for rounded corners
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <ArrowDownwardIcon style={{ marginRight: "8px" }} />
                          <span>Name</span>
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
                          <span>Description</span>
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
                          <span>Action</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "8px" }}>Sample Name 1</td>
                      <td style={{ padding: "8px" }}>Sample Description 1</td>
                      <td style={{ padding: "5px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ borderRadius: "20px" }}
                        >
                          SELECT <ArrowDownwardIcon />
                        </Button>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "8px" }}>Sample Name 2</td>
                      <td style={{ padding: "8px" }}>Sample Description 2</td>
                      <td style={{ padding: "5px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ borderRadius: "20px" }}
                        >
                          SELECT <ArrowDownwardIcon />
                        </Button>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "8px" }}>Sample Name 3</td>
                      <td style={{ padding: "8px" }}>Sample Description 3</td>
                      <td style={{ padding: "5px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ borderRadius: "20px" }}
                        >
                          SELECT <ArrowDownwardIcon />
                        </Button>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "8px" }}>Sample Name 4</td>
                      <td style={{ padding: "8px" }}>Sample Description 4</td>
                      <td style={{ padding: "5px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ borderRadius: "20px" }}
                        >
                          SELECT <ArrowDownwardIcon />
                        </Button>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "8px" }}>Sample Name 5</td>
                      <td style={{ padding: "8px" }}>Sample Description 5</td>
                      <td style={{ padding: "5px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ borderRadius: "20px" }}
                        >
                          SELECT <ArrowDownwardIcon />
                        </Button>
                      </td>
                    </tr>
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
                Showing 1 to 3 of 3 entries
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                  cursor: "pointer",
                }}
              >
                <Button
                  size="small"
                  style={{
                    color: "black",
                    marginRight: "10px",
                    padding: "4px 8px",
                    width: "30px",
                    minWidth: "auto",
                    border: "none",
                  }}
                >
                  <ArrowBackIcon style={{ fontSize: "16px" }} />
                </Button>
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    padding: "4px 16px",
                    borderRadius: "4px",
                    background: theme.palette.primary.main,
                    cursor: "pointer",
                  }}
                >
                  1
                </Typography>
                <Button
                  size="small"
                  style={{
                    color: "black",
                    marginLeft: "10px",
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
      </div>
    </>
  );
};

export default FeesGroupList;
