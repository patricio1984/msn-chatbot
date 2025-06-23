import { useState } from "react";
import type { Message } from "../types";

type Props = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function useMessengerApi({
  messages,
  setMessages,
  input,
  setInput,
}: Props) {
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");

    setIsFetching(true);

    try {
      const response = await fetch("/.netlify/functions/chatAPI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      const data = await response.json();
      const assistantReply =
        data.choices?.[0]?.message?.content ?? "No response";
      setMessages([
        ...newMessages,
        { role: "assistant", content: assistantReply },
      ]);
    } catch (error) {
      console.error("Error fetching from API:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Error al conectar con la API." },
      ]);
    } finally {
      setIsFetching(false);
    }
  };

  return { handleSubmit, isFetching };
}
