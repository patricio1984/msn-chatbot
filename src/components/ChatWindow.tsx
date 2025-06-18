import { forwardRef } from "react";
import type { Message } from "../types";
import "./chatWindow.css";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ProfileImage from "./ProfileImage";
import SendArea from "./SendArea";
import useDragAndDrop from "../hooks/useDragAndDrop";

type Props = {
  nudge: boolean;
  messages: Message[];
  input: string;
  setInput: (val: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onNudge: () => void;
  isFetching: boolean; // Nueva prop
};

const ChatWindow = forwardRef<HTMLDialogElement, Props>(
  ({ nudge, messages, input, setInput, onClose, onSubmit, onNudge, isFetching }, ref) => { // Recibe isFetching
    const { containerStyle, onPointerDown } = useDragAndDrop({
      x: window.innerWidth / 2 - 375,
      y: window.innerHeight / 2 - 325,
      disableDragOnMobile: true,
    });

    return (
      <dialog
        open
        ref={ref}
        className={`msn-window ${
          nudge ? "is-nudged" : ""
        } z-50 flex flex-col font-sans
        fixed inset-0 size-full sm:w-[600px] sm:h-[600px] md:w-[750px] md:h-[650px]
        `}
        style={containerStyle}
        role="dialog"
        aria-modal="true"
      >
        <div
          onPointerDown={
            containerStyle.cursor === "grab" || containerStyle.cursor === "grabbing"
              ? onPointerDown
              : undefined
          }
          style={{
            userSelect: "none",
            cursor: containerStyle.cursor,
          }}
        >
          <ChatHeader onClose={onClose} />
        </div>

        <div
          className="grid md:grid-cols-[1fr_120px] md:grid-rows-[1fr_140px] grid-cols-1 grid-rows-[1fr_auto_auto] gap-2.5 h-[calc(100%-120px)] p-2.5"
        >
          <MessageList messages={messages} isFetching={isFetching} />
          <ProfileImage src="/robot.webp" alt="Bot" />
          <SendArea input={input} setInput={setInput} onSubmit={onSubmit} onNudge={onNudge} />
          <ProfileImage src="/duck.avif" alt="User" />
        </div>
      </dialog>
    );
  }
);

export default ChatWindow;