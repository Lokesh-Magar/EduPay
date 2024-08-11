"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./image.module.css";
import "./global.css";
import Login from "@/views/login/Login"; // Ensure this matches the file path and case

const IndexView = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <nav className={styles.nav}>
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="#"
            className={`${styles.logos} text-black text-2xl font-bold`}
          >
            <img className={styles.logo} src="/edupay.png" alt="EduFee Logo" />
            <strong className={styles.edupay}>EduFee</strong>
          </Link>
          <div className="space-x-4">
            <Link href="/" className={`${styles.custom_underline} text-black`}>
              Home
            </Link>
            <Link
              href="#contact"
              className={`${styles.custom_underline} text-black`}
            >
              Contact
            </Link>
            <button
              className={`${styles.custom_underline} text-black bg-transparent border-none cursor-pointer`}
              onClick={handleOpen}
            >
              Login
            </button>
          </div>
        </div>
      </nav>
      <div className={styles.content}></div>

      {/* Dialog Component */}
      <Login open={open} handleClose={handleClose} />
    </>
  );
};

export default IndexView;
