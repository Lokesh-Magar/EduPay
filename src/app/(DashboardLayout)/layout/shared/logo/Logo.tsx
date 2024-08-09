import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  display: "block",
  marginTop: "-25px",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image src="/edupay.png" alt="logo" height={70} width={174} priority />
    </LinkStyled>
  );
};

export default Logo;
