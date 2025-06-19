import { forwardRef, useState } from "react";
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
  isFetching: boolean;
};

const ChatWindow = forwardRef<HTMLDialogElement, Props>(
  (
    {
      nudge,
      messages,
      input,
      setInput,
      onClose,
      onSubmit,
      onNudge,
      isFetching,
    },
    ref
  ) => {
    const [themeColor, setThemeColor] = useState("#E9F3F6");

    const { containerStyle, onPointerDown } = useDragAndDrop({
      x: window.innerWidth / 2 - 375,
      y: window.innerHeight / 2 - 325,
      disableDragOnMobile: true,
    });

    // Función para generar colores relacionados basados en el color principal
    const generateThemeColors = (baseColor: string) => {
      // Convertir hex a RGB
      const hex = baseColor.replace("#", "");
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      // Generar variaciones
      const darkerBorder = `rgb(${Math.max(0, r - 40)}, ${Math.max(
        0,
        g - 40
      )}, ${Math.max(0, b - 40)})`;
      const lighterBg = `rgb(${Math.min(255, r + 15)}, ${Math.min(
        255,
        g + 15
      )}, ${Math.min(255, b + 15)})`;
      const toolbarStart = `rgb(${Math.min(255, r + 25)}, ${Math.min(
        255,
        g + 25
      )}, ${Math.min(255, b + 25)})`;
      const toolbarMid = `rgb(${Math.max(0, r - 20)}, ${Math.max(
        0,
        g - 20
      )}, ${Math.max(0, b - 20)})`;
      const toolbarEnd = `rgb(${Math.min(255, r + 10)}, ${Math.min(
        255,
        g + 10
      )}, ${Math.min(255, b + 10)})`;

      return {
        primary: baseColor,
        border: darkerBorder,
        background: lighterBg,
        toolbarGradient: `linear-gradient(180deg, ${toolbarStart} 0%, ${toolbarMid} 50%, ${toolbarEnd} 100%)`,
      };
    };

    const themeColors = generateThemeColors(themeColor);

    const customStyles = {
      "--msn-primary": themeColors.primary,
      "--msn-border": themeColors.border,
      "--msn-background": themeColors.background,
      "--msn-toolbar-gradient": themeColors.toolbarGradient,
    } as React.CSSProperties;

    return (
      <dialog
        open
        ref={ref}
        className={`msn-window ${
          nudge ? "is-nudged" : ""
        } z-50 flex flex-col font-sans
        fixed inset-0 size-full sm:w-[600px] sm:h-[600px] md:w-[750px] md:h-[650px]
        `}
        style={{
          ...containerStyle,
          ...customStyles,
          backgroundColor: themeColors.primary,
          borderColor: themeColors.border,
        }}
        role="dialog"
        aria-modal="true"
      >
        <div
          onPointerDown={
            containerStyle.cursor === "grab" ||
            containerStyle.cursor === "grabbing"
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
          className="grid gap-2.5 p-2.5 h-[calc(100%-120px)]
                     grid-cols-1 grid-rows-[1fr_auto_auto]
                     md:grid-cols-[1fr_140px] md:grid-rows-[1fr_min-content]"
          role="main"
        >
          <MessageList
            messages={messages}
            isFetching={isFetching}
            className="md:col-span-1 md:row-span-1"
            style={{
              backgroundColor: themeColors.background,
              borderColor: themeColors.border,
            }}
          />

          <div className="md:col-span-1 md:row-span-1 flex justify-center items-start">
            <ProfileImage
              src="/robot.webp"
              alt="Bot"
              className="w-[120px] h-[120px]"
              themeColors={themeColors}
            />
          </div>

          <SendArea
            input={input}
            setInput={setInput}
            onSubmit={onSubmit}
            onNudge={onNudge}
            className="md:col-span-1 md:row-span-1"
            themeColors={themeColors}
            onColorChange={setThemeColor}
          />

          <div className="md:col-span-1 md:row-span-1 flex justify-center items-center">
            <ProfileImage
              src="/duck.avif"
              alt="User"
              className="w-[120px] h-[120px]"
              themeColors={themeColors}
            />
          </div>
        </div>

        <style>{`
          .msn-conversation {
            background-color: ${themeColors.background} !important;
            border-color: ${themeColors.border} !important;
          }

          .msn-profile {
            background-color: ${themeColors.background} !important;
            border-color: ${themeColors.border} !important;
          }

          .msn-send-area {
            border-color: ${themeColors.border} !important;
          }

          .msn-toolbar {
            background: ${themeColors.toolbarGradient} !important;
          }

          .msn-info-bar {
            background-color: ${themeColors.background} !important;
            border-color: ${themeColors.border} !important;
          }
          .action-button:active,
          .send-button:active {
            background: ${themeColors.primary} !important;
            outline-color: ${themeColors.border} !important;
          }
        `}</style>
      </dialog>
    );
  }
);

export default ChatWindow;
