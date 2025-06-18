import type { Message } from "../types";

const parseMarkdown = (text: string) => {
  text = text.replace(
    /^### (.+)$/gm,
    '<h3 class="text-base font-bold mb-2 mt-3">$1</h3>'
  );
  text = text.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-bold">$1</strong>'
  );
  text = text.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    '<pre class="bg-gray-100 p-2 rounded text-base font-mono my-2 overflow-x-auto"><code>$2</code></pre>'
  );
  text = text.replace(
    /`([^`]+)`/g,
    '<code class="bg-gray-100 px-1 rounded text-base font-mono">$1</code>'
  );
  text = text.replace(/^\d+\.\s+(.+)$/gm, '<li class="ml-4 mb-1">$1</li>');
  text = text.replace(
    /(<li.*<\/li>)/s,
    '<ol class="list-decimal list-inside mb-2">$1</ol>'
  );
  text = text.replace(/\n/g, "<br>");
  return text;
};

type Props = {
  messages: Message[];
};

const MessageList = ({ messages }: Props) => (
  <div className="msn-conversation overflow-y-auto p-1.5">
    {messages.map((msg, i) => (
      <div key={i} className="my-2">
        {msg.role === "user" ? (
          <>
            <p className="my-2 text-base">Tú says:</p>
            <p className="ml-5 my-2 text-base">{msg.content}</p>
          </>
        ) : (
          <>
            {msg.content.includes("nudge") ? (
              <div className="msn-nudge my-3 ml-1 relative text-base text-gray-600">
                <span
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(msg.content),
                  }}
                />
              </div>
            ) : (
              <>
                <p className="my-2 text-base">Bot says:</p>
                <div className="ml-5 my-2 text-base">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdown(msg.content),
                    }}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    ))}
  </div>
);

export default MessageList;
