import React from "react";
import QRCode from "qrcode";
import { useState, ChangeEvent } from "react";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { Button } from "@mui/material";

const QRCODE = () => {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const GenerateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: 800,
        margin: 2,
        color: {
          dark: "#000000ff",
          light: "#ffffffff",
        },
      },
      (err, url) => {
        if (err) return console.error(err);

        console.log(url);
        setQrCode(url);
      }
    );
  };
  return (
    <div className="qrCode">
      <div
        className="div"
        style={{ display: "flex", marginTop: "40px", gap: "5px" }}
      >
        <CustomTextField
          placeholder="Enter your email...."
          style={{ width: "30%" }}
          value={url}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setUrl(evt.target.value)
          }
        />
        <Button
          onClick={GenerateQRCode}
          style={{ background: "blue", color: "white" }}
        >
          Generate QR Code
        </Button>
      </div>
      {qrCode && (
        <img
          src={qrCode}
          style={{
            display: "block",
            width: "50%",
            maxWidth: "200px",
            margin: "2rem auto",
            marginLeft: "50%",
            marginTop: "-6%",
            border: "2px solid black",
          }}
          alt="Generated QR Code"
        />
      )}
    </div>
  );
};

export default QRCODE;