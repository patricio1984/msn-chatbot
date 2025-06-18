import type { Message } from "../types";

type Props = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function useMessengerApi({ messages, setMessages, input, setInput }: Props) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://msnchatbot.netlify.app/",
          "X-Title": "MSN Chatbot",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
          messages: newMessages,
        }),
      });

      const data = await response.json();
      const assistantReply = data.choices?.[0]?.message?.content ?? "No response";
      setMessages([...newMessages, { role: "assistant", content: assistantReply }]);
    } catch (error) {
      setMessages([...newMessages, { role: "assistant", content: "Error al conectar con la API." }]);
    }
  };

  return { handleSubmit };
}