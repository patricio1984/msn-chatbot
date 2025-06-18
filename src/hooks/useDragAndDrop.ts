import { useRef, useState, useEffect } from "react";

interface DragAndDropOptions {
  x?: number;
  y?: number;
  disableDragOnMobile?: boolean;
  mobileBreakpoint?: string;
}

export default function useDragAndDrop(p0?: DragAndDropOptions) {
  const mobileBreakpoint = p0?.mobileBreakpoint || "(max-width: 639px)";

  const [position, setPosition] = useState(() => ({
    x: p0?.x ?? window.innerWidth / 2 - 350,
    y: p0?.y ?? window.innerHeight / 2 - 300,
  }));

  const [isDragging, setIsDragging] = useState(false);
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const [isDragEnabled, setIsDragEnabled] = useState(true);

  useEffect(() => {
    if (!p0?.disableDragOnMobile) {
      setIsDragEnabled(true);
      return;
    }

    const mediaQuery = window.matchMedia(mobileBreakpoint);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsDragEnabled(!e.matches);
    };

    setIsDragEnabled(!mediaQuery.matches);

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [p0?.disableDragOnMobile, mobileBreakpoint]);

  useEffect(() => {
    if (!isDragEnabled) {
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      setPosition({
        x: e.clientX - offsetRef.current.x,
        y: e.clientY - offsetRef.current.y,
      });
    };

    const handlePointerUp = () => {
      draggingRef.current = false;
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragEnabled]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!isDragEnabled) return;

    draggingRef.current = true;
    setIsDragging(true);
    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const containerStyle: React.CSSProperties = {
    left: isDragEnabled ? position.x : undefined,
    top: isDragEnabled ? position.y : undefined,
    position: "fixed",
    cursor: isDragEnabled ? (isDragging ? "grabbing" : "grab") : "default",
    userSelect: "none",
    touchAction: "none",
    zIndex: 60,
  };

  return {
    position,
    onPointerDown,
    containerStyle,
    isDragging,
    isDragEnabled,
  };
}