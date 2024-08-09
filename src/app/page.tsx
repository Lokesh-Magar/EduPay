import Link from "next/link";
import styles from "./image.module.css";
import "./global.css";
const IndexView = ({
  params,
}: {
  params: { params: { children: React.ReactNode } };
}) => {
  return (
    <>
      <nav className={`${styles.nav} `}>
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="#"
            className={`${styles.logos} text-black text-2xl font-bold`}
          >
            <img className={styles.logo} src="/edupay.png" alt="" />
            <strong className={styles.edupay}>EduFee</strong>
          </Link>
          <div className="space-x-4">
            <Link href="" className={`${styles.custom_underline} text-black `}>
              Home
            </Link>
            <Link
              href="#contact"
              className={`${styles.custom_underline} text-black `}
            >
              Contact
            </Link>
            <Link
              href="/login"
              className={`${styles.custom_underline} text-black `}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
      <div className={styles.content}></div>
    </>
  );
};
export default IndexView;
