// Importing base style at top before importing any component
import "../styles/global/base.scss";

import { Toaster } from "react-hot-toast";
import { IconlyProvider } from "react-iconly";
import { Navbar } from "../components/common/navbar";
import { CursorProvider } from "../components/cursor/cursor_provider";
import { SkewScrollingAnimation } from "../components/skew_scrolling/animation";
import { AuthWrapper } from "../components/auth/auth_wrapper";
import { AuthProvider } from "../components/auth/auth_provider";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { BaseSidebar } from "../components/common/sidebar";
import { useState } from "react";
import { CourseEditorSidebarContext } from "../lib/context/sidebar";

/**
 * @remarks
 * - IconlyProvider - medium gives icons 24X24 size
 * - SmoothScrolling in SkewScrolling is causing increase in height of
 * pages which leads to large white space in bottom of each page
 */
const MyApp = ({ Component, pageProps, router }) => {
  const slideAnimation = {
    pageInitial: { y: "100vh", opacity: 0, skewY: "7deg" },
    pageAnimate: { y: "0vh", opacity: 1, skewY: "0deg" },
    pageExit: { y: "-100vh", opacity: 0, skewY: "7deg" },
  };

  const [sidebar, setSidebar] = useState({
    courseId: null,
    chapterId: null,
    lessonId: null,
  });

  return (
    <AuthProvider>
      <AuthWrapper>
        <CursorProvider>
          <IconlyProvider
            set="light"
            size="medium"
            primaryColor="hsla(0, 0%, 0%, 0.5)"
          >
            <CourseEditorSidebarContext.Provider
              value={{ sidebar, setSidebar }}
            >
              <Navbar />
              <BaseSidebar />
              <AnimatePresence initial={false} exitBeforeEnter={true}>
                <motion.div
                  key={router.route}
                  initial="pageInitial"
                  animate="pageAnimate"
                  exit="pageExit"
                  variants={slideAnimation}
                  transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
                >
                  <SkewScrollingAnimation>
                    <Component {...pageProps} />
                  </SkewScrollingAnimation>
                </motion.div>
              </AnimatePresence>
              <Toaster />
            </CourseEditorSidebarContext.Provider>
          </IconlyProvider>
        </CursorProvider>
      </AuthWrapper>
    </AuthProvider>
  );
};

export default MyApp;
