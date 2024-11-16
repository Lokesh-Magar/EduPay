import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@mui/material";

const QRCODE = () => {
  const [invoiceData, setInvoiceData] = useState({
    eSewa_id: "9813559689",
    name: "Rabin Kaduwal"
    
  });
  const [qrCode, setQrCode] = useState("");

  const GenerateQRCode = () => {
    const dataToEncode = JSON.stringify(invoiceData);
    QRCode.toDataURL(
      dataToEncode,
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
        setQrCode(url);
      }
    );
  };

  // Automatically generate QR code when the component loads
  useEffect(() => {
    GenerateQRCode();
  }, []);

  return (
    <div className="qrCode">
      <div
        className="div"
        style={{ display: "flex", marginTop: "40px", gap: "5px" }}
      >
        {/* <Button
          onClick={GenerateQRCode}
          style={{ background: "blue", color: "white" }}
        >
          Generate QR Code
        </Button> */}
      </div>
      <div className="invoice-details" style={{ marginTop: "20px" }}>
        {/* <p><strong>Invoice ID:</strong> {invoiceData.esewid}</p>
        <p><strong>Amount:</strong> Rs. {invoiceData.amount}</p>
        <p><strong>Due Date:</strong> {invoiceData.dueDate}</p> */}
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
