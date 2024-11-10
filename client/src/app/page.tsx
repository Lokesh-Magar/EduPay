"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./image.module.css";
import "./global.css";
import Login from "../views/login/login";
import Register from "../views/register/register";

const IndexView = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  return (
    <>
      <nav className={styles.nav}>
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
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
              href="/"
              className={`${styles.custom_underline} text-black`}
            >
              Contact
            </Link>
            <button
              className={`${styles.custom_underline} text-black bg-transparent border-none cursor-pointer`}
              onClick={handleOpenLogin}
            >
              Login
            </button>
          </div>
        </div>
      </nav>
      <div className={styles.content}></div>

      {/* Student Login Dialog */}
      <Login 
        open={openLogin}
        handleClose={handleCloseLogin}
        openRegisterDialog={() => {
          handleCloseLogin();
          handleOpenRegister();
        }}
      />
      {/* Register Dialog */}
      <Register
        open={openRegister}
        handleClose={handleCloseRegister}
        openLoginDialog={handleOpenLogin}
      />
    </>
  );
};

export default IndexView;