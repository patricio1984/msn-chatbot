import React, { useRef } from 'react';

type Props = {
  onColorChange: (color: string) => void;
  title?: string;
};

const ColorPickerButton = ({ onColorChange, title = "Cambiar color del tema" }: Props) => {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value);
  };

  return (
    <div className="relative">
      <button
        className="send-button relative"
        onClick={handleButtonClick}
        title={title}
      >
        🎨
      </button>
      <input
        ref={colorInputRef}
        type="color"
        onChange={handleChange}
        className="absolute opacity-0 pointer-events-none"
        defaultValue="#E9F3F6"
      />
    </div>
  );
};

export default ColorPickerButton;