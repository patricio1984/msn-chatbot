import { useState, useRef, useEffect } from "react";
import MessengerIcon from "./components/MessengerIcon";
import ChatWindow from "./components/ChatWindow";
import useDragAndDrop from "./hooks/useDragAndDrop";
import useMessengerApi from "./hooks/useMessengerApi";
import type { Message } from "./types";

export default function App() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: "¡Hola! ¿En qué puedo ayudarte?" }]);
    }
  }, [open, messages.length]);

  const {
    position: iconPos,
    onPointerDown,
    isDragging,
  } = useDragAndDrop({
    x: window.innerWidth / 2 - 56,
    y: window.innerHeight / 2 - 46,
  });

  const { handleSubmit, isFetching } = useMessengerApi({
    messages,
    setMessages,
    input,
    setInput,
  });

  const handleNudge = () => {
    if (dialogRef.current) {
      setNudge(true);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "\ud83e\udd74 You have just sent a nudge." },
      ]);
      setTimeout(() => setNudge(false), 400);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-teal-800"
      style={{ backgroundImage: "url('/windows-xp.avif')" }}
    >
      <h1 className="sr-only">Asistente de Chatbot MSN Messenger Retro</h1>
      <MessengerIcon
        iconPos={iconPos}
        onPointerDown={onPointerDown}
        onDoubleClick={() => setOpen(!open)}
        isDragging={isDragging}
      />

      {open && (
        <ChatWindow
          ref={dialogRef}
          nudge={nudge}
          messages={messages}
          input={input}
          setInput={setInput}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
          onNudge={handleNudge}
          isFetching={isFetching}
        />
      )}
    </div>
  );
}