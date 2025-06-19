import { useEffect, useRef } from "react";
import type { Message } from "../../types";
import { parseMarkdownToHtml } from "../../utils/markdownParser";

type Props = {
  messages: Message[];
  isFetching: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const MessageList = ({ messages, isFetching, className, style }: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isFetching]);

  return (
    <div
      className={`msn-conversation overflow-y-auto p-2.5 ${className || ""}`}
      style={style}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {messages.map((msg, i) => {
        return (
          <div key={i} className="my-2">
            {msg.role === "user" ? (
              <>
                <p className="my-2 text-base">Tú dices:</p>
                <p className="ml-5 my-2 text-base">{msg.content}</p>
              </>
            ) : (
              <>
                {msg.content.includes("Acabás de enviar un zumbido.") ? (
                  <div className="msn-nudge my-3 ml-1 relative text-base text-gray-600">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: parseMarkdownToHtml(msg.content),
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <p className="my-2 text-base">Bot dice:</p>
                    <div className="ml-5 my-2 text-base">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: parseMarkdownToHtml(msg.content),
                        }}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        );
      })}

      {isFetching && (
        <div className="my-2">
          <p className="my-2 text-base">Bot dice:</p>
          <div className="ml-5 my-2 text-base flex items-center">
            Pensando
            <span className="dot-flashing ml-5"></span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;