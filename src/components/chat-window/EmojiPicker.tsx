type Props = {
  emojis: string[];
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
};

const EmojiPicker = ({ emojis, onEmojiSelect, onClose }: Props) => {
  return (
    <div className="absolute bottom-full left-0 mb-2 p-2 bg-white border border-gray-300 rounded shadow-lg grid grid-cols-6 gap-1 z-10 w-48">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          className="w-8 h-8 text-xl flex items-center justify-center hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => {
            onEmojiSelect(emoji);
            onClose();
          }}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiPicker;