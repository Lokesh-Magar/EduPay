"use client";
import { Typography, MenuItem } from "@mui/material";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CustomTextField from "@/app/(PortalLayout)/components/forms/theme-elements/CustomTextField";
import Button from "@mui/material/Button";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

const FeesCarryList = () => {
  return (
    <>
      <div className="flex">
        <Typography variant="h6" component="h3">
          Fees Carry Forward
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
            <Link href="#">Fees Carry Forward</Link>
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
              <CustomTextField
                select
                fullWidth
                defaultValue="Fees Group "
                id="custom-select"
                style={{ margin: "20px 50px 0 0 ", width: "50%" }}
              >
                <CustomTextField
                  placeholder="Search..."
                  style={{ padding: "0 6px 8px 6px", width: "100%" }}
                />
                <MenuItem value="Fees Group " style={{ width: "97.5%" }}>
                  <span style={{ fontStyle: "normal" }}>Fees Group *</span>
                </MenuItem>
                <MenuItem value="School Fee" style={{ width: "97.5%" }}>
                  School Fee
                </MenuItem>
                <MenuItem value="Plus Two Fee" style={{ width: "97.5%" }}>
                  Plus Two Fee
                </MenuItem>
                <MenuItem value="Bachelor Fee" style={{ width: "97.5%" }}>
                  Bachelor Fee
                </MenuItem>
              </CustomTextField>

              <CustomTextField
                select
                fullWidth
                defaultValue="Fees Group"
                id="custom-select"
                style={{ marginTop: "20px", width: "50%" }}
              >
                <CustomTextField
                  placeholder="Search..."
                  style={{ padding: "0 6px 8px 6px", width: "100%" }}
                />
                <MenuItem value="Fees Group" style={{ width: "97.5%" }}>
                  <span style={{ fontStyle: "normal" }}>Fees Group *</span>
                </MenuItem>
              </CustomTextField>
            </div>
            <div
              className="container mt-6"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Button variant="contained" startIcon={<SearchSharpIcon />}>
                SEARCH
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FeesCarryList;
