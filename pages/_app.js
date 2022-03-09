import Header from "./Header";
import "../style/sh.css";
// import "../assets/css/nextjs-argon-dashboard.min.css";


// import "../assets/css/nextjs-argon-dashboard.css";
// import "../assets/css/nextjs-argon-dashboard.min.css";

// import Link from "next/link";
// import App from "next/app";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="container">
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
