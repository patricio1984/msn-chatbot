type Props = {
  onClose: () => void;
};

const ChatHeader = ({ onClose }: Props) => (
  <div className="border-0">
    <div className="flex p-2.5 items-center">
      <img src="/msn-icon.webp" alt="MSN" className="w-8 mr-1.5" />
      <div className="flex-1">
        <div className="font-bold mb-1 text-sm">Chatbot Assistant</div>
        <div className="text-msn-gray text-sm tracking-wide">
          ready to chat • chatbot@messenger.com
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