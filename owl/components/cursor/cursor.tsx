import { useContext, useEffect } from "react";
import { CursorContext } from "../../lib/context";
import styles from "../../styles/components/cursor/Cursor.module.scss";
import { motion } from "framer-motion";

/**
 * @todo
 * - Add videos
 * - Add text
 * - Remove eventlisteners
 */
export const Cursor = () => {
  const { cursor, setCursor } = useContext(CursorContext);

  // Move position
  const moveMouse = (event: MouseEvent) => {
    if (event !== null) {
      setCursor({
        ...cursor,
        position: {
          x: event.clientX || cursor.position.x,
          y: event.clientY || cursor.position.y,
        },
      });
    }
  };

  // Event listeners
  useEffect(() => {
    const node = cursor.parentRef.current as HTMLElement;

    node.addEventListener("mousemove", (e) => moveMouse(e), false);
    addVisible(node, cursor.cursorRef.current.classList);
    addCursorColor(cursor.cursorRef.current.classList, "white");

    () => {
      node.removeEventListener("mousemove", (e) => moveMouse(e), false);
      rmVisible(node, cursor.cursorRef.current.classList);
      rmCursorColor(cursor.cursorRef.current.classList, "white");
    };
  }, [addVisible, rmVisible]);

  return (
    <motion.div
      id="cursor"
      ref={cursor.cursorRef}
      className={styles["cursor"]}
      animate={{
        x: cursor.position.x,
        y: cursor.position.y,
        transition: { type: "tween", duration: 0.3, ease: "easeOut" },
      }}
    ></motion.div>
  );
};

/**
 * Visible
 */

const addVisible = (node: HTMLElement, classList: any) => {
  node.addEventListener("mouseenter", () => classList.add(styles["visible"]));
  node.addEventListener("mouseleave", () =>
    classList.remove(styles["visible"])
  );
};

const rmVisible = (node: HTMLElement, classList: any) => {
  node.removeEventListener("mouseenter", () =>
    classList.add(styles["visible"])
  );
  node.removeEventListener("mouseleave", () =>
    classList.remove(styles["visible"])
  );
};

/**
 * Cursor color
 */

const addCursorColor = (classList: any, color: string) => {
  const nodes = document.querySelectorAll(`.cursor-${color}`);
  console.log(nodes);

  nodes.forEach((n: Element) => {
    n.addEventListener("mouseenter", () =>
      classList.add(styles[`cursor-${color}`])
    );
    n.addEventListener("mouseleave", () =>
      classList.remove(styles[`cursor-${color}`])
    );
  });
};

const rmCursorColor = (classList: any, color: string) => {
  const nodes = document.querySelectorAll(`.cursor-${color}`);
  nodes.forEach((n: Element) => {
    n.removeEventListener("mouseenter", () =>
      classList.add(styles[`cursor-${color}`])
    );
    n.removeEventListener("mouseleave", () =>
      classList.remove(styles[`cursor-${color}`])
    );
  });
};
