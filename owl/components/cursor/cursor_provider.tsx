import { useRef, useState } from "react";
import { CursorContext } from "../../lib/context";
import { Cursor } from "./cursor";

export const CursorProvider = ({ children }: { children: JSX.Element }) => {
  const parentRef = useRef();
  const cursorRef = useRef();
  const cursorTextRef = useRef();

  const [cursor, setCursor] = useState({
    parentRef,
    cursorRef,
    cursorTextRef,
    position: { x: 0, y: 0 }, // starting position
  });

  return (
    <CursorContext.Provider value={{ cursor, setCursor }}>
      <div ref={parentRef} className="bg-primary">
        {children}
      </div>
      <Cursor />
    </CursorContext.Provider>
  );
};
