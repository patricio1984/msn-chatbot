type Props = {
  input: string;
  setInput: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onNudge: () => void;
};

const SendArea = ({ input, setInput, onSubmit, onNudge }: Props) => (
  <div className="msn-send-area grid grid-rows-[35px_auto_23px] w-full">
    <div className="msn-toolbar flex items-center border-b border-msn-border">
      <button className="send-button">😊</button>
      <button className="send-button">😉</button>
      <button className="send-button" onClick={onNudge}>
        🥴
      </button>
      <button className="send-button">📢</button>
      <button className="send-button">🔤</button>
      <button className="send-button">🎨</button>
      <button className="send-button">🏞</button>
      <button className="send-button">🎁</button>
    </div>

    <div className="bg-msn-light flex justify-between">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
          }
        }}
        className="bg-msn-light border-0 pl-2 pt-2 resize-none w-full min-h-[80px] font-sans text-base outline-none"
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
      role="status"
      aria-live="polite"
    >
      Último mensaje recibido a las {new Date().toLocaleTimeString()}.
    </div>
  </div>
);

export default SendArea;
