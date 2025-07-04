type Props = {
  onClose: () => void;
  onPointerDown: (e: React.PointerEvent) => void;
};

const ChatHeader = ({ onClose, onPointerDown }: Props) => (
  <div 
    className="border-0 cursor-grab active:cursor-grabbing"
    onPointerDown={onPointerDown}
    style={{ userSelect: "none" }}
  >
    <div className="flex p-2.5 items-center">
      <img src="/msn-icon.avif" alt="MSN" className="w-8 mr-1.5" />
      <div className="flex-1">
        <div className="font-bold mb-1 text-sm">Asistente de Chatbot@Messenger</div>
        <div className="text-msn-gray text-sm tracking-wide">
          Listo para chatear • chatbot@messenger.com
        </div>
      </div>
      <button
        onClick={onClose}
        className="ml-auto bg-transparent border-none text-lg cursor-pointer p-1.5 hover:bg-gray-200 rounded"
        aria-label="Cerrar chat"
      >
        ×
      </button>
    </div>

    <div className="msn-toolbar flex h-10 items-center border-t border-b border-msn-border">
      <button className="action-button">➕</button>
      <button className="action-button">🗂</button>
      <button className="action-button">🎥</button>
      <button className="action-button">📞</button>
      <button className="action-button">🎵</button>
      <button className="action-button">🎲</button>
      <button className="action-button">🚷</button>
    </div>
  </div>
);

export default ChatHeader;