type Props = {
  iconPos: { x: number; y: number };
  onPointerDown: React.PointerEventHandler<HTMLDivElement>;
  onDoubleClick: () => void;
  isDragging: boolean;
};

export default function MessengerIcon({
  iconPos,
  onPointerDown,
  onDoubleClick,
  isDragging,
}: Props) {
  return (
    <div
      className="h-23 w-28 fixed z-50 flex flex-col items-center p-2 rounded-md transition hover:backdrop-blur-sm select-none"
      style={{
        left: iconPos.x,
        top: iconPos.y,
        cursor: isDragging ? "grabbing" : "pointer",
        userSelect: "none",
      }}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
    >
      <img src="/msn-icon.avif" alt="MSN Icon" className="w-12" />
      <span
        className="mt-1 text-white text-center text-xs font-semibold"
        style={{ textShadow: "0 0 3px black" }}
      >
        Windows Live Messenger
      </span>
    </div>
  );
}