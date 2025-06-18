import { useRef, useState, useEffect } from "react";

export default function useDragAndDrop(p0?: { x: number; y: number }) {
  const [position, setPosition] = useState(() => ({
    x: p0?.x ?? window.innerWidth / 2 - 350,
    y: p0?.y ?? window.innerHeight / 2 - 300,
  }));

  const [isDragging, setIsDragging] = useState(false);
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
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
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    setIsDragging(true);
    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const containerStyle: React.CSSProperties = {
    left: position.x,
    top: position.y,
    position: "fixed",
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
    touchAction: "none",
    zIndex: 60,
  };

  return {
    position,
    onPointerDown,
    containerStyle,
    isDragging,
  };
}