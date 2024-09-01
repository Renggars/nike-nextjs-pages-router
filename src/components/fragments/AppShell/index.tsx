import Head from "next/head";
import { Lato } from "next/font/google";
import { useRouter } from "next/router";
import Toaster from "@/components/ui/Toaster";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import Navbar from "../Navbar";
import { ToasterType } from "@/types/toaster.type";
import NewNavbar from "../NewNavbar";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
const disableNavbar = ["auth", "admin", "member"];

type PropsType = {
  children: React.ReactNode;
};

const AppShell = (props: PropsType) => {
  const { children } = props;
  const { pathname } = useRouter();
  const { toaster }: ToasterType = useContext(ToasterContext);

  //   useEffect(() => {
  //     setToaster({
  //       variant: "success",
  //       message: "welcome",
  //     });
  //   }, []);

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className={lato.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <NewNavbar />}
        {children}
        {Object.keys(toaster).length > 0 && <Toaster />}
      </div>
    </>
  );
};

export default AppShell;
