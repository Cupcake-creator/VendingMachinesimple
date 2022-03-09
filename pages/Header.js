import Head from "next/head";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="../pubilc/image/favicon.ico" />
        <title>Vending Machine EX</title>

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css"
        />

        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />

        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@200;400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>

      <Link href="/">
      <div className="header">
        <div>VENGING Machine EX</div>
      </div>
      </Link>
      
    </>
  );
};

export default Header;
