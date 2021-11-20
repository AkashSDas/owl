import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useWindowSize } from "../../lib/hooks/skew_scrolling";
import {
  useViewportScroll,
  useTransform,
  useSpring,
  motion,
} from "framer-motion";
import styles from "../../styles/components/skew_scrolling/SmoothScroll.module.scss";

export const SkewScrollingAnimation = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const size = useWindowSize();
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const node = ref.current as HTMLElement;
      document.body.style.height = `${node.getBoundingClientRect().height}px`;
    }

    // NOTE: a performance improvement will be to use debounce for size.height
    // so that you don't call it again and again when the height changes continously
  }, [size.height]);

  const config = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  const skewScrolling = () => {
    config.current = window.scrollY;
    config.previous += (config.current - config.previous) * config.ease;
    const value = Math.round(config.previous * 100) / 100;
    config.rounded = size.height < value ? size.height : value;
    // config.rounded = Math.round(config.previous * 100) / 100;

    const difference = config.current - config.rounded;
    const acceleration = difference / size.width;
    const velocity = +acceleration;
    const skew = velocity * 8;

    if (ref.current) {
      const node = ref.current as HTMLElement;
      node.style.transform = `skewY(${skew}deg)`;
    }
    requestAnimationFrame(() => skewScrolling());
  };

  useEffect(() => {
    requestAnimationFrame(() => skewScrolling());
  }, []);

  return (
    <SmoothScroll>
      <div ref={ref}>{children}</div>
    </SmoothScroll>
  );
};

const SmoothScroll = ({ children }) => {
  // scroll container
  const scrollRef = useRef(null);

  // page scrollable height based on content length
  const [pageHeight, setPageHeight] = useState(0);

  // update scrollable height when browser is resizing
  const resizePageHeight = useCallback((entries) => {
    for (let entry of entries) {
      setPageHeight(entry.contentRect.height);
    }
  }, []);

  // observe when browser is resizing
  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) =>
      resizePageHeight(entries)
    );
    scrollRef && resizeObserver.observe(scrollRef.current);
    return () => resizeObserver.disconnect();
  }, [scrollRef, resizePageHeight]);

  const { scrollY } = useViewportScroll(); // measures how many pixels user has scrolled vertically
  // as scrollY changes between 0px and the scrollable height, create a negative scroll value...
  // ... based on current scroll position to translateY the document in a natural way
  const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight]);
  const physics = { damping: 15, mass: 0.27, stiffness: 55 }; // easing of smooth scroll
  const spring = useSpring(transform, physics); // apply easing to the negative scroll value

  return (
    <>
      <motion.div
        ref={scrollRef}
        style={{ y: spring }} // translateY of scroll container using negative scroll value
        className={styles["scroll-container"]}
      >
        {children}
      </motion.div>
      {/* blank div that has a dynamic height based on the content's inherent height */}
      {/* this is neccessary to allow the scroll container to scroll... */}
      {/* ... using the browser's native scroll bar */}
      <div style={{ height: pageHeight }} />
    </>
  );
};
