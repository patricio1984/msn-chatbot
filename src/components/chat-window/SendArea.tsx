import { useState, useRef } from "react";
import EmojiPicker from "./EmojiPicker";
import ColorPickerButton from "./ColorPickerButton";

type Props = {
  input: string;
  setInput: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onNudge: () => void;
  className?: string;
  themeColors?: {
    primary: string;
    border: string;
    background: string;
    toolbarGradient: string;
  };
  onColorChange?: (color: string) => void;
};

const EMOJIS = [
  "😀",
  "😂",
  "🥰",
  "😎",
  "😭",
  "😡",
  "🤔",
  "🥳",
  "👍",
  "👏",
  "🤩",
  "💔",
];

const SendArea = ({
  input,
  setInput,
  onSubmit,
  onNudge,
  className,
  themeColors,
  onColorChange,
}: Props) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEmojiClick = (emoji: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newText = input.substring(0, start) + emoji + input.substring(end);
      setInput(newText);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
      }, 0);

      textarea.focus();
    }
    setShowEmojiPicker(false);
  };

  const sendAreaStyle = themeColors
    ? {
        borderColor: themeColors.border,
      }
    : {};

  const toolbarStyle = themeColors
    ? {
        background: themeColors.toolbarGradient,
        borderColor: themeColors.border,
      }
    : {};

  const textareaStyle = themeColors
    ? {
        backgroundColor: themeColors.background,
      }
    : {};

  const infoBarStyle = themeColors
    ? {
        backgroundColor: themeColors.background,
        borderColor: themeColors.border,
      }
    : {};

  return (
    <div
      className={`msn-send-area grid grid-rows-[35px_auto_23px] w-full ${
        className || ""
      }`}
      style={sendAreaStyle}
    >
      <div
        className="msn-toolbar flex items-center border-b border-msn-border relative"
        style={toolbarStyle}
      >
        <div className="relative">
          <button
            className="send-button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Insertar emoticono"
          >
            😊
          </button>
          {showEmojiPicker && (
            <EmojiPicker
              emojis={EMOJIS}
              onEmojiSelect={handleEmojiClick}
              onClose={() => setShowEmojiPicker(false)}
            />
          )}
        </div>

        <button className="send-button">😉</button>
        <button
          className="send-button"
          onClick={onNudge}
          title="Enviar zumbido"
        >
          🥴
        </button>
        <button className="send-button">📢</button>
        <button className="send-button">🔤</button>

        <ColorPickerButton
          onColorChange={(newColor) => {
            if (onColorChange) onColorChange(newColor);
          }}
        />

        <button className="send-button">🏞</button>
        <button className="send-button">🎁</button>
      </div>

      <div className="bg-msn-light flex justify-between" style={textareaStyle}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit(e);
            }
          }}
          className="bg-msn-light border-0 pl-2 pt-2 resize-none w-full min-h-[80px] font-sans text-base outline-none"
          style={textareaStyle}
          placeholder="Escribí tu mensaje..."
          aria-label="Campo de texto para escribir tu consulta a MSN Chatbot"
        />
        <div className="flex flex-col">
          <button
            onClick={onSubmit}
            className="text-xs m-1.5 px-3 py-1.5 cursor-pointer bg-gray-100 border border-gray-300 hover:bg-gray-200"
            aria-label="Enviar tu consulta a MSN Chatbot"
          >
            <u>E</u>nviar
          </button>
        </div>
      </div>

      <div
        className="msn-info-bar flex items-center px-1.5 text-xs"
        style={infoBarStyle}
        role="status"
        aria-live="polite"
      >
        Último mensaje recibido a las {new Date().toLocaleTimeString()}.
      </div>
    </div>
  );
};

export default SendArea;
