"use client";
import Login from "@/views/login/login";
import { useState } from "react";

export default function LoginPage() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Login open={open} handleClose={handleClose} />
    </>
  );
}
