import { IconlyProvider } from "react-iconly";
import { Navbar } from "../components/navbar";
import "../styles/globals.scss";

/**
 * @remarks
 *
 * IconlyProvider - medium gives icons 24X24 size
 */
const MyApp = ({ Component, pageProps }) => {
  return (
    <IconlyProvider
      set="light"
      size="medium"
      primaryColor="hsla(0, 0%, 0%, 0.5)"
    >
      <Navbar />
      <Component {...pageProps} />
    </IconlyProvider>
  );
};

export default MyApp;
