type Props = {
  src: string;
  alt: string;
  className?: string;
  themeColors?: {
    primary: string;
    border: string;
    background: string;
    toolbarGradient: string;
  };
};

export default function ProfileImage({
  src,
  alt,
  className = "",
  themeColors,
}: Props) {
  const profileStyle = themeColors
    ? {
        backgroundColor: themeColors.background,
        borderColor: themeColors.border,
      }
    : {};

  return (
    <div className="msn-profile p-2.5 hidden md:block" style={profileStyle}>
      <div
        className={`border border-gray-300 flex items-center justify-center p-1 box-border ${className}`}
        title={alt}
        style={themeColors ? { borderColor: themeColors.border } : {}}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover block" />
      </div>
    </div>
  );
}
