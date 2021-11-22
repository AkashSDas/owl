// Importing base style at top before importing any component
import "../styles/global/base.scss";

import { Toaster } from "react-hot-toast";
import { IconlyProvider } from "react-iconly";
import { Navbar } from "../components/common/navbar";
import { CursorProvider } from "../components/cursor/cursor_provider";
import { SkewScrollingAnimation } from "../components/skew_scrolling/animation";
import { AuthWrapper } from "../components/auth/auth_wrapper";
import { AuthProvider } from "../components/auth/auth_provider";

/**
 * @remarks
 * IconlyProvider - medium gives icons 24X24 size
 */
const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <AuthWrapper>
        <CursorProvider>
          <IconlyProvider
            set="light"
            size="medium"
            primaryColor="hsla(0, 0%, 0%, 0.5)"
          >
            <Navbar />
            <SkewScrollingAnimation>
              <Component {...pageProps} />
            </SkewScrollingAnimation>
            <Toaster />
          </IconlyProvider>
        </CursorProvider>
      </AuthWrapper>
    </AuthProvider>
  );
};

export default MyApp;
